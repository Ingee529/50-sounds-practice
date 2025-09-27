/**
 * SEO Manager - 動態 SEO 優化模組
 * 根據用戶語言偏好動態更新頁面標題、meta 標籤等 SEO 元素
 */

class SEOManager {
    constructor() {
        this.seoData = {
            zh: {
                title: "日文五十音練習器 | 完全免費線上學習",
                description: "免費線上日文五十音練習器，支援平假名、片假名學習。Google帳號快速註冊，追蹤學習進度，提升日語基礎能力。",
                keywords: "日文,五十音,平假名,片假名,練習,學習,免費,線上,日語,基礎,發音,記憶",
                ogTitle: "日文五十音練習器 | 完全免費線上學習",
                ogDescription: "免費線上日文五十音練習器，支援平假名、片假名學習，Google帳號快速註冊，追蹤學習進度",
                twitterTitle: "日文五十音練習器 | 完全免費線上學習",
                twitterDescription: "免費線上日文五十音練習器，支援平假名、片假名學習",
                hreflang: "zh-TW",
                canonical: "https://japanese50sounds.com/zh/",
                jsonLd: {
                    name: "日文五十音練習器",
                    alternateName: "Japanese 50 Sounds Practice",
                    description: "免費線上日文五十音練習器，支援平假名、片假名學習，Google帳號快速註冊，追蹤學習進度",
                    inLanguage: "zh-TW"
                }
            },
            en: {
                title: "Japanese 50 Sounds Practice | Free Online Learning",
                description: "Free online Japanese 50 sounds practice tool with Hiragana and Katakana learning. Quick Google account registration, progress tracking, and improved Japanese foundation skills.",
                keywords: "Japanese,50 sounds,Hiragana,Katakana,practice,learning,free,online,language,foundation,pronunciation,memory",
                ogTitle: "Japanese 50 Sounds Practice | Free Online Learning",
                ogDescription: "Free online Japanese 50 sounds practice tool with Hiragana and Katakana learning, quick Google account registration, progress tracking",
                twitterTitle: "Japanese 50 Sounds Practice | Free Online Learning",
                twitterDescription: "Free online Japanese 50 sounds practice tool with Hiragana and Katakana learning",
                hreflang: "en-US",
                canonical: "https://japanese50sounds.com/en/",
                jsonLd: {
                    name: "Japanese 50 Sounds Practice",
                    alternateName: "日文五十音練習器",
                    description: "Free online Japanese 50 sounds practice tool with Hiragana and Katakana learning, quick Google account registration, progress tracking",
                    inLanguage: "en-US"
                }
            }
        };
        
        this.currentLanguage = 'zh';
        this.init();
    }

    init() {
        // 檢測初始語言
        const initialLang = this.detectInitialLanguage();
        
        // 監聽語言變化
        this.observeLanguageChanges();
        
        // 初始化 SEO 標籤
        this.updateSEO(initialLang);
    }

    detectInitialLanguage() {
        // 1. 檢查 localStorage 中的語言偏好
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && this.seoData[savedLang]) {
            return savedLang;
        }

        // 2. 檢查瀏覽器語言設定
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            return 'zh';
        } else if (browserLang.startsWith('en')) {
            return 'en';
        }

        // 3. 檢查 URL 參數
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.seoData[langParam]) {
            return langParam;
        }

        // 4. 檢查 URL 路徑
        const path = window.location.pathname;
        if (path.includes('/en/') || path.includes('/en')) {
            return 'en';
        } else if (path.includes('/zh/') || path.includes('/zh')) {
            return 'zh';
        }

        // 5. 預設為中文
        return 'zh';
    }

    observeLanguageChanges() {
        // 監聽語言選擇器變化
        const languageSelect = document.getElementById('language');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.updateSEO(e.target.value);
            });
        }

        // 監聽 localStorage 變化（跨標籤同步）
        window.addEventListener('storage', (e) => {
            if (e.key === 'preferredLanguage' && e.newValue) {
                this.updateSEO(e.newValue);
            }
        });
    }

    updateSEO(language) {
        if (!this.seoData[language]) {
            console.warn(`SEO data not found for language: ${language}`);
            return;
        }

        this.currentLanguage = language;
        const seoData = this.seoData[language];

        // 更新 HTML lang 屬性
        document.documentElement.lang = seoData.hreflang;

        // 更新頁面標題
        document.title = seoData.title;

        // 更新 meta 標籤
        this.updateMetaTag('description', seoData.description);
        this.updateMetaTag('keywords', seoData.keywords);
        this.updateMetaTag('language', seoData.hreflang);

        // 更新 Open Graph 標籤
        this.updateMetaProperty('og:title', seoData.ogTitle);
        this.updateMetaProperty('og:description', seoData.ogDescription);
        this.updateMetaProperty('og:locale', seoData.hreflang);

        // 更新 Twitter 標籤
        this.updateMetaName('twitter:title', seoData.twitterTitle);
        this.updateMetaName('twitter:description', seoData.twitterDescription);

        // 更新 canonical URL
        this.updateCanonical(seoData.canonical);

        // 更新 hreflang 標籤
        this.updateHreflangTags();

        // 更新 JSON-LD 結構化資料
        this.updateJsonLd(seoData.jsonLd);

        console.log(`SEO updated for language: ${language}`);
    }

    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    updateMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    updateMetaName(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    updateCanonical(url) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    }

    updateHreflangTags() {
        // 移除現有的 hreflang 標籤
        const existingHreflang = document.querySelectorAll('link[hreflang]');
        existingHreflang.forEach(link => link.remove());

        // 添加新的 hreflang 標籤
        const languages = ['zh-TW', 'en-US'];
        const baseUrl = 'https://japanese50sounds.com';
        
        languages.forEach(lang => {
            const hreflang = document.createElement('link');
            hreflang.rel = 'alternate';
            hreflang.hreflang = lang;
            hreflang.href = lang === 'zh-TW' ? `${baseUrl}/zh/` : `${baseUrl}/en/`;
            document.head.appendChild(hreflang);
        });

        // 添加 x-default
        const xDefault = document.createElement('link');
        xDefault.rel = 'alternate';
        xDefault.hreflang = 'x-default';
        xDefault.href = `${baseUrl}/`;
        document.head.appendChild(xDefault);
    }

    updateJsonLd(jsonLdData) {
        // 移除現有的 JSON-LD
        const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
        if (existingJsonLd) {
            existingJsonLd.remove();
        }

        // 創建新的 JSON-LD
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": jsonLdData.name,
            "alternateName": jsonLdData.alternateName,
            "description": jsonLdData.description,
            "url": "https://japanese50sounds.com/",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Person",
                "name": "Ingee Yang"
            },
            "inLanguage": jsonLdData.inLanguage,
            "educationalLevel": "Beginner to Intermediate",
            "teaches": "Japanese Language",
            "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
            },
            "featureList": [
                "Hiragana Practice",
                "Katakana Practice", 
                "Progress Tracking",
                "Free Online Learning"
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd, null, 2);
        document.head.appendChild(script);
    }

    // 獲取當前語言
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 手動更新 SEO（供外部調用）
    forceUpdate(language) {
        this.updateSEO(language);
    }

    // 根據用戶行為動態更新標題
    updateDynamicTitle(context = '') {
        const seoData = this.seoData[this.currentLanguage];
        let dynamicTitle = seoData.title;

        if (context) {
            const contextMap = {
                zh: {
                    'practice': ' | 練習模式',
                    'chart': ' | 五十音圖表',
                    'statistics': ' | 學習統計',
                    'quiz': ' | 測驗進行中'
                },
                en: {
                    'practice': ' | Practice Mode',
                    'chart': ' | Kana Chart',
                    'statistics': ' | Learning Statistics',
                    'quiz': ' | Quiz in Progress'
                }
            };

            const contextText = contextMap[this.currentLanguage]?.[context];
            if (contextText) {
                dynamicTitle += contextText;
            }
        }

        document.title = dynamicTitle;
        this.updateMetaProperty('og:title', dynamicTitle);
        this.updateMetaName('twitter:title', dynamicTitle);
    }

    // 添加結構化資料更新
    updateStructuredData(additionalData = {}) {
        const seoData = this.seoData[this.currentLanguage];
        const baseJsonLd = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": seoData.jsonLd.name,
            "alternateName": seoData.jsonLd.alternateName,
            "description": seoData.jsonLd.description,
            "url": "https://japanese50sounds.com/",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Person",
                "name": "Ingee Yang"
            },
            "inLanguage": seoData.jsonLd.inLanguage,
            "educationalLevel": "Beginner to Intermediate",
            "teaches": "Japanese Language",
            "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
            },
            "featureList": [
                "Hiragana Practice",
                "Katakana Practice", 
                "Progress Tracking",
                "Free Online Learning"
            ],
            ...additionalData
        };

        // 移除現有的 JSON-LD
        const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
        if (existingJsonLd) {
            existingJsonLd.remove();
        }

        // 創建新的 JSON-LD
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(baseJsonLd, null, 2);
        document.head.appendChild(script);
    }
}

// 創建全域 SEO 管理器實例
window.seoManager = new SEOManager();

// 暴露到全域作用域
window.updateSEO = (language) => window.seoManager.forceUpdate(language);

console.log('SEO Manager initialized');
