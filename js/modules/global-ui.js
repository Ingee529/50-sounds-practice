// Global UI 模組 - 全站公共文字管理
// 負責渲染和更新不屬於特定模組的全站文字

import { on } from '../core/events.js';
import { tt } from '../i18n/i18n.js';

// 事件監聽器清理數組
let offs = [];

/**
 * 掛載全域 UI 模組
 */
export function mountGlobalUI() {
    console.log('🌐 [global-ui] Mounting global UI module...');
    
    const render = () => {
        // 應用程式標題
        setTxt('app-title', 'app.title');
        
        // 練習模組相關（如果存在）
        setTxt('practice-mode-title', 'practice.title');
        setTxt('type-hiragana', 'chart.hiragana');
        setTxt('type-katakana', 'chart.katakana');
        setTxt('type-mixed', 'kana.types.mixed');
        setTxt('start-btn', 'practice.startBtn');
        setTxt('quiz-title', 'practice.title');
        setTxt('submit-answer-btn', 'practice.submitAnswer');
        setTxt('next-question-btn', 'practice.nextQuestion');
        setTxt('back-to-setup-btn', 'practice.backToSetup');
        setTxt('restart-btn', 'practice.restartPractice');
        setTxt('result-title', 'practice.resultTitle');
        
        // 五十音表模組相關（如果存在）
        setTxt('chart-title', 'chart.title');
        
        // placeholder 屬性
        setAttr('answer-input', 'placeholder', 'practice.answerPlaceholder');
        
        console.log('📝 [global-ui] Global text rendered');
    };
    
    const onLang = () => requestAnimationFrame(render);
    offs.push(on('i18n:changed', onLang));
    
    // 初次渲染
    render();
    
    console.log('✅ [global-ui] Global UI module mounted');
}

/**
 * 卸載全域 UI 模組
 */
export function unmountGlobalUI() {
    console.log('🧹 [global-ui] Unmounting global UI module...');
    
    offs.forEach(off => off && off());
    offs = [];
    
    console.log('✅ [global-ui] Global UI module unmounted');
}

// Helper functions
function setTxt(id, key, opts = {}) {
    const el = document.getElementById(id);
    if (el) {
        const text = tt(key, opts) ?? key;
        el.textContent = text;
    }
}

function setAttr(id, attr, key, opts = {}) {
    const el = document.getElementById(id);
    if (el) {
        const text = tt(key, opts) ?? key;
        el.setAttribute(attr, text);
    }
}

// 開發工具
if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugGlobalUI = function() {
        console.log('🔍 Global UI Debug Information:');
        console.log('📝 Event listeners:', offs.length);
        console.log('💡 Available: mountGlobalUI(), unmountGlobalUI()');
    };
}