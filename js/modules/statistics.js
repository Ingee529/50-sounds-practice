// Statistics 模組 - 學習統計的事件驅動 UI
// 採用 mount/unmount 範式防止事件洩漏

import { on } from '../core/events.js';
import { getState } from '../core/state.js';
import { isLoggedIn, getAuth } from '../core/selectors.js';
import { tt, translateType as translateTypeUtil } from '../i18n/i18n.js';
import { fetchStatistics, fetchSessionDetail, clearCache } from '../core/services/statisticsService.js';

// 事件監聽器清理數組
let offs = [];

// DOM 查詢輔助工具
const $id = (id) => document.getElementById(id);

// 安全版文字設置，避免 i18n 掛載晚了整塊空白
const setTxtSafe = (id, key, opts = {}) => {
    const el = document.getElementById(id);
    if (!el) return;
    const text = tt(key, opts) ?? key;
    el.textContent = text;
};

// 渲染節流控制
let renderRAF = null;

// 當前用戶和認證狀態（從state管理系統讀取）
let currentUser = null;
let authToken = null;

// 載入狀態管理
let loadingState = {
    isLoading: false,
    error: null,
    hasData: false,
    retryCount: 0,
    maxRetries: 1
};

// 請求競態控制
let lastReqId = 0;

// 可及性：焦點管理
let lastFocusedElement = null;
let lastTriggerEl = null;

// API調用函數（使用新的認證系統）
const apiCall = async (endpoint, method = 'GET', data = null, options = {}) => {
    // 優先使用新的統一API系統
    if (typeof window.apiRequest === 'function') {
        return window.apiRequest(endpoint, { method, body: data, ...options });
    }
    
    // 回退到舊系統（確保認證頭正確）
    if (typeof window.apiCall === 'function') {
        return window.apiCall(endpoint, method, data, options);
    }
    
    // 如果都沒有，使用內建的fetch調用
    const state = getState();
    const auth = getAuth(state);
    const apiBase = window.API_BASE || window.API_BASE_URL || window.location.origin;
    
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options
    };
    
    // 添加認證頭
    if (auth.token) {
        config.headers['Authorization'] = `Bearer ${auth.token}`;
    }
    
    // 添加請求體
    if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
    }
    
    const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
    const response = await fetch(url, config);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
    }
    
    return result;
};

/**
 * 掛載統計模組
 */
export function mountStatistics() {
    console.log('📊 [statistics] Mounting statistics module...');
    
    // 檢查統計頁面根容器是否存在
    const root = $id('statistics-tab');
    if (!root) {
        console.warn('[statistics] Statistics container not found, skip mount');
        return;
    }
    
    // 初始化用戶狀態
    updateAuthState();
    
    // 監聽語言和狀態變化事件
    offs.push(on('i18n:changed', requestRender));
    offs.push(on('auth:user.changed', handleAuthChange));
    offs.push(on('ui:rerender', requestRender));
    
    // 監聽認證初始化完成事件
    offs.push(on('auth:inited', () => {
        console.log('[statistics] Auth initialized, checking login status...');
        requestRender();
        const state = getState();
        if (isLoggedIn(state)) {
            console.log('[statistics] User logged in, loading statistics...');
            loadStatistics();
        }
    }));
    
    // 綁定 DOM 事件
    bindDOMEvents();
    
    // 初次渲染
    render();
    
    // 檢查是否已經登入並載入統計（三態檢查）
    const state = getState();
    const auth = getAuth(state);
    if (auth.inited && isLoggedIn(state)) {
        console.log('[statistics] User already logged in, loading statistics...');
        loadStatistics();
    }
    
    console.log('✅ [statistics] Statistics module mounted');
}

/**
 * 卸載統計模組，清理事件監聽器
 */
export function unmountStatistics() {
    console.log('📊 [statistics] Unmounting statistics module...');
    
    // 清理事件監聽器
    offs.forEach(off => off && off());
    offs = [];
    
    // 清理渲染節流
    if (renderRAF !== null) {
        cancelAnimationFrame(renderRAF);
        renderRAF = null;
    }
    
    // 中止所有進行中的請求
    if (window.statisticsService?.abortAllRequests) {
        window.statisticsService.abortAllRequests();
    }
    
    // 重置狀態
    resetLoadingState();
    lastReqId = 0;
    lastFocusedElement = null;
    
    console.log('✅ [statistics] Statistics module unmounted');
}

/**
 * 綁定 DOM 事件並註冊清理函數
 */
function bindDOMEvents() {
    // 模態框關閉事件
    const onModalClose = () => {
        const modal = $id('session-detail-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.removeAttribute('role');
            modal.removeAttribute('aria-modal');
            modal.removeAttribute('aria-labelledby');
            
            // 只重置上次觸發的 aria-expanded
            if (lastTriggerEl) {
                lastTriggerEl.setAttribute('aria-expanded', 'false');
                lastTriggerEl = null;
            }
            
            // 還原焦點
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        }
    };
    
    const closeBtn = document.querySelector('#session-detail-modal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', onModalClose);
        offs.push(() => closeBtn.removeEventListener('click', onModalClose));
    }
    
    // 點擊模態框外部關閉
    const modal = $id('session-detail-modal');
    if (modal) {
        const onModalClick = (e) => {
            if (e.target === modal) {
                onModalClose();
            }
        };
        modal.addEventListener('click', onModalClick);
        offs.push(() => modal.removeEventListener('click', onModalClick));
    }
    
    // ESC 鍵關閉模態框
    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            onModalClose();
        }
    };
    document.addEventListener('keydown', onKeyDown);
    offs.push(() => document.removeEventListener('keydown', onKeyDown));
    
    // 事件委託：處理練習記錄點擊事件
    const onRecentSessionClick = (e) => {
        const sessionItem = e.target.closest('[data-session-id]');
        if (sessionItem) {
            const sessionId = parseInt(sessionItem.dataset.sessionId);
            if (!isNaN(sessionId)) {
                showSessionDetail(sessionId);
            }
        }
    };
    
    // 事件委託：處理鍵盤事件
    const onRecentSessionKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            // 避免在輸入框/文字區域內攔截空白鍵
            const tag = e.target.tagName;
            const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
            
            if (!isTyping) {
                e.preventDefault();
                const sessionItem = e.target.closest('[data-session-id]');
                if (sessionItem) {
                    const sessionId = parseInt(sessionItem.dataset.sessionId);
                    if (!isNaN(sessionId)) {
                        showSessionDetail(sessionId);
                    }
                }
            }
        }
    };
    
    const recentSessionsList = $id('recent-sessions-list');
    if (recentSessionsList) {
        recentSessionsList.addEventListener('click', onRecentSessionClick);
        recentSessionsList.addEventListener('keydown', onRecentSessionKeyDown);
        offs.push(() => {
            recentSessionsList.removeEventListener('click', onRecentSessionClick);
            recentSessionsList.removeEventListener('keydown', onRecentSessionKeyDown);
        });
    }
}

/**
 * 主要渲染函數（使用三態認證檢查）
 */
function render() {
    // 更新統計標籤
    updateStatisticsLabels();
    
    const state = getState();
    const auth = getAuth(state);
    
    // 根據狀態顯示不同內容
    if (loadingState.error) {
        showErrorState();
    } else if (loadingState.isLoading) {
        showLoadingState();
    } else if (!auth.inited) {
        // 初始化中：顯示 loading（不要顯示"請登入"）
        showLoadingState();
    } else if (!isLoggedIn(state)) {
        // 已初始化但未登入
        // Try to load stats for guest users or show login prompt
        showStatsForGuestUsers();
    } else {
        // 已登入：自動載入統計（如果還沒載入過且沒有數據）
        if (!loadingState.isLoading && !loadingState.error && !loadingState.hasData) {
            loadStatistics();
        }
    }
}

/**
 * 設置載入狀態
 */
function setLoading(isLoading) {
    loadingState.isLoading = isLoading;
    if (isLoading) {
        loadingState.error = null;
    }
}

/**
 * 設置錯誤狀態
 */
function setError(error) {
    loadingState.error = error;
    loadingState.isLoading = false;
    console.error('[statistics] Error:', error);
}

/**
 * 判斷錯誤類型
 * @param {Error} error - 錯誤對象
 * @returns {string} 錯誤類型
 */
function getErrorType(error) {
    if (!error) return 'unknown';
    
    const message = error.message?.toLowerCase() || '';
    const status = error.status || 0;
    
    // 認證錯誤
    if (status === 401 || status === 403 || message.includes('unauthorized') || message.includes('forbidden')) {
        return 'auth';
    }
    
    // 網路錯誤
    if (message.includes('network') || message.includes('fetch') || status >= 500) {
        return 'network';
    }
    
    // 取消錯誤
    if (error.name === 'AbortError') {
        return 'aborted';
    }
    
    return 'unknown';
}

/**
 * 重置載入狀態
 */
function resetLoadingState() {
    loadingState.isLoading = false;
    loadingState.error = null;
    loadingState.retryCount = 0;
    loadingState.hasData = false;
}

/**
 * 更新統計頁面標籤
 */
function updateStatisticsLabels() {
    // 更新統計標題和標籤（使用安全版 setTxtSafe）
    setTxtSafe('total-sessions-label', 'stats.totalSessions');
    setTxtSafe('total-questions-label', 'stats.totalQuestions');
    setTxtSafe('total-correct-label', 'stats.totalCorrect');
    setTxtSafe('avg-accuracy-label', 'stats.avgAccuracy');
    setTxtSafe('total-time-label', 'stats.totalTime');
    setTxtSafe('recent-sessions-title', 'stats.recentSessions');
    setTxtSafe('category-stats-title', 'stats.categoryStats');
    
    // 模態框標籤
    setTxtSafe('session-detail-title', 'sessionDetail.title');
}

/**
 * 顯示載入狀態
 */
function showLoadingState() {
    let loadingEl = $id('statistics-loading');
    const contentEl = $id('statistics-content');
    const rootEl = $id('statistics-tab');
    
    // 如果載入元素不存在，則動態創建
    if (!loadingEl && rootEl) {
        loadingEl = document.createElement('div');
        loadingEl.id = 'statistics-loading';
        loadingEl.style.cssText = 'text-align: center; padding: 40px; color: #666;';
        rootEl.insertBefore(loadingEl, rootEl.firstChild);
    }
    
    if (loadingEl) {
        loadingEl.style.display = 'block';
        loadingEl.setAttribute('aria-busy', 'true');
        loadingEl.setAttribute('aria-live', 'polite');
        loadingEl.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="margin-bottom: 15px;">
                    <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;" aria-hidden="true"></div>
                </div>
                <div style="color: #666;">${tt('common.loading')}</div>
            </div>
        `;
    }
    
    if (contentEl) {
        contentEl.style.display = 'none';
        contentEl.setAttribute('aria-busy', 'false');
    }
}

/**
 * 顯示錯誤狀態
 */
function showErrorState() {
    const loadingEl = $id('statistics-loading');
    const contentEl = $id('statistics-content');
    
    if (!loadingEl) return;
    
    const error = loadingState.error;
    const errorType = getErrorType(error);
    
    let errorMessage = tt('stats.loadError');
    let showRetryButton = true;
    
    // 根據錯誤類型自定義訊息和行為
    switch (errorType) {
        case 'auth':
            errorMessage = tt('stats.loginRequired');
            showRetryButton = false; // 認證錯誤不顯示重試按鈕
            break;
        case 'network':
            errorMessage = tt('stats.loadError');
            showRetryButton = true;
            break;
        case 'aborted':
            // 取消錯誤不需要顯示，直接返回
            return;
        default:
            errorMessage = tt('stats.loadError');
            showRetryButton = true;
    }
    
    loadingEl.style.display = 'block';
    loadingEl.setAttribute('aria-busy', 'false');
    
    const retryButtonHtml = showRetryButton ? `
        <button type="button" 
                onclick="retryLoadStatistics()" 
                style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; margin-top: 10px;"
                aria-describedby="error-message">
            ${tt('stats.retryButton')}
        </button>
    ` : '';
    
    loadingEl.innerHTML = `
        <div style="text-align: center; padding: 40px;" role="alert">
            <div id="error-message" 
                 style="color: ${errorType === 'auth' ? '#f39c12' : '#e74c3c'}; margin-bottom: 15px; font-size: 16px;"
                 tabindex="-1">
                ${errorMessage}
            </div>
            ${retryButtonHtml}
        </div>
    `;
    
    // 將焦點移到錯誤訊息，讓螢幕閱讀器立即讀出
    requestAnimationFrame(() => {
        const errorEl = $id('error-message');
        if (errorEl) {
            if (!errorEl.hasAttribute('tabindex')) {
                errorEl.setAttribute('tabindex', '-1');
            }
            errorEl.focus();
        }
    });
    
    if (contentEl) {
        contentEl.style.display = 'none';
        contentEl.setAttribute('aria-busy', 'false');
    }
}

/**
 * 顯示需要登入訊息
 */
/**
 * 為訪客用戶顯示統計（如果有數據）或登入提示
 */
async function showStatsForGuestUsers() {
    console.log("[statistics] Checking if guest user has practice data...");
    
    try {
        // 嘗試不用認證直接獲取統計數據
        const response = await fetch("/api/practice/statistics/", {
            method: "GET",
            credentials: "include"
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success && (data.overall.total_sessions > 0 || data.recent_sessions.length > 0)) {
                console.log("[statistics] Found practice data for guest user, displaying stats");
                displayStatistics(data);
                showSuccessState();
                return;
            }
        }
    } catch (error) {
        console.log("[statistics] No accessible data for guest:", error.message);
    }
    
    // 如果沒有數據或無法訪問，顯示友好的登入提示
    showLoginRequired();
}
function showLoginRequired() {
    const loadingEl = $id('statistics-loading');
    const contentEl = $id('statistics-content');
    
    if (loadingEl) {
        loadingEl.style.display = 'block';
        loadingEl.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                ${tt('stats.loginRequired')}
            </div>
        `;
    }
    
    if (contentEl) {
        contentEl.style.display = 'none';
    }
}

/**
 * 載入統計資料
 */
async function loadStatistics() {
    if (loadingState.isLoading) return; // 防止重複載入
    
    const reqId = ++lastReqId; // 生成請求 ID
    console.log(`[statistics] Loading statistics... (reqId: ${reqId})`);
    
    
    // 從state系統獲取最新的認證狀態
    const state = getState();
    const auth = getAuth(state);
    
    if (!auth.user || !auth.token) {
        console.log("[statistics] No user or token in state, trying fallback authentication...");
        // 嘗試使用後備認證方法
        try {
            const fallbackStats = await fetch("/api/practice/statistics/", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            if (fallbackStats.ok) {
                const fallbackData = await fallbackStats.json();
                if (fallbackData.success) {
                    console.log("[statistics] Fallback authentication successful!");
                    displayStatistics(fallbackData);
                    showSuccessState();
                    return;
                }
            }
        } catch (error) {
            console.log("[statistics] Fallback authentication failed:", error.message);
        }
        showLoginRequired();
        return;
    }
    
    // 更新本地變數（保持向後兼容）
    currentUser = auth.user;
    authToken = auth.token;
    
    setLoading(true);
    requestRender(); // 立即顯示載入狀態
    
    try {
        const stats = await fetchStatistics();
        
        // 檢查是否為最新請求
        if (reqId !== lastReqId) {
            console.log(`[statistics] Ignoring stale response (reqId: ${reqId}, current: ${lastReqId})`);
            return;
        }
        
        console.log(`[statistics] Statistics received (reqId: ${reqId}):`, stats);
        
        if (stats) {
            resetLoadingState();
            displayStatistics(stats);
            showSuccessState();
        } else {
            setError(new Error(tt('stats.noData')));
            requestRender();
        }
    } catch (error) {
        // 只處理最新請求的錯誤
        if (reqId === lastReqId) {
            console.error(`[statistics] Failed to load statistics (reqId: ${reqId}):`, error);
            setError(error);
            requestRender();
        }
    }
}

/**
 * 重試載入統計資料
 */
function retryLoadStatistics() {
    if (loadingState.retryCount >= loadingState.maxRetries) {
        console.log('[statistics] Max retries reached');
        setError(new Error(tt('stats.loadError')));
        requestRender();
        return;
    }
    
    loadingState.retryCount++;
    console.log(`[statistics] Retrying... (${loadingState.retryCount}/${loadingState.maxRetries})`);
    
    resetLoadingState();
    loadStatistics();
}

/**
 * 顯示成功狀態
 */
function showSuccessState() {
    const loadingEl = $id('statistics-loading');
    const contentEl = $id('statistics-content');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
        loadingEl.removeAttribute('aria-busy');
        loadingEl.removeAttribute('aria-live');
    }
    
    if (contentEl) {
        contentEl.style.display = 'block';
        contentEl.setAttribute('aria-busy', 'false');
    }
    
    // 確保載入狀態已標記為完成
    loadingState.hasData = true;
    loadingState.isLoading = false;
}

/**
 * 顯示統計資料
 */
function displayStatistics(stats) {
    // 標記已有數據
    loadingState.hasData = true;
    
    // 更新總體統計
    const overall = stats.overall || {};
    setElText('total-sessions-num', overall.total_sessions || 0);
    setElText('total-questions-num', overall.total_questions || 0);
    setElText('total-correct-num', overall.total_correct || 0);
    setElText('avg-accuracy-num', (overall.avg_accuracy || 0) + '%');
    setElText('total-time-num', overall.total_time_minutes || 0);
    
    // 顯示最近練習記錄
    displayRecentSessions(stats.recent_sessions || []);
    
    // 顯示分類統計
    displayCategoryStats(stats.by_category || []);
}

/**
 * 顯示最近練習記錄
 */
function displayRecentSessions(sessions) {
    const recentList = $id('recent-sessions-list');
    if (!recentList) return;
    
    if (sessions.length === 0) {
        recentList.innerHTML = `<p style="text-align: center; color: #666;">${tt('stats.noRecentSessions')}</p>`;
        return;
    }
    
    let html = '';
    sessions.forEach(session => {
        const dateTime = formatTimestamp(session.started_at);
        const sessionTypeText = translateType(session.session_type);
        const categoriesText = session.categories.map(cat => translateType(cat)).join(', ');
        
        html += `<div data-session-id="${session.id}" 
                      style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 6px; cursor: pointer; transition: background 0.2s;" 
                      onmouseover="this.style.background='#e9ecef'" 
                      onmouseout="this.style.background='#f8f9fa'"
                      role="button"
                      tabindex="0"
                      aria-expanded="false"
                      aria-controls="session-detail-modal"
                      aria-label="${tt('stats.clickForDetail')} - ${sessionTypeText}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${sessionTypeText}</strong> - ${categoriesText}
                    <br><small>${dateTime}</small>
                    <br><small style="color: #667eea;">${tt('stats.clickForDetail')}</small>
                </div>
                <div style="text-align: right;">
                    <strong>${session.correct_answers}/${session.total_questions}</strong>
                    <br><small>${session.accuracy_rate}%</small>
                </div>
            </div>
        </div>`;
    });
    
    recentList.innerHTML = html;
}

/**
 * 顯示分類統計
 */
function displayCategoryStats(categoryStats) {
    const categoryList = $id('category-stats-list');
    if (!categoryList) return;
    
    if (categoryStats.length === 0) {
        categoryList.innerHTML = `<p style="text-align: center; color: #666;">${tt('stats.noCategoryStats')}</p>`;
        return;
    }
    
    let html = '';
    categoryStats.forEach(category => {
        const kanaTypeText = translateType(category.kana_type) || category.kana_type;
        const categoryText = translateType(category.category) || category.category;
        const timesText = tt('common.times');
        const totalPracticeText = tt('stats.totalPractice');
        
        html += `<div style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>${kanaTypeText} - ${categoryText}</strong>
                <br><small style="color: #666;">${totalPracticeText}: ${category.total_attempts} ${timesText}</small>
            </div>
            <div style="text-align: right;">
                <strong>${parseFloat(category.accuracy_rate).toFixed(0)}%</strong>
                <br><small>${category.correct_attempts}/${category.total_attempts}</small>
            </div>
        </div>`;
    });
    
    categoryList.innerHTML = html;
}

/**
 * 顯示練習詳情
 */
async function showSessionDetail(sessionId) {
    const modal = $id('session-detail-modal');
    const content = $id('session-detail-content');
    const loading = $id('session-detail-loading');
    
    if (!modal) return;
    
    // 保存當前焦點
    lastFocusedElement = document.activeElement;
    
    // 更新觸發元素的 aria-expanded
    const triggerElement = document.querySelector(`[data-session-id="${sessionId}"]`);
    if (triggerElement) {
        triggerElement.setAttribute('aria-expanded', 'true');
        lastTriggerEl = triggerElement;
    }
    
    // 設置模態框可及性屬性
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'session-detail-title');
    modal.style.display = 'block';
    
    if (loading) loading.style.display = 'block';
    
    // 更新模態視窗標題和載入文字
    const titleEl = $id('session-detail-title');
    const loadingTextEl = $id('session-detail-loading');
    
    if (titleEl) titleEl.textContent = tt('sessionDetail.title');
    if (loadingTextEl) loadingTextEl.textContent = tt('common.loading');
    
    try {
        const response = await fetchSessionDetail(sessionId);
        
        if (response && response.success) {
            const session = response.session;
            const sessionTypeText = translateType(session.session_type);
            const categoriesText = session.categories.map(cat => translateType(cat)).join(', ');
            
            const typeLabel = tt('sessionDetail.practiceType');
            const rangeLabel = tt('sessionDetail.practiceRange');
            const startLabel = tt('sessionDetail.startTime');
            const endLabel = tt('sessionDetail.endTime');
            const durationLabel = tt('sessionDetail.duration');
            const resultLabel = tt('sessionDetail.result');
            const recordsLabel = tt('sessionDetail.answerRecords');
            const detailTitle = tt('sessionDetail.title');
            const minuteText = tt('common.minutes');
            
            let detailHtml = `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${detailTitle}</h4>
                    <p><strong>${typeLabel}:</strong> ${sessionTypeText}</p>
                    <p><strong>${rangeLabel}:</strong> ${categoriesText}</p>
                    <p><strong>${startLabel}:</strong> ${formatTimestamp(session.started_at)}</p>
                    <p><strong>${endLabel}:</strong> ${formatTimestamp(session.completed_at)}</p>
                    <p><strong>${durationLabel}:</strong> ${Math.round(session.duration_seconds / 60)} ${minuteText}</p>
                    <p><strong>${resultLabel}:</strong> ${session.correct_answers}/${session.total_questions} (${session.accuracy_rate}%)</p>
                </div>
                
                <h4 style="color: #2c3e50; margin-bottom: 15px;">${recordsLabel}</h4>
                <div style="max-height: 300px; overflow-y: auto;">
            `;
            
            // 顯示所有答題記錄
            if (session.answer_records && session.answer_records.length > 0) {
                session.answer_records.forEach((record, index) => {
                    const isCorrect = record.is_correct;
                    const recordClass = isCorrect ? 'answer-correct' : 'answer-incorrect';
                    const icon = isCorrect ? '✓' : '✗';
                    const responseTime = (record.response_time_ms / 1000).toFixed(1);
                    
                    detailHtml += `
                        <div class="answer-record ${recordClass}">
                            <div>
                                <span class="kana-large">${record.question_kana}</span>
                                <span style="margin-left: 10px; color: #666;">${tt('sessionDetail.correct')}: ${record.correct_romaji}</span>
                            </div>
                            <div style="text-align: right;">
                                <div>
                                    <span style="font-weight: bold;">${icon} ${record.user_answer}</span>
                                    <span style="margin-left: 10px; font-size: 12px; color: #666;">${responseTime}s</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                // 錯題複習按鈕
                const wrongAnswers = session.answer_records.filter(record => !record.is_correct);
                if (wrongAnswers.length > 0) {
                    detailHtml += `
                        <div style="margin-top: 20px; text-align: center;">
                            <button onclick="startReviewSession(${sessionId})" 
                                    style="background: #e74c3c; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                ${tt('sessionDetail.reviewWrongAnswers')} (${wrongAnswers.length} ${tt('common.questions')})
                            </button>
                        </div>
                    `;
                }
            } else {
                detailHtml += `<p style="text-align: center; color: #666;">${tt('sessionDetail.noAnswerRecords')}</p>`;
            }
            
            detailHtml += '</div>';
            
            if (loading) loading.style.display = 'none';
            if (content) content.innerHTML = detailHtml;
            
            // 將焦點移到模態框標題
            requestAnimationFrame(() => {
                const titleEl = $id('session-detail-title');
                if (titleEl) {
                    titleEl.focus();
                    titleEl.setAttribute('tabindex', '-1'); // 允許程式化聚焦
                }
            });
        }
    } catch (error) {
        console.error('[statistics] Failed to load session detail:', error);
        if (loading) {
            loading.textContent = tt('common.error');
        }
    }
}

/**
 * 更新認證狀態
 */
function updateAuthState() {
    const state = getState();
    const auth = getAuth(state);
    
    currentUser = auth.user || null;
    authToken = auth.token || null;
    
    console.log('[statistics] Auth state updated:', {
        hasUser: !!currentUser,
        hasToken: !!authToken,
        userId: currentUser?.id || 'none'
    });
}

/**
 * 處理認證狀態變化
 */
function handleAuthChange(data) {
    const prevUser = data?.previous?.user;
    const currentUser = data?.current?.user;
    
    console.log('[statistics] Auth change:', {
        prevUser: !!prevUser,
        currentUser: !!currentUser,
        wasLoggedIn: !!prevUser,
        nowLoggedIn: !!currentUser
    });
    
    // 如果用戶變更，清空快取
    if (prevUser?.id !== currentUser?.id) {
        console.log('[statistics] User changed, clearing cache');
        clearCache();
    }
    
    requestRender();
    
    // 如果剛剛登入，自動載入統計
    if (!prevUser && currentUser) {
        console.log('[statistics] User just logged in, loading statistics...');
        loadStatistics();
    }
    
    // 如果剛登出，清理 UI 和快取
    if (prevUser && !currentUser) {
        console.log('[statistics] User just logged out, clearing UI and cache');
        clearCache();
        resetLoadingState();
    }
}


/**
 * 翻譯類型文字（優先使用全域 translateType）
 */
function translateType(type) {
    // 優先使用全域的 translateType 函數
    if (typeof window.translateType === 'function') {
        return window.translateType(type);
    }
    
    // 使用模組內的翻譯工具
    return translateTypeUtil(type);
    
    // 預設映射
    const typeMap = {
        'quick': tt('practice.quickMode'),
        'custom': tt('practice.customMode'),
        'hiragana': tt('chart.hiragana'),
        'katakana': tt('chart.katakana'),
        'mixed': tt('kana.types.mixed')
    };
    
    return typeMap[type] || type;
}

// ==========================================
// 渲染控制
// ==========================================

/**
 * 節流渲染請求，避免同一幀內多次渲染
 */
function requestRender() {
    if (renderRAF !== null) {
        cancelAnimationFrame(renderRAF);
    }
    renderRAF = requestAnimationFrame(() => {
        render();
        renderRAF = null;
    });
}

// ==========================================
// 輔助函數
// ==========================================

/**
 * 設置元素文字內容
 * @param {string} id - 元素 ID
 * @param {string} key - 翻譯鍵
 * @param {Object} opts - 翻譯選項
 */
function setTxt(id, key, opts = {}) {
    const el = $id(id);
    if (el) {
        el.textContent = tt(key, opts);
    }
}

/**
 * 設置元素文字內容（純文字）
 * @param {string} id - 元素 ID
 * @param {string|number} text - 文字內容
 */
function setElText(id, text) {
    const el = $id(id);
    if (el) {
        el.textContent = text;
    }
}

/**
 * 格式化時間戳為本地化日期時間
 * @param {string|number|Date} timestamp - 時間戳
 * @param {Object} options - 格式化選項
 * @returns {string} 格式化後的日期時間
 */
function formatTimestamp(timestamp, options = {}) {
    const state = getState();
    const lang = state.app.lang === 'zh' ? 'zh-TW' : 'en-US';
    
    const defaultOptions = {
        dateStyle: 'medium',
        timeStyle: 'short'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    
    try {
        return new Intl.DateTimeFormat(lang, formatOptions).format(new Date(timestamp));
    } catch (error) {
        console.warn('[statistics] Failed to format timestamp:', error);
        return new Date(timestamp).toLocaleString();
    }
}

/**
 * 格式化日期（不含時間）
 * @param {string|number|Date} timestamp - 時間戳
 * @returns {string} 格式化後的日期
 */
function formatDate(timestamp) {
    return formatTimestamp(timestamp, { dateStyle: 'medium' });
}

/**
 * 格式化時間（不含日期）
 * @param {string|number|Date} timestamp - 時間戳
 * @returns {string} 格式化後的時間
 */
function formatTime(timestamp) {
    return formatTimestamp(timestamp, { timeStyle: 'short' });
}

// ==========================================
// 全域函數暴露（向後兼容）
// ==========================================

// 暴露給全域使用的函數（向後兼容）
if (typeof window !== 'undefined') {
    // Dev environment deprecation warning tracker
    const isDev = ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
    const warnedFunctions = new Set();
    
    const warnOnce = (funcName, suggestion) => {
        if (isDev && !warnedFunctions.has(funcName)) {
            console.warn(`[DEPRECATION] window.${funcName} 將被移除，請改用: ${suggestion}`);
            warnedFunctions.add(funcName);
        }
    };
    
    window.showSessionDetail = function(...args) {
        warnOnce('showSessionDetail', 'import { mountStatistics } from "./js/modules/statistics.js"');
        return showSessionDetail(...args);
    };
    
    window.closeSessionDetail = function() {
        warnOnce('closeSessionDetail', 'ESC 鍵或點擊模態框外部');
        const modal = $id('session-detail-modal');
        if (modal) modal.style.display = 'none';
    };
    
    // startReviewSession 由 index.html 中的全域函數提供
    
    window.retryLoadStatistics = function() {
        // 不需要警告，這是內部重試機制
        retryLoadStatistics();
    };
    
    // 向後兼容的 loadStatistics 函數
    window.loadStatistics = function() {
        warnOnce('loadStatistics', 'mountStatistics() 自動載入統計');
        console.log('[statistics] Legacy loadStatistics called, delegating to module...');
        updateAuthState();
        resetLoadingState();
        requestRender();
    };
}

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugStatistics = function() {
        console.log('🔍 Statistics Module Debug:');
        console.log('📊 Event listeners:', offs.length);
        console.log('👤 Current user:', currentUser);
        console.log('🔑 Auth token:', !!authToken);
        console.log('🔄 Loading state:', loadingState);
        
        // 快取狀態診斷
        const cacheStatus = window.statisticsService?.getCacheStatus?.();
        if (cacheStatus) {
            console.log('💽 Cache status:', cacheStatus);
            console.log('📊 Statistics cache:', {
                cached: cacheStatus.statistics.cached,
                ageMinutes: cacheStatus.statistics.age ? Math.round(cacheStatus.statistics.age / 60000) : null,
                valid: cacheStatus.statistics.valid
            });
            console.log('📄 Session details cache:', {
                count: cacheStatus.sessionDetails.count,
                keys: cacheStatus.sessionDetails.keys
            });
        }
        
        console.log('💡 Available: mountStatistics(), unmountStatistics(), window.statisticsService');
    };
// Cache buster - Tue Sep 23 16:26:01 CDT 2025
}
