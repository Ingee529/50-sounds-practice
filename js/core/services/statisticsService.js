// Statistics Service - 統計資料存取服務
// 提供統計資料的讀取、快取和錯誤處理

import { getState } from '../state.js';
import { getAuth } from '../selectors.js';
import { apiGet, API_ENDPOINTS } from '../api.js';

// 快取設定
const CACHE_TTL = 5 * 60 * 1000; // 5 分鐘
let cache = {
    statistics: null,
    sessionDetails: new Map(),
    lastFetch: 0
};

// 請求控制器
let statisticsController = null;
let sessionControllers = new Map();

/**
 * 獲取學習統計資料
 * @returns {Promise<Object|null>} 統計資料
 */
export async function fetchStatistics() {
    // 檢查快取
    if (isCacheValid('statistics')) {
        console.log('[statisticsService] Using cached statistics');
        return cache.statistics;
    }
    
    // 檢查認證狀態
    const state = getState();
    const auth = getAuth(state);
    if (!auth.user || !auth.token) {
        console.log('[statisticsService] No authentication, cannot fetch statistics');
        return null;
    }
    
    try {
        console.log('[statisticsService] Fetching statistics from API...');
        
        // 取消之前的請求
        if (statisticsController) {
            statisticsController.abort();
        }
        
        // 創建新的控制器
        statisticsController = new AbortController();
        
        // 使用統一 API
        const response = await apiGet(API_ENDPOINTS.PRACTICE.STATISTICS, {
            signal: statisticsController.signal
        });
        
        // 更新快取
        cache.statistics = response;
        cache.lastFetch = Date.now();
        
        console.log('[statisticsService] Statistics fetched and cached');
        return response;
        
    } catch (error) {
        // 如果是取消錯誤，不需要處理
        if (error.name === 'AbortError') {
            console.log('[statisticsService] Statistics request aborted');
            throw error;
        }
        
        console.error('[statisticsService] Failed to fetch statistics:', error);
        
        // 處理認證錯誤
        if (error.code === 'AUTH' || error.message.includes('401') || error.message.includes('403')) {
            console.log('[statisticsService] Authentication error, emitting event');
            import('../events.js').then(({ emit }) => {
                emit('auth:token.expired', { source: 'statistics' });
            });
            throw Object.assign(new Error('authentication_required'), { code: 'AUTH' });
        }
        
        // 處理網絡錯誤
        if (error.message.includes('network_') || error.name === 'TypeError') {
            console.log('[statisticsService] Network error detected');
            import('../events.js').then(({ emit }) => {
                emit('network:error', { source: 'statistics', error: error.message });
            });
        }
        
        // 如果有舊的快取資料，返回快取（寬鬆模式）
        if (cache.statistics) {
            console.log('[statisticsService] Using stale cache due to error');
            return cache.statistics;
        }
        
        throw error;
    }
}

/**
 * 獲取練習詳情
 * @param {number} sessionId - 練習 ID
 * @returns {Promise<Object|null>} 練習詳情
 */
export async function fetchSessionDetail(sessionId) {
    // 檢查快取
    if (cache.sessionDetails.has(sessionId)) {
        const cached = cache.sessionDetails.get(sessionId);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            console.log(`[statisticsService] Using cached session detail: ${sessionId}`);
            return cached.data;
        }
    }
    
    // 檢查認證狀態
    const state = getState();
    const auth = getAuth(state);
    if (!auth.user || !auth.token) {
        console.log('[statisticsService] No authentication, cannot fetch session detail');
        return null;
    }
    
    try {
        console.log(`[statisticsService] Fetching session detail: ${sessionId}`);
        
        // 取消該會話的之前請求
        if (sessionControllers.has(sessionId)) {
            sessionControllers.get(sessionId).abort();
        }
        
        // 創建新的控制器
        const controller = new AbortController();
        sessionControllers.set(sessionId, controller);
        
        // 使用統一 API
        const response = await apiGet(API_ENDPOINTS.PRACTICE.SESSION_DETAIL(sessionId), {
            signal: controller.signal
        });
        
        // 更新快取
        cache.sessionDetails.set(sessionId, {
            data: response,
            timestamp: Date.now()
        });
        
        // 清理控制器
        sessionControllers.delete(sessionId);
        
        console.log(`[statisticsService] Session detail fetched and cached: ${sessionId}`);
        return response;
        
    } catch (error) {
        // 如果是取消錯誤，不需要處理
        if (error.name === 'AbortError') {
            console.log(`[statisticsService] Session detail request aborted: ${sessionId}`);
            throw error;
        }
        
        console.error(`[statisticsService] Failed to fetch session detail ${sessionId}:`, error);
        
        // 處理認證錯誤
        if (error.code === 'AUTH' || error.message.includes('401') || error.message.includes('403')) {
            console.log('[statisticsService] Authentication error in session detail');
            import('../events.js').then(({ emit }) => {
                emit('auth:token.expired', { source: 'session_detail' });
            });
        }
        
        throw error;
    }
}

/**
 * 檢查快取是否有效
 * @param {string} key - 快取鍵
 * @returns {boolean} 是否有效
 */
function isCacheValid(key) {
    if (key === 'statistics') {
        return cache.statistics && (Date.now() - cache.lastFetch < CACHE_TTL);
    }
    return false;
}

/**
 * 中止所有進行中的請求
 */
export function abortAllRequests() {
    console.log('[statisticsService] Aborting all requests...');
    
    if (statisticsController) {
        statisticsController.abort();
        statisticsController = null;
    }
    
    sessionControllers.forEach((controller, sessionId) => {
        console.log(`[statisticsService] Aborting session request: ${sessionId}`);
        controller.abort();
    });
    sessionControllers.clear();
}

/**
 * 清空快取
 * @param {string|null} key - 要清空的快取鍵，null 表示清空所有
 */
export function clearCache(key = null) {
    if (key === null) {
        console.log('[statisticsService] Clearing all cache');
        abortAllRequests(); // 同時中止所有請求
        cache = {
            statistics: null,
            sessionDetails: new Map(),
            lastFetch: 0
        };
    } else if (key === 'statistics') {
        console.log('[statisticsService] Clearing statistics cache');
        if (statisticsController) {
            statisticsController.abort();
            statisticsController = null;
        }
        cache.statistics = null;
        cache.lastFetch = 0;
    } else if (key === 'sessionDetails') {
        console.log('[statisticsService] Clearing session details cache');
        sessionControllers.forEach((controller, sessionId) => {
            controller.abort();
        });
        sessionControllers.clear();
        cache.sessionDetails.clear();
    }
}

/**
 * 強制刷新統計資料
 * @returns {Promise<Object|null>} 統計資料
 */
export async function refreshStatistics() {
    console.log('[statisticsService] Force refreshing statistics...');
    clearCache('statistics');
    return await fetchStatistics();
}

/**
 * 獲取快取狀態（用於調試）
 * @returns {Object} 快取狀態
 */
export function getCacheStatus() {
    return {
        statistics: {
            cached: !!cache.statistics,
            age: cache.lastFetch ? Date.now() - cache.lastFetch : null,
            valid: isCacheValid('statistics')
        },
        sessionDetails: {
            count: cache.sessionDetails.size,
            keys: Array.from(cache.sessionDetails.keys())
        },
        ttl: CACHE_TTL
    };
}

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugStatisticsService = function() {
        console.log('🔍 Statistics Service Debug:');
        console.log('📊 Cache status:', getCacheStatus());
        console.log('🔑 Auth status:', {
            hasUser: !!window.currentUser,
            hasToken: !!window.authToken
        });
        console.log('💡 Available: fetchStatistics(), clearCache(), refreshStatistics()');
    };
    
    // 暴露函數供調試使用
    window.statisticsService = {
        fetchStatistics,
        fetchSessionDetail,
        clearCache,
        refreshStatistics,
        getCacheStatus,
        abortAllRequests
    };
}