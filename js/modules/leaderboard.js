// Leaderboard 模組 - 排行榜的事件驅動 UI
// 採用 mount/unmount 範式防止事件洩漏

import { on } from '../core/events.js';
import { getState, setLeaderboard } from '../core/state.js';
// import { fetchLeaderboard } from '../core/services/leaderboardService.fake.js';
import { tt } from '../i18n/i18n.js';

// 事件監聽器清理數組
let offs = [];

/**
 * 掛載排行榜模組
 */
export function mountLeaderboard() {
    console.log('🏆 [leaderboard] Mounting leaderboard module...');
    
    // 監聽排行榜事件
    offs.push(on('leaderboard:fetch.request', () => renderLoading(true)));
    offs.push(on('leaderboard:fetch.ok', ({ data }) => {
        setLeaderboard({ top: data, loading: false, error: null });
        render();
    }));
    offs.push(on('leaderboard:fetch.failed', (e) => {
        setLeaderboard({ loading: false, error: String(e) });
        render();
    }));
    
    // 監聽 i18n 變化
    offs.push(on('i18n:changed', render));
    offs.push(on('ui:rerender', render));
    
    // 綁定 DOM 事件
    bindDOMEvents();
    
    // 初次渲染
    render();
    
    console.log('✅ [leaderboard] Leaderboard module mounted');
}

/**
 * 卸載排行榜模組，清理事件監聽器
 */
export function unmountLeaderboard() {
    console.log('🏆 [leaderboard] Unmounting leaderboard module...');
    
    offs.forEach(off => off && off());
    offs = [];
    
    console.log('✅ [leaderboard] Leaderboard module unmounted');
}

/**
 * 綁定 DOM 事件並註冊清理函數
 */
function bindDOMEvents() {
    const onRefreshBtn = () => {
        console.log('[leaderboard] Refresh button clicked');
        // TODO: 觸發重新載入
        // fetchLeaderboard({ season: 's1', limit: 50 });
    };
    
    const elRefreshBtn = document.getElementById('lb-refresh-btn');
    elRefreshBtn?.addEventListener('click', onRefreshBtn);
    offs.push(() => elRefreshBtn?.removeEventListener('click', onRefreshBtn));
}

/**
 * 主要渲染函數
 */
function render() {
    const state = getState();
    const leaderboard = state.leaderboard || {};
    const list = leaderboard.top || [];
    
    // 更新表頭 i18n
    updateTableHeaders();
    
    // 更新排行榜內容
    updateLeaderboardContent(list);
    
    // 更新 loading 狀態
    updateLoadingState(leaderboard.loading || false);
    
    // 更新錯誤狀態
    updateErrorState(leaderboard.error);
}

/**
 * 更新表頭 i18n 文字
 */
function updateTableHeaders() {
    setTxt('lb-title', 'leaderboard.title');
    setTxt('lb-th-rank', 'leaderboard.rank');
    setTxt('lb-th-name', 'leaderboard.name');
    setTxt('lb-th-score', 'leaderboard.score');
    setTxt('lb-th-accuracy', 'leaderboard.accuracy');
    setTxt('lb-th-speed', 'leaderboard.speed');
}

/**
 * 更新排行榜內容（修復 Math.round 斷行問題）
 */
function updateLeaderboardContent(list) {
    const tbody = document.getElementById('lb-body');
    if (!tbody) return;
    
    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                    ${tt('leaderboard.noData')}
                </td>
            </tr>
        `;
        return;
    }
    
    // 修復：確保 Math.round 在同一行，避免斷行造成語法錯誤
    tbody.innerHTML = list.map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(r.name || 'Unknown')}</td>
            <td>${r.points || 0}</td>
            <td>${((r.accuracy || 0) * 100).toFixed(1)}%</td>
            <td>${Math.round(r.speed_ms || 0)}ms</td>
        </tr>
    `).join('');
}

/**
 * 更新載入狀態
 */
function updateLoadingState(isLoading) {
    const loadingEl = document.getElementById('lb-loading');
    const contentEl = document.getElementById('lb-content');
    
    if (loadingEl) {
        loadingEl.style.display = isLoading ? 'block' : 'none';
        setTxt('lb-loading-text', 'common.loading');
    }
    
    if (contentEl) {
        contentEl.style.display = isLoading ? 'none' : 'block';
    }
}

/**
 * 更新錯誤狀態
 */
function updateErrorState(error) {
    const errorEl = document.getElementById('lb-error');
    
    if (errorEl) {
        if (error) {
            errorEl.style.display = 'block';
            setTxt('lb-error-text', 'leaderboard.loadError');
            
            // 在開發環境顯示詳細錯誤
            if (['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
                const errorDetail = document.getElementById('lb-error-detail');
                if (errorDetail) {
                    errorDetail.textContent = error;
                    errorDetail.style.display = 'block';
                }
            }
        } else {
            errorEl.style.display = 'none';
        }
    }
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
    const el = document.getElementById(id);
    if (el) {
        el.textContent = tt(key, opts);
    }
}

/**
 * 轉義 HTML 字符，防止 XSS
 * @param {string} unsafe - 不安全的字符串
 * @returns {string} 轉義後的字符串
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * 渲染載入中狀態
 * @param {boolean} isLoading - 是否載入中
 */
function renderLoading(isLoading) {
    updateLoadingState(isLoading);
}

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugLeaderboard = function() {
        console.log('🔍 Leaderboard Module Debug:');
        console.log('📊 Event listeners:', offs.length);
        console.log('🏆 Current state:', getState().leaderboard);
        console.log('💡 Available: mountLeaderboard(), unmountLeaderboard()');
    };
}