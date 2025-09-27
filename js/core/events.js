// 事件總線系統 - Event Bus Architecture
// 用於解耦組件間通信，採用 domain:event 命名策略
//
// 重要：此事件系統直接傳遞 payload 參數，不使用 DOM 事件的 detail 屬性
// 事件處理器應該直接使用傳入的參數，例如：
// on('auth:user.changed', (data) => { const { previous, current } = data; })

const bus = new Map();

// 開發模式事件日誌
const isDevMode = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.search.includes('debug=1'));

function log(type, action, payload) {
  if (!isDevMode) return;
  const timestamp = new Date().toISOString().slice(11, 23);
  console.log(`[events] ${timestamp} ${type} ${action}`, payload);
}

/**
 * 註冊事件監聽器
 * @param {string} type - 事件類型 (格式: domain:event，如 i18n:changed)
 * @param {Function} fn - 處理函數
 * @returns {Function} - 取消註冊函數
 */
export function on(type, fn) {
  if (typeof type !== 'string' || typeof fn !== 'function') {
    console.warn('[events] Invalid parameters for on()', { type, fn });
    return () => {};
  }

  const set = bus.get(type) ?? (bus.set(type, new Set()), bus.get(type));
  set.add(fn);
  
  log(type, 'LISTEN', null);
  
  // 返回取消註冊函數
  return () => {
    set.delete(fn);
    log(type, 'UNLISTEN', null);
  };
}

/**
 * 觸發事件
 * @param {string} type - 事件類型
 * @param {*} payload - 事件數據
 */
export function emit(type, payload) {
  if (typeof type !== 'string') {
    console.warn('[events] Invalid event type for emit()', type);
    return;
  }

  const listeners = bus.get(type);
  if (!listeners || listeners.size === 0) {
    if (isDevMode && !type.includes('state:')) {
      log(type, 'EMIT (no listeners)', payload);
    }
    return;
  }

  log(type, 'EMIT', payload);

  // 執行所有監聽器，錯誤隔離
  for (const fn of listeners) {
    try {
      fn(payload);
    } catch (error) {
      console.error(`[events] Error in listener for ${type}:`, error);
    }
  }
}

/**
 * 一次性事件監聽器
 * @param {string} type - 事件類型
 * @param {Function} fn - 處理函數
 * @returns {Function} - 取消註冊函數
 */
export function once(type, fn) {
  const off = on(type, (payload) => {
    off();
    fn(payload);
  });
  return off;
}

/**
 * 移除所有指定類型的監聽器
 * @param {string} type - 事件類型
 */
export function off(type) {
  if (bus.has(type)) {
    bus.delete(type);
    log(type, 'CLEAR', null);
  }
}

/**
 * 移除所有監聽器（主要用於測試和清理）
 */
export function clear() {
  bus.clear();
  if (isDevMode) {
    console.log('[events] All listeners cleared');
  }
}

/**
 * 獲取所有已註冊的事件類型（調試用）
 * @returns {Array<string>}
 */
export function getEventTypes() {
  return Array.from(bus.keys());
}

/**
 * 獲取指定事件類型的監聽器數量（調試用）
 * @param {string} type - 事件類型
 * @returns {number}
 */
export function getListenerCount(type) {
  const listeners = bus.get(type);
  return listeners ? listeners.size : 0;
}

// 全域調試工具
if (typeof window !== 'undefined') {
  window.debugEvents = function() {
    console.log('🔍 Event Bus Debug Information:');
    console.log('📊 Total event types:', bus.size);
    
    if (bus.size > 0) {
      console.log('📝 Registered events:');
      for (const [type, listeners] of bus) {
        console.log(`  - ${type}: ${listeners.size} listener(s)`);
      }
    } else {
      console.log('📝 No events registered');
    }
    
    console.log('💡 Usage:');
    console.log('  - on("domain:event", handler)');
    console.log('  - emit("domain:event", payload)');
    console.log('  - once("domain:event", handler)');
    console.log('  - debugEvents() to see this info again');
  };
}