// API 統一管理模組
import { API_BASE, API_TIMEOUT, API_RETRY_ATTEMPTS, validateApiConnection } from './api-config.js';
import { getState } from './state.js';
import { getAuth } from './selectors.js';
import { emit } from './events.js';

/**
 * API 端點配置
 * 確保所有端點都有正確的末尾斜線
 */
export const API_ENDPOINTS = {
    // 認證相關
    AUTH: {
        LOGIN: `${API_BASE}/auth/login/`,
        LOGOUT: `${API_BASE}/auth/logout/`,
        REFRESH: `${API_BASE}/auth/refresh/`,
        REGISTER: `${API_BASE}/auth/register/`,
        PROFILE: `${API_BASE}/auth/profile/`,
    },
    
    // 練習相關
    PRACTICE: {
        STATISTICS: `${API_BASE}/practice/statistics/`,
        SESSIONS: `${API_BASE}/practice/sessions/`,
        SESSION_DETAIL: (id) => `${API_BASE}/practice/sessions/${id}/`,
        START_SESSION: `${API_BASE}/practice/sessions/start/`,
        SUBMIT_ANSWER: (sessionId) => `${API_BASE}/practice/sessions/${sessionId}/answer/`,
        COMPLETE_SESSION: (sessionId) => `${API_BASE}/practice/sessions/${sessionId}/complete/`,
    },
    
    // 其他端點可以在這裡添加
    USER: {
        PREFERENCES: `${API_BASE}/user/preferences/`,
    }
};

/**
 * 統一的 fetch 封裝
 * 自動處理認證、錯誤和重試邏輯
 */
export async function apiFetch(url, options = {}) {
    const {
        method = 'GET',
        body = null,
        headers = {},
        skipAuth = false,
        retryOnAuth = true,
        timeout = API_TIMEOUT,
        retryAttempts = API_RETRY_ATTEMPTS,
        ...fetchOptions
    } = options;
    
    // 創建 AbortController 用於超時控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        // 準備請求頭
        const requestHeaders = {
            'Content-Type': 'application/json',
            ...headers
        };
        
        // 添加認證頭
        if (!skipAuth) {
            const state = getState();
            const auth = getAuth(state);
            
            if (auth.token) {
                requestHeaders['Authorization'] = `Bearer ${auth.token}`;
            }
        }
        
        // 發送請求
        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : null,
            credentials: 'include', // 始終包含 cookies
            signal: controller.signal,
            ...fetchOptions
        });
        
        clearTimeout(timeoutId);
        
        // 處理特定狀態碼
        if (response.status === 401 || response.status === 403) {
            console.log(`[api] Authentication error: ${response.status}`);
            
            // 發出認證錯誤事件
            emit('auth:token.expired', { 
                source: 'api_fetch',
                url,
                status: response.status 
            });
            
            const error = new Error(`Authentication failed: ${response.status}`);
            error.code = 'AUTH';
            error.status = response.status;
            throw error;
        }
        
        if (response.status === 404) {
            const error = new Error('Resource not found');
            error.code = 'NOT_FOUND';
            error.status = 404;
            throw error;
        }
        
        if (response.status >= 500) {
            const error = new Error(`Server error: ${response.status}`);
            error.code = 'SERVER_ERROR';
            error.status = response.status;
            throw error;
        }
        
        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            error.code = 'HTTP_ERROR';
            error.status = response.status;
            throw error;
        }
        
        // 解析響應
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        // 處理中止錯誤
        if (error.name === 'AbortError') {
            const timeoutError = new Error(`Request timeout: ${url}`);
            timeoutError.code = 'TIMEOUT';
            throw timeoutError;
        }
        
        // 處理網路錯誤
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.log(`[api] Network error: ${error.message}`);
            emit('network:error', { 
                source: 'api_fetch', 
                url, 
                error: error.message 
            });
            
            const networkError = new Error(`Network error: ${error.message}`);
            networkError.code = 'NETWORK';
            throw networkError;
        }
        
        // 重新拋出其他錯誤
        throw error;
    }
}

/**
 * GET 請求封裝
 */
export function apiGet(url, options = {}) {
    return apiFetch(url, { ...options, method: 'GET' });
}

/**
 * POST 請求封裝
 */
export function apiPost(url, data = null, options = {}) {
    return apiFetch(url, { ...options, method: 'POST', body: data });
}

/**
 * PUT 請求封裝
 */
export function apiPut(url, data = null, options = {}) {
    return apiFetch(url, { ...options, method: 'PUT', body: data });
}

/**
 * DELETE 請求封裝
 */
export function apiDelete(url, options = {}) {
    return apiFetch(url, { ...options, method: 'DELETE' });
}

/**
 * PATCH 請求封裝
 */
export function apiPatch(url, data = null, options = {}) {
    return apiFetch(url, { ...options, method: 'PATCH', body: data });
}

/**
 * 檢查 API 端點是否可用
 */
export async function checkApiHealth() {
    try {
        const response = await apiFetch(`${API_BASE}/api/`, {
            skipAuth: true,
            timeout: 5000
        });
        return { status: 'ok', data: response };
    } catch (error) {
        return { 
            status: 'error', 
            error: error.message, 
            code: error.code 
        };
    }
}

/**
 * 批量請求工具
 */
export async function apiBatch(requests) {
    const promises = requests.map(async (request) => {
        try {
            const result = await apiFetch(request.url, request.options);
            return { success: true, data: result, id: request.id };
        } catch (error) {
            return { success: false, error, id: request.id };
        }
    });
    
    return await Promise.all(promises);
}

// 開發工具
if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugApi = function() {
        console.log('🔌 API Debug:');
        console.log('📍 Endpoints:', API_ENDPOINTS);
        console.log('⚡ Base URL:', API_BASE);
        console.log('💡 Available functions:');
        console.log('  - apiFetch(url, options)');
        console.log('  - apiGet/Post/Put/Delete/Patch');
        console.log('  - checkApiHealth()');
        console.log('  - apiBatch(requests)');
    };
    
    // 暴露 API 函數供調試使用
    window.api = {
        fetch: apiFetch,
        get: apiGet,
        post: apiPost,
        put: apiPut,
        delete: apiDelete,
        patch: apiPatch,
        endpoints: API_ENDPOINTS,
        checkHealth: checkApiHealth,
        batch: apiBatch
    };
}