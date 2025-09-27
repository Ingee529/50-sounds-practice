// Chart 模組 - 五十音表的事件驅動 UI
// 採用 mount/unmount 範式防止事件洩漏

import { on } from '../core/events.js';
import { getState, setKanaType } from '../core/state.js';
import { tt } from '../i18n/i18n.js';

// 事件監聽器清理數組
let offs = [];

// DOM 查詢輔助工具
const $id = (id) => document.getElementById(id);

// 渲染節流控制
let renderRAF = null;

/**
 * 掛載五十音表模組
 */
export function mountChart() {
    console.log('📊 [chart] Mounting chart module...');
    
    // 檢查五十音表頁面根容器是否存在
    const root = $id('chart-tab');
    if (!root) {
        console.warn('[chart] Chart container not found, skip mount');
        return;
    }
    
    // 監聽語言和狀態變化事件（使用節流渲染）
    offs.push(on('i18n:changed', requestRender));
    offs.push(on('practice:kana.changed', requestRender)); // 統一使用 practice.kanaType
    offs.push(on('ui:rerender', requestRender));
    
    // 綁定 DOM 事件
    bindDOMEvents();
    
    // 初次渲染
    render();
    
    console.log('✅ [chart] Chart module mounted');
}

/**
 * 卸載五十音表模組，清理事件監聽器
 */
export function unmountChart() {
    console.log('📊 [chart] Unmounting chart module...');
    
    offs.forEach(off => off && off());
    offs = [];
    
    // 清理渲染節流
    if (renderRAF !== null) {
        cancelAnimationFrame(renderRAF);
        renderRAF = null;
    }
    
    console.log('✅ [chart] Chart module unmounted');
}

/**
 * 綁定 DOM 事件並註冊清理函數
 */
function bindDOMEvents() {
    // 綁定假名類型選擇（radio input）- 統一使用 practice.kanaType
    const chartRadios = document.querySelectorAll('input[name="chart-type"]');
    chartRadios.forEach(radio => {
        const handler = (e) => {
            console.log('[chart] Kana type changed to:', e.target.value);
            setKanaType(e.target.value); // 統一使用 setKanaType
        };
        radio.addEventListener('change', handler);
        offs.push(() => radio.removeEventListener('change', handler));
    });
}

/**
 * 主要渲染函數
 */
function render() {
    const state = getState();
    
    // 更新五十音表標籤
    updateChartLabels();
    
    // 更新選中狀態（簡化調用，使用預設參數）
    updateChartSelection(state);
    
    // 更新促音和長音說明
    updateSpecialSounds();
}

/**
 * 更新五十音表標籤（使用實際 HTML ID）
 */
function updateChartLabels() {
    setTxt('chart-hiragana-label', 'chart.hiragana');
    setTxt('chart-katakana-label', 'chart.katakana');
}

/**
 * 更新圖表選中狀態（參數兼容，統一從 practice.kanaType 讀取）
 */
function updateChartSelection(state, kanaType = state?.practice?.kanaType || 'hiragana') {
    const radios = document.querySelectorAll('input[name="chart-type"]');
    if (!radios.length) return; // 安全跳過，避免空的 NodeList
    
    radios.forEach(radio => {
        radio.checked = (radio.value === kanaType);
    });
}

/**
 * 更新特殊音說明（使用實際存在的扁平翻譯鍵）
 */
function updateSpecialSounds() {
    // 促音說明（使用實際 HTML ID 和扁平鍵）
    setTxt('group-sokuon', 'kana.categories.sokuon');        // 標題
    setTxt('sokuon-desc', 'chart.sokuonDesc');               // 描述
    setTxt('sokuon-example', 'chart.sokuonExample');         // 例子
    
    // 長音說明（使用實際 HTML ID 和扁平鍵）
    setTxt('group-chouon', 'kana.categories.chouon');        // 標題  
    setTxt('chouon-desc', 'chart.chouonDesc');               // 描述
    setTxt('chouon-example', 'chart.chouonExample');         // 例子
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
    } else {
        // 開發環境提示缺失的元素
        if (['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
            console.warn(`[chart] Element not found: ${id}`);
        }
    }
}

/**
 * 切換元素活動狀態（支持無障礙）
 * @param {string} id - 元素 ID
 * @param {boolean} active - 是否活動
 */
function toggleActive(id, active) {
    const el = $id(id);
    if (!el) return;
    
    el.classList.toggle('is-active', !!active);
    el.setAttribute('aria-pressed', active ? 'true' : 'false');
}

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugChart = function() {
        console.log('🔍 Chart Module Debug:');
        console.log('📊 Event listeners:', offs.length);
        console.log('📋 Current kana type:', getState().practice?.kanaType);
        console.log('💡 Available: mountChart(), unmountChart()');
    };
}