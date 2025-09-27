// Safari 日期輸入優化
function optimizeSafariDateInputs() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        // 確保正確的類型和屬性
        input.setAttribute('type', 'date');
        
        // 添加用戶交互觸發日曆（只在用戶操作時調用）
        input.addEventListener('click', function(e) {
            // 只在真正的用戶點擊時才嘗試 showPicker
            if (e.isTrusted && this.showPicker) {
                try {
                    this.showPicker();
                } catch (err) {
                    // 如果 showPicker 失敗，不做任何處理
                    // Safari 會自動顯示其原生日期選擇器
                }
            }
        });
        
        // 確保 Safari 使用原生樣式
        input.style.webkitAppearance = '';
        input.style.appearance = '';
    });
}

// 6. 調試工具
window.debugApp = function() {
    console.log('🔍 App Debug Information:');
    console.log('🌐 Current Language:', __i18nRef?.getCurrentLanguage?.() || 'unknown');
    console.log('📦 Loaded Modules:', {
        i18n: !!window.i18n,
        practiceModule: !!window.practiceModule,
        auth: !!window.apiCall
    });
    console.log('🎯 Current User:', typeof currentUser !== 'undefined' ? currentUser : 'not defined');
    console.log('🔑 Has Token:', typeof authToken !== 'undefined' && !!authToken);
    console.log('📊 Practice State:', window.practiceModule?.getState?.()?.practice);
    
    // 檢查語言選擇器同步狀態
    const selectors = ['language', 'auth-language', 'register-language', 'practice-language', 'review-language'];
    const selectorStates = {};
    selectors.forEach(id => {
        const el = document.getElementById(id);
        if (el) selectorStates[id] = el.value;
    });
    console.log('🌍 Language Selectors:', selectorStates);
    
    console.log('💡 Run debugApp() to see this info again');
};

// 5. 添加錯誤邊界
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeSafariDateInputs);
} else {
    optimizeSafariDateInputs();
}

// 暴露Safari工具函數到全域作用域
window.optimizeSafariDateInputs = optimizeSafariDateInputs;
window.debugApp = debugApp;
