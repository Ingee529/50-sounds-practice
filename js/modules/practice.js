// Practice 模組 - 練習頁面的事件驅動 UI
// 採用 mount/unmount 範式防止事件洩漏

import { on } from '../core/events.js';
import { getState, setKanaType, setPracticeConfig, setSelection } from '../core/state.js';
import { 
    getQuickRangeKeys, 
    getKanaType, 
    getQuestionCount, 
    getPracticeMode,
    canStartPractice,
    getPracticeSummary 
} from '../core/selectors.js';
import { tt } from '../i18n/i18n.js';

// 事件監聽器清理數組
let offs = [];

// DOM 查詢輔助工具
const $id = (id) => document.getElementById(id);

// 等待 DOM 元素載入的輔助函數
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // 設定超時
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

// 渲染節流控制
let renderRAF = null;

/**
 * 掛載練習模組
 */
export function mountPractice() {
    console.log('🎯 [practice] Mounting practice module...');
    
    // 檢查練習頁面根容器是否存在
    const root = $id('practice-tab') || $id('practice-section') || $id('practice-content');
    if (!root) {
        console.warn('[practice] Practice container not found, skip mount');
        return;
    }
    
    // 監聽狀態和 i18n 事件（使用節流渲染）
    offs.push(on('i18n:changed', requestRender));
    offs.push(on('practice:kana.changed', requestRender));
    offs.push(on('practice:config.changed', requestRender));
    offs.push(on('practice:selection.changed', requestRender));
    offs.push(on('ui:rerender', requestRender));
    
    // 綁定 DOM 事件到狀態更新
    bindDOMEvents();
    
    // 初次渲染
    render();
    
    console.log('✅ [practice] Practice module mounted');
}

/**
 * 卸載練習模組，清理事件監聽器
 */
export function unmountPractice() {
    console.log('🎯 [practice] Unmounting practice module...');
    
    offs.forEach(off => off && off());
    offs = [];
    
    // 清理渲染節流
    if (renderRAF !== null) {
        cancelAnimationFrame(renderRAF);
        renderRAF = null;
    }
    
    console.log('✅ [practice] Practice module unmounted');
}

/**
 * 綁定 DOM 事件到狀態更新，並註冊清理函數
 */
function bindDOMEvents() {
    // 定義具名事件處理器
    const onHiragana = () => setKanaType('hiragana');
    const onKatakana = () => setKanaType('katakana');
    const onMixed = () => setKanaType('mixed');
    
    const onModeQuick = (e) => {
        if (e.target.checked) {
            setPracticeConfig({ mode: 'quick' });
        }
    };
    
    const onModeCustom = (e) => {
        if (e.target.checked) {
            setPracticeConfig({ mode: 'custom' });
        }
    };
    
    const onCount10 = () => setPracticeConfig({ count: 10 });
    const onCount15 = () => setPracticeConfig({ count: 15 });
    const onCount20 = () => setPracticeConfig({ count: 20 });
    
    
    // 安全綁定事件（防止元素不存在時出錯）
    const bindEvent = (id, event, handler) => {
        const el = $id(id);
        if (el) {
            el.addEventListener(event, handler);
            offs.push(() => el.removeEventListener(event, handler));
        } else {
            console.warn(`[practice] Element not found: ${id}`);
        }
    };
    
    // 綁定假名類型事件（綁定到 input radio）
    const bindRadioEvents = () => {
        const kanaRadios = document.querySelectorAll('input[name="kana-type"]');
        kanaRadios.forEach(radio => {
            const handler = (e) => setKanaType(e.target.value);
            radio.addEventListener('change', handler);
            offs.push(() => radio.removeEventListener('change', handler));
        });
        
        const modeRadios = document.querySelectorAll('input[name="practice-mode"]');
        modeRadios.forEach(radio => {
            const handler = (e) => setPracticeConfig({ mode: e.target.value });
            radio.addEventListener('change', handler);
            offs.push(() => radio.removeEventListener('change', handler));
        });
    };
    
    // 綁定其他按鈕事件 (start-btn 由 index.html 處理)
    
    // 綁定 radio 事件
    bindRadioEvents();
    
    // 綁定自訂練習的 checkbox 事件
    bindCustomModeEvents();
}

/**
 * 綁定自訂練習模式的事件
 */
function bindCustomModeEvents() {
    // 綁定單一行選擇 checkbox 事件
    const kanaRowCheckboxes = document.querySelectorAll('input[name="kana-row"]');
    kanaRowCheckboxes.forEach(checkbox => {
        const handler = () => updateSelectionCount();
        checkbox.addEventListener('change', handler);
        offs.push(() => checkbox.removeEventListener('change', handler));
    });
    console.log(`[practice] Bound ${kanaRowCheckboxes.length} kana-row checkboxes`);
    
    // 初始化選擇計數
    updateSelectionCount();
}

/**
 * 更新自訂練習的選擇計數（包含狀態同步）
 */
function updateSelectionCount() {
    const selectedRows = document.querySelectorAll('input[name="kana-row"]:checked');
    let totalCount = 0;

    // 收集選中的行
    const selectedRowValues = [];

    // 這個函數現在暫時只做基本計數，完整的 kanaRowData 邏輯稍後處理
    selectedRows.forEach(checkbox => {
        const rowValue = checkbox.value;
        selectedRowValues.push(rowValue);

        // 簡化版計數：每行假設 5 個字符
        totalCount += 5;
    });

    // 更新狀態管理系統中的選擇
    if (window.setSelection) {
        window.setSelection({ rows: selectedRowValues, ranges: [] });
        console.log(`[practice] Synced selection to state:`, selectedRowValues);
    } else {
        console.warn('[practice] window.setSelection not available');
    }

    // 更新顯示
    updateSelectionDisplay();

    console.log(`[practice] Updated selection count: ${totalCount} characters from ${selectedRowValues.length} rows`);
}

/**
 * 僅更新選擇計數的顯示（不觸發狀態變更）
 */
function updateSelectionDisplay() {
    const selectedRows = document.querySelectorAll('input[name="kana-row"]:checked');
    let totalCount = 0;

    // 計算總數
    selectedRows.forEach(checkbox => {
        // 簡化版計數：每行假設 5 個字符
        totalCount += 5;
    });

    // 更新顯示元素
    const selectedCountEl = document.getElementById('selected-count');
    const totalSelectedEl = document.getElementById('total-selected');

    if (selectedCountEl) {
        // 使用翻譯系統，安全檢查 __i18nRef
        const _t = (k) => {
            if (typeof window !== 'undefined' && window.__i18nRef?.t) {
                return window.__i18nRef.t(k);
            }
            return k; // 降級處理，返回鍵值
        };
        const template = _t('practice.selectedCount');
        selectedCountEl.textContent = template.replace('{count}', totalCount);
    }
    if (totalSelectedEl) {
        totalSelectedEl.textContent = totalCount;
    }
}

/**
 * 快速選擇分類功能
 */
function selectCategory(category) {
    console.log(`[practice] Quick select category: ${category}`);
    
    // 先取消所有選擇
    document.querySelectorAll('input[name="kana-row"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 根據類別選擇對應的行
    const categoryMap = {
        'basic': ['a-row', 'ka-row', 'sa-row', 'ta-row', 'na-row', 'ha-row', 'ma-row', 'ya-row', 'ra-row', 'wa-row'],
        'dakuten': ['ga-row', 'za-row', 'da-row', 'ba-row'],
        'handakuten': ['pa-row'],
        'youon': ['kya-row', 'sha-row', 'cha-row', 'nya-row', 'hya-row', 'mya-row', 'rya-row', 'gya-row', 'ja-row', 'bya-row', 'pya-row']
    };
    
    if (categoryMap[category]) {
        categoryMap[category].forEach(rowValue => {
            const checkbox = document.querySelector(`input[name="kana-row"][value="${rowValue}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
    
    updateSelectionCount();
}

/**
 * 清除所有選擇
 */
function clearAllSelection() {
    console.log(`[practice] Clear all selection`);
    document.querySelectorAll('input[name="kana-row"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSelectionCount();
}

// 暴露函數到全域範圍以供 onclick 使用
if (typeof window !== 'undefined') {
    window.selectCategory = selectCategory;
    window.clearAllSelection = clearAllSelection;
}

/**
 * 主要渲染函數
 */
function render() {
    const state = getState();

    // 更新快速練習範圍標籤
    updateQuickRangeLabels(state);

    // 更新假名類型標籤
    updateKanaTypeLabels(state);

    // 更新練習配置 UI
    updatePracticeConfigUI(state);

    // 更新開始按鈕狀態
    updateStartButton(state);

    // 更新其他 UI 元素
    updateGeneralLabels(state);

    // 只更新顯示，不觸發狀態變更
    updateSelectionDisplay();
}

/**
 * 更新快速練習範圍標籤
 */
function updateQuickRangeLabels(state) {
    const keys = getQuickRangeKeys(state);
    
    setTxt('quick-basic-label', keys.basic);
    setTxt('quick-dakuten-label', keys.dakuten);
    setTxt('quick-handakuten-label', keys.handakuten);
    setTxt('quick-youon-label', keys.youon);
}

/**
 * 更新假名類型標籤
 */
function updateKanaTypeLabels(state) {
    setTxt('type-hiragana', 'chart.hiragana');
    setTxt('type-katakana', 'chart.katakana');
    setTxt('type-mixed', 'kana.types.mixed');
    
    // 更新選中狀態（操作實際的 radio input）
    const currentType = getKanaType(state);
    const kanaRadios = document.querySelectorAll('input[name="kana-type"]');
    kanaRadios.forEach(radio => {
        radio.checked = (radio.value === currentType);
    });
}

/**
 * 更新練習配置 UI
 */
function updatePracticeConfigUI(state) {
    const mode = getPracticeMode(state);
    const count = getQuestionCount(state);
    
    // 更新模式選中狀態（操作實際的 radio input）
    const modeRadios = document.querySelectorAll('input[name="practice-mode"]');
    modeRadios.forEach(radio => {
        radio.checked = (radio.value === mode);
    });
    
    // 更新模式選項的顯示/隱藏狀態
    updateModeOptionsVisibility(mode);
    
    // 更新題數標籤
    setTxt('question-count-label', 'practice.questionCount', { count });
    
    // 題數選擇暫時跳過（需要確認實際 HTML 結構）
    // updateRadioState('count-10', count === 10);
    // updateRadioState('count-15', count === 15);  
    // updateRadioState('count-20', count === 20);
}

/**
 * 更新模式選項的顯示/隱藏狀態
 */
async function updateModeOptionsVisibility(mode) {
    try {
        // 等待元素載入
        const quickModeOptions = await waitForElement('#quick-mode-options', 2000);
        const customModeOptions = await waitForElement('#custom-mode-options', 2000);
        
        console.log('[practice] Mode option elements found, updating visibility...');
    
    // 保險：同時控制 class 與 inline style，避免樣式覆蓋導致顯示錯誤
    const show = (el, visible) => {
        el.classList.toggle('hidden', !visible);
        el.style.display = visible ? '' : 'none';
    };
    
        if (mode === 'quick') {
            show(quickModeOptions, true);
            show(customModeOptions, false);
            console.log('[practice] Switched to quick mode');
        } else if (mode === 'custom') {
            show(quickModeOptions, false);
            show(customModeOptions, true);
            console.log('[practice] Switched to custom mode');
        } else {
            // 預設隱藏所有選項
            show(quickModeOptions, false);
            show(customModeOptions, false);
        }
    } catch (error) {
        console.warn('[practice] Failed to update mode options visibility:', error);
    }
}

/**
 * 更新開始按鈕狀態
 */
function updateStartButton(state) {
    const startBtn = document.getElementById('start-btn');
    if (!startBtn) return;
    
    setTxt('start-btn', 'practice.startBtn');
    
    const canStart = canStartPractice(state);
    startBtn.disabled = !canStart;
    startBtn.classList.toggle('disabled', !canStart);
}

/**
 * 更新通用標籤
 */
function updateGeneralLabels(state) {
    setTxt('practice-mode-title', 'practice.title');
    setTxt('mode-quick-name', 'practice.quickMode');
    setTxt('mode-quick-desc', 'practice.quickModeDesc');
    setTxt('mode-custom-name', 'practice.customMode');
    setTxt('mode-custom-desc', 'practice.customModeDesc');
    
    // 更新練習範圍標題
    setTxt('quick-range-label', 'practice.practiceRange');
    setTxt('quick-count-label', 'practice.questionCount');
    
    // 更新練習界面元素
    setTxt('submit-btn', 'practice.submitAnswer');
    
    // 更新輸入框 placeholder
    const answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.placeholder = tt('practice.enterRomaji');
    }
    
    // 更新自訂練習的練習量選項
    setTxt('practice-amount-label', 'practice.practiceAmount');
    setTxt('all-practice-label', 'practice.allPractice');
    setTxt('random-15-label', 'practice.random15');
    setTxt('random-30-label', 'practice.random30');
    setTxt('questions-label', 'practice.questions');
}

/**
 * 開始練習
 */
function startPractice() {
    const state = getState();
    const summary = getPracticeSummary(state);
    
    console.log('🎯 [practice] Starting practice with config:', summary);
    
    // 呼叫現有的 startQuiz 函數來開始練習
    if (typeof window.startQuiz === 'function') {
        window.startQuiz();
    } else {
        console.error('[practice] startQuiz function not found in global scope');
        // 如果 startQuiz 不存在，可能需要等待頁面載入完成
        setTimeout(() => {
            if (typeof window.startQuiz === 'function') {
                window.startQuiz();
            } else {
                console.error('[practice] startQuiz function still not found after delay');
            }
        }, 100);
    }
    
    // 發出練習開始事件
    import('../core/events.js').then(({ emit }) => {
        emit('practice:started', { config: summary });
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
    const el = document.getElementById(id);
    if (el) {
        el.textContent = tt(key, opts);
    }
}

/**
 * 更新單選按鈕/復選框狀態（防呆版）
 * @param {string} id - 元素 ID
 * @param {boolean} checked - 是否選中
 */
function updateRadioState(id, checked) {
    const el = $id(id);
    if (!el) {
        // 元素不存在，靜默忽略（避免在不同頁面報錯）
        return;
    }
    
    if (el.type === 'radio' || el.type === 'checkbox') {
        el.checked = !!checked;
    } else {
        // 對於非 input 元素，使用 aria 屬性
        el.setAttribute('aria-pressed', checked ? 'true' : 'false');
    }
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
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugPractice = function() {
        console.log('🔍 Practice Module Debug:');
        console.log('📊 Event listeners:', offs.length);
        console.log('🎯 Current state:', getPracticeSummary(getState()));
        console.log('💡 Available: mountPractice(), unmountPractice()');
    };
}