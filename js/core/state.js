// 狀態管理系統 - Centralized State Management
// 採用領域切片的細粒度結構，支持持久化和事件驅動

import { emit } from './events.js';

const VERSION = 1;
const LS_KEY = `app_state_v${VERSION}`;

// 預設狀態結構
const defaultState = {
  app: {
    version: VERSION,
    lang: 'zh',
    ready: false
  },
  auth: {
    inited: false,
    user: null,
    token: null
  },
  user: {
    id: null,
    email: null,
    displayName: null,
    loggedIn: false
  },
  ui: {
    currentTab: 'practice'  // practice | chart | statistics | auth
  },
  practice: {
    mode: 'quick',          // quick | custom
    kanaType: 'hiragana',   // hiragana | katakana | mixed
    count: 15,              // 題數
    selection: {
      rows: [],             // 選中的行
      ranges: []            // 選中的範圍
    }
  },
  chart: {
    displayType: 'hiragana' // hiragana | katakana
  },
  leaderboard: {
    top: [],
    aroundMe: [],
    season: 's1',
    lastFetchAt: 0,
    loading: false,
    error: null
  }
};

// 從 localStorage 載入狀態
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return structuredClone(defaultState);
    
    const parsed = JSON.parse(raw);
    
    // 版本檢查和遷移
    if (parsed.app?.version !== VERSION) {
      console.log(`[state] Migrating state from version ${parsed.app?.version} to ${VERSION}`);
      return migrateState(parsed);
    }
    
    // 合併預設值，確保新加的欄位有預設值
    return mergeWithDefaults(parsed, defaultState);
  } catch (error) {
    console.warn('[state] Failed to load state from localStorage:', error);
    return structuredClone(defaultState);
  }
}

// 狀態版本遷移
function migrateState(oldState) {
  // 目前只有 v1，未來版本可在此加遷移邏輯
  const migrated = mergeWithDefaults(oldState, defaultState);
  migrated.app.version = VERSION;
  return migrated;
}

// 合併預設值
function mergeWithDefaults(source, defaults) {
  const result = {};
  
  for (const [key, defaultValue] of Object.entries(defaults)) {
    if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
      result[key] = mergeWithDefaults(source[key] || {}, defaultValue);
    } else {
      result[key] = source[key] !== undefined ? source[key] : defaultValue;
    }
  }
  
  return result;
}

// 當前狀態
let state = loadState();

// 延遲保存計時器
let saveTimer = null;

// 保存狀態到 localStorage（防抖）
function saveLazy() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
      if (isDev()) {
        console.log('[state] State saved to localStorage');
      }
    } catch (error) {
      console.warn('[state] Failed to save state to localStorage:', error);
    }
  }, 150);
}

// 開發模式檢查
function isDev() {
  return typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.search.includes('debug=1'));
}

/**
 * 獲取完整狀態快照（只讀）
 * @returns {Object} - 狀態快照
 */
export function getState() {
  return structuredClone(state);
}

/**
 * 獲取指定切片的狀態
 * @param {string} slice - 切片名稱 (app|user|ui|practice|chart)
 * @returns {*} - 切片狀態
 */
export function getSlice(slice) {
  if (!state[slice]) {
    console.warn(`[state] Unknown slice: ${slice}`);
    return null;
  }
  return structuredClone(state[slice]);
}

/**
 * 批量更新多個切片
 * @param {Object} slices - 要更新的切片 { app: {...}, user: {...} }
 */
export function patch(slices) {
  const prevState = getState();
  
  // 更新狀態
  for (const [slice, updates] of Object.entries(slices)) {
    if (state[slice]) {
      state[slice] = { ...state[slice], ...updates };
    } else {
      console.warn(`[state] Cannot patch unknown slice: ${slice}`);
    }
  }
  
  saveLazy();
  emit('state:changed', { prev: prevState, current: getState() });
  
  if (isDev()) {
    console.log('[state] Patched slices:', Object.keys(slices));
  }
}

/**
 * 使用函數更新整個狀態
 * @param {Function} updater - 更新函數 (prevState) => newState
 */
export function update(updater) {
  const prevState = getState();
  const nextState = updater(prevState);
  
  state = nextState;
  saveLazy();
  emit('state:changed', { prev: prevState, current: getState() });
  
  if (isDev()) {
    console.log('[state] Updated via function');
  }
}

// ===========================================
// 語法糖函數 - 針對常用切片操作
// ===========================================

/**
 * 設置語言
 * @param {string} lng - 語言代碼 (zh|en)
 */
export function setLang(lng) {
  if (state.app.lang === lng) return;
  
  const prevLang = state.app.lang;
  state.app.lang = lng;
  saveLazy();
  
  emit('i18n:changed', { from: prevLang, to: lng });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log(`[state] Language changed: ${prevLang} → ${lng}`);
  }
}

/**
 * 設置假名類型
 * @param {string} type - 假名類型 (hiragana|katakana|mixed)
 */
export function setKanaType(type) {
  if (state.practice.kanaType === type) return;
  
  const prevType = state.practice.kanaType;
  state.practice.kanaType = type;
  saveLazy();
  
  emit('practice:kana.changed', { from: prevType, to: type });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log(`[state] Kana type changed: ${prevType} → ${type}`);
  }
}

/**
 * 設置練習配置
 * @param {Object} partial - 部分練習配置
 */
export function setPracticeConfig(partial) {
  const prevConfig = { ...state.practice };
  state.practice = { ...state.practice, ...partial };
  saveLazy();
  
  emit('practice:config.changed', { prev: prevConfig, current: { ...state.practice } });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log('[state] Practice config updated:', partial);
  }
}

/**
 * 設置練習選項
 * @param {Object} selection - 選項 { rows: [], ranges: [] }
 */
export function setSelection(selection) {
  const prevSelection = { ...state.practice.selection };
  
  state.practice.selection = {
    rows: Array.isArray(selection.rows) ? [...selection.rows] : [...(selection.rows || [])],
    ranges: Array.isArray(selection.ranges) ? [...selection.ranges] : [...(selection.ranges || [])]
  };
  
  saveLazy();
  
  emit('practice:selection.changed', {
    prev: prevSelection,
    current: structuredClone(state.practice.selection)
  });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log('[state] Selection updated:', state.practice.selection);
  }
}

/**
 * 設置圖表顯示類型
 * @deprecated 已廢棄：Chart 現在統一使用 practice.kanaType，請改用 setKanaType()
 * @param {string} type - 顯示類型 (hiragana|katakana)
 */
export function setChartType(type) {
  console.warn('[DEPRECATED] setChartType is deprecated. Use setKanaType instead.');
  // 轉發到 setKanaType 保持兼容性
  setKanaType(type);
}

/**
 * 設置當前標籤頁
 * @param {string} tab - 標籤頁 (practice|chart|statistics|auth)
 */
export function setCurrentTab(tab) {
  if (state.ui.currentTab === tab) return;
  
  const prevTab = state.ui.currentTab;
  state.ui.currentTab = tab;
  saveLazy();
  
  emit('ui:tab.changed', { from: prevTab, to: tab });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log(`[state] Tab changed: ${prevTab} → ${tab}`);
  }
}

/**
 * 設置用戶資訊
 * @param {Object} userInfo - 用戶資訊
 */
export function setUser(userInfo) {
  const prevUser = { ...state.user };
  state.user = { ...state.user, ...userInfo };
  saveLazy();
  
  emit('auth:user.changed', { previous: { user: prevUser }, current: { user: { ...state.user } } });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log('[state] User info updated:', userInfo);
  }
}

/**
 * 設置應用就緒狀態
 * @param {boolean} ready - 是否就緒
 */
export function setAppReady(ready = true) {
  if (state.app.ready === ready) return;
  
  state.app.ready = ready;
  saveLazy();
  
  if (ready) {
    emit('app:ready', getState());
  }
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log(`[state] App ready: ${ready}`);
  }
}

/**
 * 設置排行榜資料
 * @param {Object} partial - 部分排行榜資料
 */
export function setLeaderboard(partial) {
  const prevLeaderboard = { ...state.leaderboard };
  state.leaderboard = { ...state.leaderboard, ...partial };
  saveLazy();
  
  emit('leaderboard:changed', { 
    prev: prevLeaderboard, 
    current: { ...state.leaderboard } 
  });
  emit('state:changed', getState());
  
  if (isDev()) {
    console.log('[state] Leaderboard updated:', partial);
  }
}

// ===========================================
// 調試工具
// ===========================================

if (typeof window !== 'undefined') {
  window.debugState = function() {
    console.log('🔍 State Debug Information:');
    console.log('📊 Current state:', getState());
    console.log('🗃️ localStorage key:', LS_KEY);
    console.log('📝 State slices:', Object.keys(state));
    
    // 檢查持久化
    try {
      const saved = localStorage.getItem(LS_KEY);
      console.log('💾 Persisted state size:', saved ? (saved.length / 1024).toFixed(2) + 'KB' : '0KB');
    } catch {
      console.log('💾 Persisted state: not accessible');
    }
    
    console.log('💡 Usage:');
    console.log('  - getState() / getSlice("app")');
    console.log('  - setLang("en") / setKanaType("katakana")');
    console.log('  - patch({ app: { ready: true } })');
    console.log('  - debugState() to see this info again');
  };
  
  // 將 setSelection 函數暴露到全局範圍，供 HTML 中的函數使用
  window.setSelection = setSelection;
}