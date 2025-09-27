// 通知系統 - 處理各種用戶提示
import { on } from './events.js';
import { t } from '../i18n/i18n.js';

// 通知容器
let notificationContainer = null;

/**
 * 初始化通知系統
 */
export function initNotifications() {
    // 創建通知容器
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // 添加樣式
        addNotificationStyles();
    }
    
    // 監聽認證事件
    on('auth:token.expired', handleTokenExpired);
    on('auth:token.refreshed', handleTokenRefreshed);
    on('auth:refresh.failed', handleRefreshFailed);
    on('network:error', handleNetworkError);
    
    console.log('[notifications] Notification system initialized');
}

/**
 * 添加通知樣式
 */
function addNotificationStyles() {
    const styleId = 'notification-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        }
        
        .notification {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin-bottom: 10px;
            padding: 16px;
            border-left: 4px solid #007bff;
            animation: slideIn 0.3s ease-out;
            position: relative;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .notification.error {
            border-left-color: #dc3545;
            background: #f8f9fa;
        }
        
        .notification.success {
            border-left-color: #28a745;
        }
        
        .notification.warning {
            border-left-color: #ffc107;
        }
        
        .notification-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: #212529;
        }
        
        .notification-message {
            color: #6c757d;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification-actions {
            margin-top: 12px;
            display: flex;
            gap: 8px;
        }
        
        .notification-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .notification-btn:hover {
            background: #0056b3;
        }
        
        .notification-btn.secondary {
            background: #6c757d;
        }
        
        .notification-btn.secondary:hover {
            background: #5a6268;
        }
        
        .notification-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 18px;
            color: #adb5bd;
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #495057;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification.removing {
            animation: slideOut 0.3s ease-in forwards;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 顯示通知
 */
export function showNotification({ title, message, type = 'info', actions = [], duration = 5000 }) {
    if (!notificationContainer) {
        console.warn('[notifications] Container not initialized');
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <button class="notification-close" aria-label="關閉通知">&times;</button>
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        ${actions.length > 0 ? `
            <div class="notification-actions">
                ${actions.map((action, index) => `
                    <button class="notification-btn ${action.type || ''}" data-action="${index}">
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    // 綁定關閉事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    // 綁定動作按鈕事件
    actions.forEach((action, index) => {
        const btn = notification.querySelector(`[data-action="${index}"]`);
        if (btn && action.handler) {
            btn.addEventListener('click', () => {
                action.handler();
                if (action.closeAfter !== false) {
                    removeNotification(notification);
                }
            });
        }
    });
    
    notificationContainer.appendChild(notification);
    
    // 自動移除
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
    
    return notification;
}

/**
 * 移除通知
 */
function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

/**
 * Token 過期處理
 */
function handleTokenExpired({ detail }) {
    const source = detail?.source || 'unknown';
    console.log(`[notifications] Token expired from: ${source}`);
    
    showNotification({
        title: t('notifications.tokenExpired.title') || '登入已過期',
        message: t('notifications.tokenExpired.message') || '您的登入狀態已過期，請重新登入以繼續使用。',
        type: 'warning',
        duration: 0, // 不自動關閉
        actions: [
            {
                label: t('auth.login') || '重新登入',
                handler: () => {
                    // 導向登入頁面
                    if (typeof window.showLoginModal === 'function') {
                        window.showLoginModal();
                    } else {
                        window.location.reload();
                    }
                }
            },
            {
                label: t('common.refresh') || '刷新頁面',
                type: 'secondary',
                handler: () => {
                    window.location.reload();
                }
            }
        ]
    });
}

/**
 * Token 刷新成功處理
 */
function handleTokenRefreshed() {
    showNotification({
        title: t('notifications.tokenRefreshed.title') || '登入已更新',
        message: t('notifications.tokenRefreshed.message') || '您的登入狀態已自動更新。',
        type: 'success',
        duration: 3000
    });
}

/**
 * Token 刷新失敗處理
 */
function handleRefreshFailed({ detail }) {
    const error = detail?.error;
    console.log('[notifications] Token refresh failed:', error);
    
    showNotification({
        title: t('notifications.refreshFailed.title') || '登入更新失敗',
        message: t('notifications.refreshFailed.message') || '無法自動更新登入狀態，請重新登入。',
        type: 'error',
        duration: 0,
        actions: [
            {
                label: t('auth.login') || '重新登入',
                handler: () => {
                    if (typeof window.showLoginModal === 'function') {
                        window.showLoginModal();
                    } else {
                        window.location.reload();
                    }
                }
            }
        ]
    });
}

/**
 * 網路錯誤處理
 */
function handleNetworkError({ detail }) {
    const source = detail?.source || 'unknown';
    const error = detail?.error || '';
    
    console.log(`[notifications] Network error from ${source}:`, error);
    
    showNotification({
        title: t('notifications.networkError.title') || '網路錯誤',
        message: t('notifications.networkError.message') || '網路連接出現問題，請檢查網路連接並稍後再試。',
        type: 'error',
        duration: 8000,
        actions: [
            {
                label: t('common.retry') || '重試',
                handler: () => {
                    window.location.reload();
                }
            }
        ]
    });
}

// 開發工具
if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugNotifications = function() {
        console.log('🔔 Notifications Debug:');
        console.log('Container:', notificationContainer);
        console.log('Available: showNotification()');
        
        // 測試通知
        showNotification({
            title: '測試通知',
            message: '這是一個測試通知，用於驗證系統是否正常工作。',
            type: 'info',
            actions: [
                {
                    label: '確定',
                    handler: () => console.log('測試按鈕被點擊')
                }
            ]
        });
    };
    
    window.showTestNotification = showNotification;
}