// i18next 配置和翻譯管理
// 重構後：翻譯資源已抽離至 translations.js
// Step 2: 整合 state 和 events 系統

import { emit, on } from '../core/events.js';
import { setLang, getSlice } from '../core/state.js';

// 驗證翻譯資源是否載入
function waitForTranslations() {
    return new Promise((resolve) => {
        if (window.translations) {
            resolve();
            return;
        }
        
        // 等待 translations.js 載入
        const checkInterval = setInterval(() => {
            if (window.translations) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 10);
        
        // 5秒超時
        setTimeout(() => {
            clearInterval(checkInterval);
            console.error('❌ translations.js 載入超時！請確認 HTML 中的引用順序');
            resolve(); // 即使失敗也繼續執行
        }, 5000);
    });
}

// 獲取初始語言設定（從 state 讀取，向後相容）
function getInitialLang() {
    // 優先從 state 讀取
    const stateSlice = getSlice('app');
    if (stateSlice && stateSlice.lang) {
        return stateSlice.lang;
    }
    
    // 向後相容：從 localStorage 讀取
    const saved = localStorage.getItem('language');
    if (saved) {
        // 同步到 state
        setLang(saved);
        return saved;
    }
    
    // 預設語言
    const fallback = 'zh';
    setLang(fallback);
    return fallback;
}

// i18next 初始化
let inited = false;
async function initI18n(lang = 'zh') {
    if (inited) return i18next.language;
    inited = true;
    
    // 等待 translations.js 載入
    await waitForTranslations();
    
    const defaultLang = lang || getInitialLang();
    
    await i18next.init({
        lng: defaultLang,
        fallbackLng: 'zh',
        resources: {
            zh: { translation: window.translations?.zh || {} },
            en: { translation: window.translations?.en || {} }
        },
        interpolation: {
            escapeValue: false
        }
    });
    
    // 保存語言設定
    localStorage.setItem('language', i18next.language);
    
    // 同步設置HTML lang屬性（確保初始化時語系一致）
    document.documentElement.lang = i18next.language === 'zh' ? 'zh-TW' : 'en';
    console.log('🌐 [i18n] HTML lang initialized:', document.documentElement.lang);
    
    // 發送初始化完成事件
    emit('i18n:changed', i18next.language);
    console.log('🌐 [i18n] Initialization completed, event emitted');
    
    return i18next.language;
}

// 翻譯輔助函數
function t(key, options = {}) {
    return i18next.t(key, options);
}

// 將翻譯函數暴露到全局作用域
window.t = t;

// 調試函數 - 檢查語言切換狀態
window.debugLanguageSwitch = function() {
    console.log('🔍 Language Switch Debug Information:');
    console.log('🌐 Current i18next language:', i18next.language);
    console.log('🌐 HTML lang attribute:', document.documentElement.lang);
    console.log('💾 localStorage language:', localStorage.getItem('language'));
    console.log('💾 localStorage preferredLanguage:', localStorage.getItem('preferredLanguage'));
    console.log('🔧 updateGoogleButtonsLanguage available:', typeof updateGoogleButtonsLanguage === 'function');
    
    // 測試翻譯
    console.log('📝 Sample translations:');
    console.log('  - nav.practice:', t('nav.practice'));
    console.log('  - chart.hiragana:', t('chart.hiragana'));
    console.log('  - app.loginRegister:', t('app.loginRegister'));
    
    console.log('💡 Run debugLanguageSwitch() to see this info again');
    console.log('💡 Run changeLanguage("en") or changeLanguage("zh") to switch language');
};

// 類型翻譯（兼容現有代碼）
function translateType(type) {
    // 先嘗試在 kana.categories 中查找
    if (i18next.exists(`kana.categories.${type}`)) {
        return t(`kana.categories.${type}`);
    }
    // 再嘗試在 kana.groups 中查找
    if (i18next.exists(`kana.groups.${type}`)) {
        return t(`kana.groups.${type}`);
    }
    // 嘗試在 kana.types 中查找
    if (i18next.exists(`kana.types.${type}`)) {
        return t(`kana.types.${type}`);
    }
    // 最後返回原值
    return type;
}

// 語言切換 - 整合到新架構但保持向後相容
async function changeLanguage(lng) {
    try {
        console.log('🌐 Starting language change to:', lng);
        
        // 發出切換請求事件
        emit('i18n:change.request', lng);
        
        // 執行 i18next 切換
        await i18next.changeLanguage(lng);
        
        // 更新狀態（會自動觸發 i18n:changed 事件）
        setLang(lng);
        
        // 向後相容：也更新 localStorage
        localStorage.setItem('language', lng);
        localStorage.setItem('preferredLanguage', lng);
        
        // 更新HTML lang屬性，讓Google按鈕使用正確語言
        const htmlLang = lng === 'zh' ? 'zh-TW' : 'en';
        document.documentElement.lang = htmlLang;
        console.log('📝 HTML lang updated to:', htmlLang);
        
        // 發出翻譯更新事件，讓各模組自行更新
        emit('i18n:changed', lng);
        
        // 同步所有語言選擇器（如果同步函數存在）
        if (window.syncAllLanguageSelectors) {
            window.syncAllLanguageSelectors();
        }
        
        emit('ui:rerender'); // 通用重繪事件
        
        console.log(`✅ Language switched to: ${lng}`);
    } catch (error) {
        console.error('❌ Language switch failed:', error);
        emit('i18n:change.failed', { language: lng, error });
    }
}

// 獲取當前語言
function getCurrentLanguage() {
    return i18next.language || 'zh';
}

// ID 相容層輔助函數
function getElementByIdCompat(primaryId, fallbackId) {
    return document.getElementById(primaryId) || document.getElementById(fallbackId);
}

// 統一的設置文字函數（避免變數未定義問題）
function setText(id, translationKey, options = {}) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = t(translationKey, options);
    }
}

// 更新所有文字（兼容舊版，現在只發事件）
function updateAllTexts() {
    emit('i18n:changed', i18next.language);
    return; // 早退出，避免執行舊的 UI 更新邏輯
    
    // 以下為舊邏輯，保留備用但不執行
    try {
        // 更新應用標題
        setText('app-title', 'app.title');
        setText('title', 'app.title');
        setText('auth-title', 'app.title');
        
        // 更新用戶狀態
        setText('guest-mode-title', 'app.guestMode');
        setText('guest-warning-text', 'app.guestWarning');
        setText('login-signup-btn', 'app.loginRegister');
        setText('logout-btn', 'app.logout');
        
        // 更新導航標籤
        setText('nav-practice', 'nav.practice');
        setText('nav-chart', 'nav.chart');
        setText('nav-statistics', 'nav.statistics');
        
        // 更新認證表單 placeholder
        const loginAccount = document.getElementById('login-account');
        const loginPassword = document.getElementById('login-password');
        const registerUsername = document.getElementById('register-username');
        const registerEmail = document.getElementById('register-email');
        const registerDisplayName = document.getElementById('register-display-name');
        const registerPassword = document.getElementById('register-password');
        const confirmPassword = document.getElementById('confirm-password');
        
        if (loginAccount) loginAccount.placeholder = t('auth.loginAccount');
        if (loginPassword) loginPassword.placeholder = t('auth.password');
        if (registerUsername) registerUsername.placeholder = t('auth.username');
        if (registerEmail) registerEmail.placeholder = t('auth.email');
        if (registerDisplayName) registerDisplayName.placeholder = t('auth.displayNamePlaceholder');
        if (registerPassword) registerPassword.placeholder = t('auth.password');
        if (confirmPassword) confirmPassword.placeholder = t('auth.confirmPassword');
        
        // 更新認證按鈕
        setText('login-btn', 'app.login');
        setText('register-btn', 'app.register');
        setText('login-title', 'app.login');
        setText('register-title', 'app.register');
        setText('back-to-guest', 'app.backToGuest');
        
        // 更新五十音表（如果存在）
        setText('hiragana-btn', 'chart.hiragana');
        setText('katakana-btn', 'chart.katakana');
        setText('chart-title', 'chart.title');
        
        // 更新統計相關（使用 setText 避免變數問題）
        setText('stats-title', 'stats.title');
        setText('stat-total', 'stats.totalQuestions');
        setText('stat-score', 'stats.totalCorrect');
        setText('stat-accuracy', 'common.accuracy');  // 修復：使用正確的翻譯鍵
        setText('start-btn', 'practice.startBtn');
        setText('session-detail-title', 'sessionDetail.title');
        
        // 更新輸入框 placeholder（相容層）
        const answerInput = getElementByIdCompat('answer-input', 'answer');
        if (answerInput) answerInput.placeholder = t('practice.enterRomaji');
        
        const submitBtn = getElementByIdCompat('submit-btn', 'submit-answer-btn');
        if (submitBtn) submitBtn.textContent = t('practice.submitAnswer');
        
        // 更新標籤和按鈕
        updateCurrentTabTexts();
        
        // 更新動態創建的練習元素
        updateDynamicPracticeElements();
        
        // 更新新的練習模式文字
        updatePracticeModeTexts();
        
        // 始終更新認證相關文字（因為認證頁面可能隨時顯示）
        updateAuthTexts();
        
        // 更新Google按鈕語言（如果存在）
        if (typeof updateGoogleButtonsLanguage === 'function') {
            console.log('🔄 Triggering Google buttons language update...');
            // 異步調用，不阻塞其他翻譯更新
            updateGoogleButtonsLanguage().catch(error => {
                console.warn('❌ Google buttons update failed:', error);
                console.warn('💡 This might be due to origin not being whitelisted in Google OAuth settings');
            });
        } else {
            console.warn('⚠️ updateGoogleButtonsLanguage function not available');
        }
        
        // 開發模式自查腳本（檢查缺失的 ID 和語言選擇器）
        if (typeof window !== 'undefined' && window.location && ['localhost','127.0.0.1','[::1]'].includes(window.location.hostname)) {
            runI18nIdScanCheck();
            runLanguageSelectorCheck();
        }
        
        console.log('✅ updateAllTexts completed successfully');
        
    } catch (error) {
        console.error('❌ updateAllTexts failed:', error);
        // 即使出錯也要嘗試基本的翻譯
        setText('app-title', 'app.title');
        setText('practice-mode-title', 'practice.title');
    }
}

// i18n ID 自查腳本
function runI18nIdScanCheck() {
    const criticalIds = [
        'nav-practice', 'nav-chart', 'nav-statistics', 
        'start-btn', 'practice-mode-title',
        'mode-quick-name', 'mode-custom-name',
        'quick-basic-label', 'quick-dakuten-label', 'quick-handakuten-label', 'quick-youon-label'
    ];
    
    const missingIds = criticalIds.filter(id => !document.getElementById(id));
    
    if (missingIds.length > 0) {
        console.warn('🔍 [i18n scan] Missing IDs detected:', missingIds);
        console.warn('💡 These elements may not be translated properly');
    } else {
        console.log('✅ [i18n scan] All critical IDs found');
    }
}

// 語言選擇器值檢查（開發期自檢）
function runLanguageSelectorCheck() {
    const selectors = ['language-select', 'review-language', 'google-language'];
    
    selectors.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value) {
            console.warn(`🔍 [i18n scan] ${id} has empty value; fallback may be missing`);
        }
    });
    
    console.log('✅ [i18n scan] Language selector values checked');
}

// 更新當前標籤的文字
function updateCurrentTabTexts() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;
    
    const tabId = activeTab.id;
    
    switch(tabId) {
        case 'practice-tab':
            updatePracticeTexts();
            break;
        case 'chart-tab':
            updateChartTexts();
            break;
        case 'statistics-tab':
            updateStatisticsTexts();
            break;
        case 'auth-tab':
            updateAuthTexts();
            break;
    }
}

// 更新練習頁面文字
function updatePracticeTexts() {
    const practiceTitle = document.getElementById('practice-title');
    const typeHiragana = document.getElementById('type-hiragana');
    const typeKatakana = document.getElementById('type-katakana');
    const typeMixed = document.getElementById('type-mixed');
    const startBtn = document.getElementById('start-btn');
    const quizTitle = document.getElementById('quiz-title');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToSetupBtn = document.getElementById('back-to-setup-btn');
    const restartBtn = document.getElementById('restart-btn');
    const resultTitle = document.getElementById('result-title');
    const answerInput = document.getElementById('answer-input');
    
    if (practiceTitle) practiceTitle.textContent = t('practice.title');
    if (typeHiragana) typeHiragana.textContent = t('chart.hiragana');
    if (typeKatakana) typeKatakana.textContent = t('chart.katakana');
    if (typeMixed) typeMixed.textContent = t('kana.types.mixed');
    if (startBtn) startBtn.textContent = t('practice.startBtn');
    if (quizTitle) quizTitle.textContent = t('practice.title');
    if (submitAnswerBtn) submitAnswerBtn.textContent = t('practice.submitAnswer');
    if (nextQuestionBtn) nextQuestionBtn.textContent = t('practice.nextQuestion');
    if (backToSetupBtn) backToSetupBtn.textContent = t('practice.backToSetup');
    if (restartBtn) restartBtn.textContent = t('practice.restartPractice');
    if (resultTitle) resultTitle.textContent = t('practice.practiceComplete');
    if (answerInput) answerInput.placeholder = t('practice.enterRomaji');
    
    // 更新類別標籤 - 使用 translateType 函數處理
    const categoryLabels = document.querySelectorAll('.category-label');
    categoryLabels.forEach(label => {
        const originalText = label.getAttribute('data-original') || label.textContent;
        if (originalText) {
            label.setAttribute('data-original', originalText);
            label.textContent = translateType(originalText);
        }
    });
}

// 更新圖表頁面文字
function updateChartTexts() {
    const chartTitle = document.getElementById('chart-title');
    const hiraganaBtn = document.getElementById('chart-hiragana-label');
    const katakanaBtn = document.getElementById('chart-katakana-label');
    
    if (chartTitle) chartTitle.textContent = t('chart.title');
    if (hiraganaBtn) hiraganaBtn.textContent = t('chart.hiragana');
    if (katakanaBtn) katakanaBtn.textContent = t('chart.katakana');
    
    // 更新促音和長音說明
    setText('group-sokuon', 'kana.categories.sokuon');
    setText('sokuon-desc', 'chart.sokuonDesc');
    setText('sokuon-example', 'chart.sokuonExample');
    setText('group-chouon', 'kana.categories.chouon');
    setText('chouon-desc', 'chart.chouonDesc');
    setText('chouon-example', 'chart.chouonExample');
}

// 更新統計頁面文字
function updateStatisticsTexts() {
    const statsTitle = document.getElementById('stats-title');
    const totalSessions = document.getElementById('total-sessions');
    const totalQuestions = document.getElementById('total-questions');
    const totalCorrect = document.getElementById('total-correct');
    const avgAccuracy = document.getElementById('avg-accuracy');
    
    if (statsTitle) statsTitle.textContent = t('stats.title');
    if (totalSessions) totalSessions.textContent = t('stats.totalSessions');
    if (totalQuestions) totalQuestions.textContent = t('stats.totalQuestions');
    if (totalCorrect) totalCorrect.textContent = t('stats.totalCorrect');
    if (avgAccuracy) avgAccuracy.textContent = t('stats.avgAccuracy');
}

// 更新認證頁面文字
function updateAuthTexts() {
    // 基本認證標題和按鈕
    setText('auth-title', 'app.title');
    setText('login-btn', 'app.login');
    setText('register-btn', 'app.register');
    
    // 認證標籤頁
    setText('login-tab', 'app.login');
    setText('register-tab', 'app.register');
    
    // 登入表單標籤
    setText('login-identifier-label', 'auth.loginAccount');
    setText('login-password-label', 'auth.password');
    setText('login-button', 'app.login');
    
    // 註冊表單標籤
    setText('register-username-label', 'auth.username');
    setText('register-email-label', 'auth.email');
    setText('register-display-name-label', 'auth.displayName');
    setText('register-birth-date-label', 'auth.birthDate');
    setText('register-language-label', 'auth.preferredLanguage');
    setText('register-password-label', 'auth.password');
    setText('register-password-confirm-label', 'auth.confirmPassword');
    setText('register-button', 'app.register');
    
    // 密碼要求文字
    setText('req-length-text', 'auth.passwordReq.length');
    setText('req-letter-text', 'auth.passwordReq.letter');
    setText('req-number-text', 'auth.passwordReq.number');
    
    // OAuth 分隔線文字
    setText('oauth-divider-text', 'auth.orDivider');
    setText('oauth-divider-text-register', 'auth.orDivider');
    
    // Google 完成個人資料表單
    setText('complete-profile-title', 'auth.completeProfile');
    setText('google-nickname-label', 'auth.nickname');
    setText('google-birth-date-label', 'auth.birthDate');
    setText('google-language-label', 'auth.preferredLanguage');
    setText('skip-profile-button', 'auth.skipSetup');
    setText('save-profile-button', 'auth.saveProfile');
}

// 更新動態創建的練習元素
function updateDynamicPracticeElements() {
    // 更新所有可能的練習相關按鈕文字
    const startBtn = document.getElementById('start-btn');
    if (startBtn && startBtn.style.display !== 'none') {
        startBtn.textContent = t('practice.startBtn');
    }
    
    // 更新練習模式中的語言選擇器
    const languageSelectors = document.querySelectorAll('[data-language-selector="true"]');
    languageSelectors.forEach(selector => {
        const currentLang = getCurrentLanguage();
        const zhOption = selector.querySelector('option[value="zh"]');
        const enOption = selector.querySelector('option[value="en"]');
        
        if (zhOption) zhOption.textContent = currentLang === 'en' ? 'Chinese' : '中文';
        if (enOption) enOption.textContent = 'English';
    });
    
    // 更新其他動態元素...
    if (typeof window.updateReviewModeTexts === 'function') {
        window.updateReviewModeTexts();
    }
}

// 更新新練習模式文字
function updatePracticeModeTexts() {
    try {
        // 練習模式標題
        setText('practice-mode-title', 'practice.title');
        
        // 模式名稱和描述
        setText('mode-quick-name', 'practice.quickMode');
        setText('mode-quick-desc', 'practice.quickModeDesc');
        setText('mode-custom-name', 'practice.customMode');
        setText('mode-custom-desc', 'practice.customModeDesc');
    
    // 快速模式選項標籤
    const quickRangeLabel = document.getElementById('quick-range-label');
    const quickCountLabel = document.getElementById('quick-count-label');
    if (quickRangeLabel) quickRangeLabel.textContent = t('practice.practiceRange');
    if (quickCountLabel) quickCountLabel.textContent = t('practice.questionCount');
    
    // 自訂模式選項標籤
    const quickSelectionTitle = document.getElementById('quick-selection-title');
    const detailedSelectionTitle = document.getElementById('detailed-selection-title');
    if (quickSelectionTitle) quickSelectionTitle.textContent = t('practice.quickSelection');
    if (detailedSelectionTitle) detailedSelectionTitle.textContent = t('practice.detailedSelection');
    
    // 快速選擇按鈕
    const basicSelectAllBtn = document.getElementById('basic-select-all-btn');
    const dakutenSelectAllBtn = document.getElementById('dakuten-select-all-btn');
    const handakutenSelectAllBtn = document.getElementById('handakuten-select-all-btn');
    const youonSelectAllBtn = document.getElementById('youon-select-all-btn');
    const clearAllSelectionBtn = document.getElementById('clear-all-selection-btn');
    
    if (basicSelectAllBtn) basicSelectAllBtn.textContent = t('practice.basicSelectAll');
    if (dakutenSelectAllBtn) dakutenSelectAllBtn.textContent = t('practice.dakutenSelectAll');
    if (handakutenSelectAllBtn) handakutenSelectAllBtn.textContent = t('practice.handakutenSelectAll');
    if (youonSelectAllBtn) youonSelectAllBtn.textContent = t('practice.youonSelectAll');
    if (clearAllSelectionBtn) clearAllSelectionBtn.textContent = t('practice.clearAllSelection');
    
    // 類別標題
    const basicCategoryTitle = document.getElementById('basic-category-title');
    const dakutenCategoryTitle = document.getElementById('dakuten-category-title');
    const handakutenCategoryTitle = document.getElementById('handakuten-category-title');
    const youonCategoryTitle = document.getElementById('youon-category-title');
    
    if (basicCategoryTitle) basicCategoryTitle.textContent = t('practice.basicCategory');
    if (dakutenCategoryTitle) dakutenCategoryTitle.textContent = t('practice.dakutenCategory');
    if (handakutenCategoryTitle) handakutenCategoryTitle.textContent = t('practice.handakutenCategory');
    if (youonCategoryTitle) youonCategoryTitle.textContent = t('practice.youonCategory');
    
    // 練習量選項
    const practiceAmountLabel = document.getElementById('practice-amount-label');
    const allPracticeLabel = document.getElementById('all-practice-label');
    const random15Label = document.getElementById('random-15-label');
    const random30Label = document.getElementById('random-30-label');
    const questionsLabel = document.getElementById('questions-label');
    
    if (practiceAmountLabel) practiceAmountLabel.textContent = t('practice.practiceAmount');
    if (allPracticeLabel) allPracticeLabel.textContent = t('practice.allPractice');
    if (random15Label) random15Label.textContent = t('practice.random15');
    if (random30Label) random30Label.textContent = t('practice.random30');
    if (questionsLabel) questionsLabel.textContent = t('practice.questions');
    
    // 快速練習題數選項
    const quickCount10 = document.getElementById('quick-count-10');
    const quickCount15 = document.getElementById('quick-count-15');
    const quickCount20 = document.getElementById('quick-count-20');
    
    if (quickCount10) quickCount10.textContent = t('practice.count10');
    if (quickCount15) quickCount15.textContent = t('practice.count15');
    if (quickCount20) quickCount20.textContent = t('practice.count20');
    
    // 更新快速練習範圍標籤（整合邏輯，避免雙源更新）
    const kanaType = document.querySelector('input[name="kana-type"]:checked')?.value || 'hiragana';
    const basicLabel = document.getElementById('quick-basic-label');
    const dakutenLabel = document.getElementById('quick-dakuten-label');
    const handakutenLabel = document.getElementById('quick-handakuten-label');
    const youonLabel = document.getElementById('quick-youon-label');
    
    if (basicLabel && dakutenLabel && handakutenLabel && youonLabel) {
        if (kanaType === 'katakana') {
            basicLabel.textContent = t('practice.quickBasicKatakana');
            dakutenLabel.textContent = t('practice.quickDakutenKatakana');
            handakutenLabel.textContent = t('practice.quickHandakutenKatakana');
            youonLabel.textContent = t('practice.quickYouonKatakana');
        } else if (kanaType === 'mixed') {
            basicLabel.textContent = t('practice.quickBasicMixed');
            dakutenLabel.textContent = t('practice.quickDakutenMixed');
            handakutenLabel.textContent = t('practice.quickHandakutenMixed');
            youonLabel.textContent = t('practice.quickYouonMixed');
        } else {
            basicLabel.textContent = t('practice.quickBasicHiragana');
            dakutenLabel.textContent = t('practice.quickDakutenHiragana');
            handakutenLabel.textContent = t('practice.quickHandakutenHiragana');
            youonLabel.textContent = t('practice.quickYouonHiragana');
        }
    }
    
    } catch (error) {
        console.error('❌ updatePracticeModeTexts failed:', error);
        // 即使出錯也要嘗試基本的翻譯
        setText('practice-mode-title', 'practice.title');
    }
}

// 開發期缺鍵提示輔助函數（低噪音）
const isDevHost = typeof window !== 'undefined' && ['localhost','127.0.0.1','[::1]'].includes(location.hostname);

export function tt(key, opts) {
    const out = t(key, opts);
    if (isDevHost && (out === key || out == null)) {
        console.warn('[i18n] missing key:', key);
    }
    return out ?? key;
}

// 暫時墊片，避免舊代碼炸（之後可移除）
if (typeof window !== 'undefined') {
    const noop = () => {};
    window.updatePracticeModeTexts ||= noop;
    window.updateCategoryLabels ||= noop;
    window.updateChartTexts ||= noop;
    window.updateGoogleButtonText ||= noop;
    window.updateAuthTexts ||= noop;
}

/**
 * 通用 i18n 綁定器 - 掃描 data-i18n* 屬性並填入文字
 * @param {Element} root - 掃描根節點，預設為整個 document
 */
export function bindI18nTexts(root = document) {
    const tFunc = (k, o) => (i18next?.t?.(k, o) ?? k);

    // 1) 純文字節點：<span data-i18n="xxx">
    root.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = tFunc(key);
            if (!i18next?.exists?.(key)) {
                console.warn('[i18n] missing key:', key, el);
            }
        }
    });

    // 2) 需要寫入屬性：data-i18n-attr="placeholder,title,aria-label"
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const list = el.getAttribute('data-i18n-attr').split(',').map(s => s.trim()).filter(Boolean);
        list.forEach(attr => {
            const key = el.getAttribute(`data-i18n-${attr}`);
            if (key) {
                el.setAttribute(attr, tFunc(key));
                if (!i18next?.exists?.(key)) {
                    console.warn('[i18n] missing key:', key, el);
                }
            }
        });
    });

    // 3) 需要 innerHTML（有 <b>/<br> 等）：<div data-i18n-html="xxx">
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (key) {
            el.innerHTML = tFunc(key);
            if (!i18next?.exists?.(key)) {
                console.warn('[i18n] missing key:', key, el);
            }
        }
    });

    console.log('🔤 [i18n] bindI18nTexts completed');
}

// 匯出所有必要的函數供外部使用
export { initI18n, changeLanguage, getCurrentLanguage, updateAllTexts, t, translateType };
export default { initI18n, changeLanguage, getCurrentLanguage, updateAllTexts, t, translateType };

// Deprecation 警告現在在 index.html 的 initializePage 中處理
// 避免與 Object.freeze 衝突