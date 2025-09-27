/**
 * API 配置管理
 * 自動偵測環境並設定正確的 API 基礎 URL
 */

// 環境偵測
function detectEnvironment() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;
    
    // 本地開發環境
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
        return 'development';
    }
    
    // 生產環境
    if (hostname === 'www.japanese50sounds.com' || hostname === 'japanese50sounds.com') {
        return 'production';
    }
    
    // VM 或其他環境
    return 'vm';
}

// API 配置
const API_CONFIGS = {
    development: {
        baseUrl: 'http://localhost:8001',
        timeout: 10000,
        retryAttempts: 3
    },
    production: {
        baseUrl: "https://japanese50sounds.com/api",
        timeout: 30000,
        retryAttempts: 3
    },
    vm: {
        // VM 環境：使用當前主機的URL
        baseUrl: window.location.origin + "/api",
        timeout: 15000,
        retryAttempts: 2
    }
};

// 當前環境配置
const currentEnv = detectEnvironment();
const currentConfig = API_CONFIGS[currentEnv];

// 導出配置
export const API_BASE = currentConfig.baseUrl;
export const API_TIMEOUT = currentConfig.timeout;
export const API_RETRY_ATTEMPTS = currentConfig.retryAttempts;
export const CURRENT_ENV = currentEnv;

// 調試信息
console.log(`🌐 [API Config] Environment: ${currentEnv}`);
console.log(`🌐 [API Config] Base URL: ${API_BASE}`);
console.log("🔧 [DEBUG] Constructed API URL for statistics:", API_BASE + "/practice/statistics/");
console.log(`🌐 [API Config] Timeout: ${API_TIMEOUT}ms`);

// 驗證 API 連接
export async function validateApiConnection() {
    try {
        const healthUrl = API_BASE ? `${API_BASE}/` : '/api/';
        const response = await fetch(healthUrl, {
            method: 'GET',
            timeout: 5000
        });
        
        if (response.ok) {
            console.log('✅ [API Config] API 連接正常');
            return true;
        } else {
            console.warn(`⚠️ [API Config] API 回應異常: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error('❌ [API Config] API 連接失敗:', error.message);
        return false;
    }
}

// 動態更新 API 基礎 URL（用於運行時切換）
export function updateApiBase(newBaseUrl) {
    if (typeof newBaseUrl === 'string' && newBaseUrl.trim()) {
        currentConfig.baseUrl = newBaseUrl.trim();
        console.log(`🔄 [API Config] API Base URL 已更新為: ${currentConfig.baseUrl}`);
console.log("🔧 [DEBUG] Constructed API URL for statistics:", API_BASE + "/practice/statistics/");
        return true;
    }
    return false;
}

// 獲取當前 API 配置
export function getApiConfig() {
    return {
        baseUrl: API_BASE,
        timeout: API_TIMEOUT,
        retryAttempts: API_RETRY_ATTEMPTS,
        environment: CURRENT_ENV
    };
}
// Cache buster - Tue Sep 23 16:26:01 CDT 2025
