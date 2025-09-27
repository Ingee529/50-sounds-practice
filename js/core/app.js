// 應用程式主要入口點 - 統一初始化和模組掛載
// 確保正確的載入順序：i18n → DOM → modules

import { initI18n, bindI18nTexts } from '../i18n/i18n.js';
import { initAuth } from './auth.js';
import { initNotifications } from './notifications.js';
import { checkApiHealth } from './api.js';
import { renderTemplate, preloadTemplates } from './template-loader.js';
import { mountPractice } from '../modules/practice.js';
import { mountChart } from '../modules/chart.js';
import { mountStatistics } from '../modules/statistics.js';
import { mountLogin } from '../modules/auth-login.js';
import { mountGlobalUI } from '../modules/global-ui.js';
import { on } from './events.js';

// 全站重新渲染節流控制
let rAF = null;

/**
 * 應用程式啟動
 */
async function bootstrap() {
    console.log('🚀 [app] Starting application bootstrap...');
    
    try {
        // 等待 DOM 就緒
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            });
        }
        
        console.log('✅ [app] DOM ready, initializing core systems...');
        
        // 1. 檢查 API 健康狀態
        console.log('🏥 [app] Checking API health...');
        const apiHealth = await checkApiHealth();
        if (apiHealth.status === 'error') {
            console.warn('⚠️ [app] API health check failed:', apiHealth.error);
            // 繼續初始化但記錄警告
        } else {
            console.log('✅ [app] API health check passed');
        }
        
        // 2. 同時初始化核心系統
        console.log('🔧 [app] Initializing core systems...');
        await Promise.all([
            initI18n('zh'),
            initAuth(),
            initNotifications()
        ]);
        
        // 立刻止血：掃描所有 data-i18n* 並填入文字
        console.log('🔤 [app] Binding i18n texts...');
        bindI18nTexts(document);
        
        // 語言更改時再次填入文字
        on('i18n:changed', () => {
            console.log('🔤 [app] Language changed, rebinding texts...');
            bindI18nTexts(document);
        });
        
        console.log('✅ [app] Core systems initialized, loading templates...');
        
        // 3. 載入 HTML 模板
        console.log('📄 [app] Loading page templates...');
        try {
            await Promise.all([
                renderTemplate('practice-tab', '#practice-tab'),
                renderTemplate('chart-tab', '#chart-tab'),
                renderTemplate('statistics-tab', '#statistics-tab')
            ]);
            console.log('✅ [app] All templates loaded successfully');
            
            // 重新綁定新載入模板的 i18n 文字
            bindI18nTexts(document);
            
            // 重新設置事件監聽器，確保模板載入後的元素能正確綁定事件
            if (typeof window.setupEventListeners === 'function') {
                console.log('🔗 [app] Re-setting up event listeners after template load...');
                window.setupEventListeners();
            } else {
                console.warn('⚠️ [app] setupEventListeners not found on window object');
            }
            
        } catch (error) {
            console.error('❌ [app] Failed to load templates:', error);
            // 繼續初始化，但可能會有功能缺失
        }
        
        console.log('✅ [app] Templates loaded, mounting modules...');
        
        // 設置認證狀態監控
        setupAuthMonitoring();
        
        // 設置全站重新渲染事件監聽
        setupGlobalRerender();
        
        // 掛載所有模組
        mountPractice();
        mountChart();
        mountStatistics(); // statistics 會聽 auth:inited / auth:user.changed 自行載入
        mountLogin();
        mountGlobalUI();
        
        console.log('🎉 [app] Application bootstrap completed!');
        
    } catch (error) {
        console.error('❌ [app] Bootstrap failed:', error);
        
        // 顯示錯誤給用戶
        showBootstrapError(error);
        
        // 如果通知系統已初始化，也發送通知
        try {
            const { showNotification } = await import('./notifications.js');
            showNotification({
                title: '應用啟動失敗',
                message: '應用程式初始化時發生錯誤，請重新整理頁面。',
                type: 'error',
                duration: 0
            });
        } catch {
            // 通知系統可能未初始化，忽略
        }
    }
}

// waitForI18n 函數已移除 - 改用直接 import initI18n

/**
 * 設置全站重新渲染機制（使用 rAF 節流）
 */
function setupGlobalRerender() {
    // 動態載入事件系統
    import('./events.js').then(({ on }) => {
        on('ui:rerender', () => {
            // 取消之前的渲染請求
            if (rAF !== null) {
                cancelAnimationFrame(rAF);
            }
            
            // 安排下一幀渲染
            rAF = requestAnimationFrame(() => {
                console.log('🔄 [app] Global rerender triggered');
                
                // 這裡可以觸發各模組的 render 方法
                // 或者發出更細粒度的事件
                
                rAF = null;
            });
        });
    });
}

/**
 * 設置認證狀態監控
 */
function setupAuthMonitoring() {
    console.log('👀 [app] Setting up authentication monitoring...');
    
    // 監聽認證相關事件
    on('auth:token.expired', (event) => {
        const data = event?.detail || event || {};
        console.log('🔐 [app] Token expired event received:', data);
        // 通知系統會自動處理用戶提示
    });
    
    on('auth:token.refreshed', () => {
        console.log('🔄 [app] Token refreshed successfully');
        // 可以在這裡重新載入需要認證的數據
        import('./events.js').then(({ emit }) => {
            emit('data:refresh');
        });
    });
    
    on('auth:user.changed', (event) => {
        // 處理事件數據，兼容 detail 屬性和直接傳遞的方式
        const data = event?.detail || event || {};
        const { previous, current } = data;
        console.log('👤 [app] User changed:', { 
            from: previous?.user?.username || 'none', 
            to: current?.user?.username || 'none' 
        });
        
        // 用戶狀態改變時清理和重新載入數據
        if (current?.user) {
            // 用戶登入 - 可以預載一些數據
            console.log('📊 [app] User logged in, preloading data...');
        } else {
            // 用戶登出 - 清理敏感數據
            console.log('🧹 [app] User logged out, clearing data...');
            import('../core/services/statisticsService.js').then(({ clearCache }) => {
                clearCache();
            });
        }
    });
    
    on('network:error', (event) => {
        const data = event?.detail || event || {};
        const { source, error } = data;
        console.log('🌐 [app] Network error from', source, ':', error);
        // 通知系統會自動處理用戶提示
    });
    
    console.log('✅ [app] Authentication monitoring setup complete');
}


/**
 * 顯示啟動錯誤
 */
function showBootstrapError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        border-radius: 4px;
        padding: 15px 20px;
        z-index: 9999;
        max-width: 500px;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    errorDiv.innerHTML = `
        <strong>應用啟動失敗</strong><br>
        ${error.message}<br>
        <small>請重新整理頁面，如果問題持續請聯繫支援</small>
    `;
    
    document.body.appendChild(errorDiv);
    
    // 5秒後自動移除
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// ==========================================
// 模組清理（用於開發/測試）
// ==========================================

/**
 * 卸載所有模組（開發用）
 */
function unmountAllModules() {
    console.log('🧹 [app] Unmounting all modules...');
    
    try {
        // 卸載各模組
        import('../modules/practice.js').then(({ unmountPractice }) => {
            unmountPractice();
        });
        
        import('../modules/chart.js').then(({ unmountChart }) => {
            unmountChart();
        });
        
        import('../modules/statistics.js').then(({ unmountStatistics }) => {
            unmountStatistics();
        });
        
        import('../modules/auth-login.js').then(({ unmountLogin }) => {
            unmountLogin();
        });
        
        import('../modules/global-ui.js').then(({ unmountGlobalUI }) => {
            unmountGlobalUI();
        });
        
        console.log('✅ [app] All modules unmounted');
        
    } catch (error) {
        console.error('❌ [app] Failed to unmount modules:', error);
    }
}

// ==========================================
// 啟動應用
// ==========================================

// 立即啟動
bootstrap();

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugApp = function() {
        console.log('🔍 App Debug Information:');
        console.log('🚀 Bootstrap status: completed');
        console.log('🎯 Mounted modules: practice, chart, statistics, notifications');
        console.log('🔄 Global rerender rAF:', rAF !== null ? 'pending' : 'idle');
        console.log('🔐 Auth monitoring: active');
        console.log('🔔 Notifications: active');
        console.log('🏥 API health check: available');
        console.log('💡 Available functions:');
        console.log('  - unmountAllModules()');
        console.log('  - debugAuth(), debugApi(), debugNotifications()');
    };
    
    // 暴露清理函數供開發使用
    window.unmountAllModules = unmountAllModules;
    
    // 暴露健康檢查
    window.checkApiHealth = checkApiHealth;
}