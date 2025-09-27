// State Selectors - 狀態讀取抽象層
// 分離「純取值」和「含業務邏輯」的選擇器

// ==========================================
// 純取值選擇器（零邏輯）
// ==========================================

export const getLang = (state) => state.app.lang;
export const getAppReady = (state) => state.app.ready;

export const getUserId = (state) => state.user.id;
export const getUserEmail = (state) => state.user.email;
export const getUserDisplayName = (state) => state.user.displayName;

// 三態認證檢查
export const getAuth = (state) => state.auth || { inited: false, user: null, token: null };
export const isLoggedIn = (state) => {
    const auth = getAuth(state);
    return !!(auth.user && (auth.user.id || auth.user.email || auth.user.sub));
};

export const getCurrentTab = (state) => state.ui.currentTab;

export const getPracticeMode = (state) => state.practice.mode;
export const getKanaType = (state) => state.practice.kanaType;
export const getQuestionCount = (state) => state.practice.count;
export const getSelectionRows = (state) => state.practice.selection.rows;
export const getSelectionRanges = (state) => state.practice.selection.ranges;

// 已廢棄：Chart 現在統一使用 practice.kanaType
// export const getChartDisplayType = (state) => state.chart.displayType;

// ==========================================
// 規則型選擇器（含業務邏輯，可單測）
// ==========================================

const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);

/**
 * 獲取快速練習範圍的翻譯鍵
 * @param {Object} state - 應用狀態
 * @returns {Object} 翻譯鍵對象
 */
export function getQuickRangeKeys(state) {
    const kanaType = state.practice.kanaType; // 'hiragana' | 'katakana' | 'mixed'
    
    return {
        basic: `practice.quickBasic${cap(kanaType)}`,
        dakuten: `practice.quickDakuten${cap(kanaType)}`,
        handakuten: `practice.quickHandakuten${cap(kanaType)}`,
        youon: `practice.quickYouon${cap(kanaType)}`
    };
}

/**
 * 獲取假名類型顯示標籤的翻譯鍵
 * @param {Object} state - 應用狀態
 * @returns {Object} 翻譯鍵對象
 */
export function getKanaTypeLabels(state) {
    return {
        hiragana: 'chart.hiragana',
        katakana: 'chart.katakana',
        mixed: 'kana.types.mixed'
    };
}

/**
 * 獲取當前假名類型的顯示標籤翻譯鍵
 * @param {Object} state - 應用狀態
 * @returns {string} 翻譯鍵
 */
export function getCurrentKanaTypeLabel(state) {
    const kanaType = state.practice.kanaType;
    const labels = getKanaTypeLabels(state);
    return labels[kanaType] || labels.hiragana;
}

/**
 * 獲取練習配置摘要
 * @param {Object} state - 應用狀態
 * @returns {Object} 練習配置摘要
 */
export function getPracticeSummary(state) {
    const practice = state.practice;
    
    return {
        mode: practice.mode,
        kanaType: practice.kanaType,
        count: practice.count,
        hasSelection: practice.selection.rows.length > 0 || practice.selection.ranges.length > 0,
        selectionCount: practice.selection.rows.length + practice.selection.ranges.length
    };
}

/**
 * 檢查是否有有效的練習選項
 * @param {Object} state - 應用狀態
 * @returns {boolean} 是否可以開始練習
 */
export function canStartPractice(state) {
    const practice = state.practice;
    
    if (practice.mode === 'quick') {
        return practice.count > 0;
    }
    
    if (practice.mode === 'custom') {
        return practice.selection.rows.length > 0 || practice.selection.ranges.length > 0;
    }
    
    return false;
}

/**
 * 獲取用戶顯示信息
 * @param {Object} state - 應用狀態
 * @returns {Object} 用戶顯示信息
 */
export function getUserDisplayInfo(state) {
    const user = state.user;
    
    return {
        isLoggedIn: user.loggedIn,
        displayName: user.displayName || user.email || 'Guest',
        email: user.email,
        avatar: user.displayName ? user.displayName.charAt(0).toUpperCase() : 'G'
    };
}

// ==========================================
// 開發工具
// ==========================================

if (typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    window.debugSelectors = function() {
        console.log('🔍 Selectors Debug Information:');
        console.log('📊 Available selectors:');
        console.log('  Pure getters: getLang, getKanaType, getQuestionCount, etc.');
        console.log('  Business logic: getQuickRangeKeys, canStartPractice, etc.');
        console.log('💡 Usage: import { getLang } from \'./js/core/selectors.js\'');
    };
}