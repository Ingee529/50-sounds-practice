// Auth Login 模組 - 登入頁面文字管理
// 負責渲染和更新所有認證相關的文字

import { on } from '../core/events.js';
import { tt } from '../i18n/i18n.js';

// 事件監聽器清理數組
let offs = [];

/**
 * 掛載登入模組
 */
export function mountLogin() {
    console.log('🔐 [auth-login] Mounting login module...');
    
    const render = () => {
        // 頁面標題
        setTxt('auth-title', 'app.title');
        setTxt('title', 'app.title');
        
        // 登入/註冊標籤頁
        setTxt('login-tab', 'app.login');
        setTxt('register-tab', 'app.register');
        
        // 表單標籤
        setTxt('login-identifier-label', 'auth.loginAccount');
        setTxt('login-password-label', 'auth.password');
        setTxt('register-username-label', 'auth.username');
        setTxt('register-email-label', 'auth.email');
        setTxt('register-display-name-label', 'auth.displayName');
        setTxt('register-birth-date-label', 'auth.birthDate');
        setTxt('register-language-label', 'auth.language');
        setTxt('register-password-label', 'auth.password');
        setTxt('register-password-confirm-label', 'auth.confirmPassword');
        
        // 表單 placeholder
        setAttr('login-identifier', 'placeholder', 'auth.loginAccount');
        setAttr('login-password', 'placeholder', 'auth.password');
        setAttr('register-username', 'placeholder', 'auth.username');
        setAttr('register-email', 'placeholder', 'auth.email');
        setAttr('register-display-name', 'placeholder', 'auth.displayNamePlaceholder');
        setAttr('register-password', 'placeholder', 'auth.password');
        setAttr('register-password-confirm', 'placeholder', 'auth.confirmPassword');
        
        // 用戶狀態相關
        setTxt('guest-mode-title', 'app.guestMode');
        setTxt('guest-warning-text', 'app.guestWarning');
        setTxt('login-signup-btn', 'app.loginRegister');
        setTxt('logout-btn', 'app.logout');
        
        // 導航標籤
        setTxt('nav-practice', 'nav.practice');
        setTxt('nav-chart', 'nav.chart');
        setTxt('nav-statistics', 'nav.statistics');
        
        console.log('📝 [auth-login] Text rendered');
    };
    
    const onLang = () => requestAnimationFrame(render);
    offs.push(on('i18n:changed', onLang));
    
    // 初次渲染
    render();
    
    console.log('✅ [auth-login] Login module mounted');
}

/**
 * 卸載登入模組
 */
export function unmountLogin() {
    console.log('🧹 [auth-login] Unmounting login module...');
    
    offs.forEach(off => off && off());
    offs = [];
    
    console.log('✅ [auth-login] Login module unmounted');
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
    window.debugAuthLogin = function() {
        console.log('🔍 Auth Login Debug Information:');
        console.log('📝 Event listeners:', offs.length);
        console.log('💡 Available: mountLogin(), unmountLogin()');
    };
}