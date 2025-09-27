    // Complete kana data
    const kanaData = {
        basic: {
            hiragana: [
                ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
                ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
                ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
                ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
                ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
                ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
                ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
                ["や","ya"],["ゆ","yu"],["よ","yo"],
                ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
                ["わ","wa"],["を","wo"],["ん","n"]
            ],
            katakana: [
                ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
                ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
                ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
                ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
                ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
                ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
                ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
                ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
                ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
                ["ワ","wa"],["ヲ","wo"],["ン","n"]
            ]
        },
        dakuten: {
            hiragana: [
                ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
                ["ざ","za"],["じ","ji/zi"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
                ["だ","da"],["ぢ","di/ji"],["づ","du/zu"],["で","de"],["ど","do"],
                ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]
            ],
            katakana: [
                ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
                ["ザ","za"],["ジ","ji/zi"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
                ["ダ","da"],["ヂ","di/ji"],["ヅ","du/zu"],["デ","de"],["ド","do"],
                ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]
            ]
        },
        handakuten: {
            hiragana: [
                ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
            ],
            katakana: [
                ["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
            ]
        },
        youon: {
            hiragana: [
                ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
                ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
                ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
                ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
                ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
                ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
                ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
                ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
                ["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
                ["ぢゃ","dya"],["ぢゅ","dyu"],["ぢょ","dyo"],
                ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
                ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]
            ],
            katakana: [
                ["キャ","kya"],["キュ","kyu"],["キョ","kyo"],
                ["シャ","sha"],["シュ","shu"],["ショ","sho"],
                ["チャ","cha"],["チュ","chu"],["チョ","cho"],
                ["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"],
                ["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],
                ["ミャ","mya"],["ミュ","myu"],["ミョ","myo"],
                ["リャ","rya"],["リュ","ryu"],["リョ","ryo"],
                ["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],
                ["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],
                ["ヂャ","dya"],["ヂュ","dyu"],["ヂョ","dyo"],
                ["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],
                ["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"]
            ]
        }
    };

    // Row-based kana data for custom selection
    const kanaRowData = {
        // Basic sounds (清音)
        'a-row': {
            hiragana: [["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"]],
            katakana: [["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"]]
        },
        'ka-row': {
            hiragana: [["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"]],
            katakana: [["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"]]
        },
        'sa-row': {
            hiragana: [["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"]],
            katakana: [["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"]]
        },
        'ta-row': {
            hiragana: [["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"]],
            katakana: [["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"]]
        },
        'na-row': {
            hiragana: [["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"]],
            katakana: [["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"]]
        },
        'ha-row': {
            hiragana: [["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"]],
            katakana: [["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"]]
        },
        'ma-row': {
            hiragana: [["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"]],
            katakana: [["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"]]
        },
        'ya-row': {
            hiragana: [["や","ya"],["ゆ","yu"],["よ","yo"]],
            katakana: [["ヤ","ya"],["ユ","yu"],["ヨ","yo"]]
        },
        'ra-row': {
            hiragana: [["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"]],
            katakana: [["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"]]
        },
        'wa-row': {
            hiragana: [["わ","wa"],["を","wo"],["ん","n"]],
            katakana: [["ワ","wa"],["ヲ","wo"],["ン","n"]]
        },
        
        // Dakuten sounds (濁音)
        'ga-row': {
            hiragana: [["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"]],
            katakana: [["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"]]
        },
        'za-row': {
            hiragana: [["ざ","za"],["じ","ji/zi"],["ず","zu"],["ぜ","ze"],["ぞ","zo"]],
            katakana: [["ザ","za"],["ジ","ji/zi"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"]]
        },
        'da-row': {
            hiragana: [["だ","da"],["ぢ","di/ji"],["づ","du/zu"],["で","de"],["ど","do"]],
            katakana: [["ダ","da"],["ヂ","di/ji"],["ヅ","du/zu"],["デ","de"],["ド","do"]]
        },
        'ba-row': {
            hiragana: [["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]],
            katakana: [["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]]
        },
        
        // Handakuten sounds (半濁音)
        'pa-row': {
            hiragana: [["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]],
            katakana: [["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]]
        },
        
        // Youon (拗音) by rows
        'kya-row': {
            hiragana: [["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"]],
            katakana: [["キャ","kya"],["キュ","kyu"],["キョ","kyo"]]
        },
        'sha-row': {
            hiragana: [["しゃ","sha"],["しゅ","shu"],["しょ","sho"]],
            katakana: [["シャ","sha"],["シュ","shu"],["ショ","sho"]]
        },
        'cha-row': {
            hiragana: [["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"]],
            katakana: [["チャ","cha"],["チュ","chu"],["チョ","cho"]]
        },
        'nya-row': {
            hiragana: [["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"]],
            katakana: [["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"]]
        },
        'hya-row': {
            hiragana: [["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"]],
            katakana: [["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"]]
        },
        'mya-row': {
            hiragana: [["みゃ","mya"],["みゅ","myu"],["みょ","myo"]],
            katakana: [["ミャ","mya"],["ミュ","myu"],["ミョ","myo"]]
        },
        'rya-row': {
            hiragana: [["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"]],
            katakana: [["リャ","rya"],["リュ","ryu"],["リョ","ryo"]]
        },
        'gya-row': {
            hiragana: [["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"]],
            katakana: [["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"]]
        },
        'ja-row': {
            hiragana: [["じゃ","ja"],["じゅ","ju"],["じょ","jo"]],
            katakana: [["ジャ","ja"],["ジュ","ju"],["ジョ","jo"]]
        },
        'bya-row': {
            hiragana: [["びゃ","bya"],["びゅ","byu"],["びょ","byo"]],
            katakana: [["ビャ","bya"],["ビュ","byu"],["ビョ","byo"]]
        },
        'pya-row': {
            hiragana: [["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]],
            katakana: [["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"]]
        }
    };

    // Row name data for different kana types
    const rowNameData = {
        'a-row': { hiragana: 'あ行', katakana: 'ア行' },
        'ka-row': { hiragana: 'か行', katakana: 'カ行' },
        'sa-row': { hiragana: 'さ行', katakana: 'サ行' },
        'ta-row': { hiragana: 'た行', katakana: 'タ行' },
        'na-row': { hiragana: 'な行', katakana: 'ナ行' },
        'ha-row': { hiragana: 'は行', katakana: 'ハ行' },
        'ma-row': { hiragana: 'ま行', katakana: 'マ行' },
        'ya-row': { hiragana: 'や行', katakana: 'ヤ行' },
        'ra-row': { hiragana: 'ら行', katakana: 'ラ行' },
        'wa-row': { hiragana: 'わ行', katakana: 'ワ行' },
        'ga-row': { hiragana: 'が行', katakana: 'ガ行' },
        'za-row': { hiragana: 'ざ行', katakana: 'ザ行' },
        'da-row': { hiragana: 'だ行', katakana: 'ダ行' },
        'ba-row': { hiragana: 'ば行', katakana: 'バ行' },
        'pa-row': { hiragana: 'ぱ行', katakana: 'パ行' },
        'kya-row': { hiragana: 'きゃ行', katakana: 'キャ行' },
        'sha-row': { hiragana: 'しゃ行', katakana: 'シャ行' },
        'cha-row': { hiragana: 'ちゃ行', katakana: 'チャ行' },
        'nya-row': { hiragana: 'にゃ行', katakana: 'ニャ行' },
        'hya-row': { hiragana: 'ひゃ行', katakana: 'ヒャ行' },
        'mya-row': { hiragana: 'みゃ行', katakana: 'ミャ行' },
        'rya-row': { hiragana: 'りゃ行', katakana: 'リャ行' },
        'gya-row': { hiragana: 'ぎゃ行', katakana: 'ギャ行' },
        'ja-row': { hiragana: 'じゃ行', katakana: 'ジャ行' },
        'bya-row': { hiragana: 'びゃ行', katakana: 'ビャ行' },
        'pya-row': { hiragana: 'ぴゃ行', katakana: 'ピャ行' }
    };

    // Row preview data for different kana types
    const rowPreviewData = {
        'a-row': { hiragana: 'あいうえお', katakana: 'アイウエオ' },
        'ka-row': { hiragana: 'かきくけこ', katakana: 'カキクケコ' },
        'sa-row': { hiragana: 'さしすせそ', katakana: 'サシスセソ' },
        'ta-row': { hiragana: 'たちつてと', katakana: 'タチツテト' },
        'na-row': { hiragana: 'なにぬねの', katakana: 'ナニヌネノ' },
        'ha-row': { hiragana: 'はひふへほ', katakana: 'ハヒフヘホ' },
        'ma-row': { hiragana: 'まみむめも', katakana: 'マミムメモ' },
        'ya-row': { hiragana: 'や　ゆ　よ', katakana: 'ヤ　ユ　ヨ' },
        'ra-row': { hiragana: 'らりるれろ', katakana: 'ラリルレロ' },
        'wa-row': { hiragana: 'わ　　をん', katakana: 'ワ　　ヲン' },
        'ga-row': { hiragana: 'がぎぐげご', katakana: 'ガギグゲゴ' },
        'za-row': { hiragana: 'ざじずぜぞ', katakana: 'ザジズゼゾ' },
        'da-row': { hiragana: 'だぢづでど', katakana: 'ダヂヅデド' },
        'ba-row': { hiragana: 'ばびぶべぼ', katakana: 'バビブベボ' },
        'pa-row': { hiragana: 'ぱぴぷぺぽ', katakana: 'パピプペポ' },
        'kya-row': { hiragana: 'きゃきゅきょ', katakana: 'キャキュキョ' },
        'sha-row': { hiragana: 'しゃしゅしょ', katakana: 'シャシュショ' },
        'cha-row': { hiragana: 'ちゃちゅちょ', katakana: 'チャチュチョ' },
        'nya-row': { hiragana: 'にゃにゅにょ', katakana: 'ニャニュニョ' },
        'hya-row': { hiragana: 'ひゃひゅひょ', katakana: 'ヒャヒュヒョ' },
        'mya-row': { hiragana: 'みゃみゅみょ', katakana: 'ミャミュミョ' },
        'rya-row': { hiragana: 'りゃりゅりょ', katakana: 'リャリュリョ' },
        'gya-row': { hiragana: 'ぎゃぎゅぎょ', katakana: 'ギャギュギョ' },
        'ja-row': { hiragana: 'じゃじゅじょ', katakana: 'ジャジュジョ' },
        'bya-row': { hiragana: 'びゃびゅびょ', katakana: 'ビャビュビョ' },
        'pya-row': { hiragana: 'ぴゃぴゅぴょ', katakana: 'ピャピュピョ' }
    };

    // Kana chart data
    const chartData = {
        basic: [
            ["","a","i","u","e","o"],
            ["","あ/ア","い/イ","う/ウ","え/エ","お/オ"],
            ["k","か/カ","き/キ","く/ク","け/ケ","こ/コ"],
            ["s","さ/サ","し/シ","す/ス","せ/セ","そ/ソ"],
            ["t","た/タ","ち/チ","つ/ツ","て/テ","と/ト"],
            ["n","な/ナ","に/ニ","ぬ/ヌ","ね/ネ","の/ノ"],
            ["h","は/ハ","ひ/ヒ","ふ/フ","へ/ヘ","ほ/ホ"],
            ["m","ま/マ","み/ミ","む/ム","め/メ","も/モ"],
            ["y","や/ヤ","","ゆ/ユ","","よ/ヨ"],
            ["r","ら/ラ","り/リ","る/ル","れ/レ","ろ/ロ"],
            ["w","わ/ワ","","","","を/ヲ (wo/o)"],
            ["","","","","","ん/ン"]
        ],
        dakuten: [
            ["","a","i","u","e","o"],
            ["g","が/ガ","ぎ/ギ","ぐ/グ","げ/ゲ","ご/ゴ"],
            ["z","ざ/ザ","じ/ジ (ji/zi)","ず/ズ","ぜ/ゼ","ぞ/ゾ"],
            ["d","だ/ダ","ぢ/ヂ (di/ji)","づ/ヅ (du/zu)","で/デ","ど/ド"],
            ["b","ば/バ","び/ビ","ぶ/ブ","べ/ベ","ぼ/ボ"]
        ],
        handakuten: [
            ["","a","i","u","e","o"],
            ["p","ぱ/パ","ぴ/ピ","ぷ/プ","ぺ/ペ","ぽ/ポ"]
        ]
    };

    let selected = [], current = 0, score = 0, total = 0, lang = "zh";
    let questionStartTime = null; // Record start time for each question
    
    // Translation object moved to i18next (js/i18n.js)
    
    function translateType(type, language = __i18nRef?.getCurrentLanguage?.() || 'zh') {
        // Use i18next translation system
        if (window.i18next && window.i18next.exists) {
            // First try to find in kana.categories
            if (i18next.exists(`kana.categories.${type}`)) {
                return t(`kana.categories.${type}`);
            }
            // Then try to find in kana.groups
            if (i18next.exists(`kana.groups.${type}`)) {
                return t(`kana.groups.${type}`);
            }
            // Try to find in kana.types
            if (i18next.exists(`kana.types.${type}`)) {
                return t(`kana.types.${type}`);
            }
        }
        // Finally return original value
        return type;
    }
    
    // 暴露 translateType 到全域供模組使用
    window.translateType = translateType;

    // 安全獲取當前選中的假名類型
    function getCurrentKanaType() {
        const kanaTypeElement = document.querySelector('input[name="kana-type"]:checked');
        return kanaTypeElement ? kanaTypeElement.value : 'hiragana'; // 默認為平假名
    }

    // Old translation object replaced by i18next (js/i18n.js)

    // Authentication page language switching function
    function setLanguageAndUpdateAuth() {
        const authLang = document.getElementById('auth-language').value;
        document.getElementById('language').value = authLang;
        setLanguage();
    }
    
    // Registration language preference switching function
    function onLanguagePreferenceChange() {
        const preferredLang = document.getElementById('register-language').value;
        document.getElementById('language').value = preferredLang;
        setLanguage();
    }
    
    // Initialize language settings (based on system language)
    function initializeLanguage() {
        let detectedLang = 'zh'; // Default Traditional Chinese
        
        // Try to get saved language preference from localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && ['zh', 'en'].includes(savedLang)) {
            detectedLang = savedLang;
        } else {
            // Detect browser language settings
            const browserLang = navigator.language || navigator.userLanguage;
            console.log('Browser language detected:', browserLang);
            
            // Check if Chinese (including Traditional and Simplified)
            if (browserLang.startsWith('zh')) {
                detectedLang = 'zh';
            } else {
                detectedLang = 'en';
            }
        }
        
        // Set all language selectors
        const languageSelect = document.getElementById('language');
        const authLanguageSelect = document.getElementById('auth-language');
        const registerLanguageSelect = document.getElementById('register-language');
        
        if (languageSelect) languageSelect.value = detectedLang;
        if (authLanguageSelect) authLanguageSelect.value = detectedLang;
        if (registerLanguageSelect) registerLanguageSelect.value = detectedLang;
        
        // Save language preference
        localStorage.setItem('preferredLanguage', detectedLang);
        
        // Set global language
        lang = detectedLang;
        console.log('Language initialized to:', detectedLang);
    }

    // 同步所有語言選擇器
    function syncAllLanguageSelectors() {
        const currentLang = __i18nRef?.getCurrentLanguage?.() || 'zh';
        console.log("Syncing all language selectors to:", currentLang);
        
        // 定義所有語言選擇器的 ID
        const languageSelectors = [
            'language',
            'auth-language', 
            'register-language',
            'practice-language',
            'review-language',
            'google-language'
        ];
        
        // 同步所有存在的選擇器
        languageSelectors.forEach(id => {
            const selector = document.getElementById(id);
            if (selector && selector.value !== currentLang) {
                selector.value = currentLang;
                console.log(`Synced ${id} to ${currentLang}`);
            }
        });
        
        console.log("All language selectors synced");
    }

    async function setLanguage() {
        console.log("setLanguage called");
        
        const languageSelect = document.getElementById("language");
        if (languageSelect && __i18nRef?.changeLanguage) {
            const newLang = languageSelect.value;
            
            // 更新 i18n
            await __i18nRef?.changeLanguage?.(newLang);
            
            // 保存偏好設置
            localStorage.setItem('preferredLanguage', newLang);
            localStorage.setItem('language', newLang);
            
            // 更新 SEO 標籤
            if (window.seoManager) {
                window.seoManager.updateSEO(newLang);
            }
            
            console.log("Language set to:", newLang);
        }
        
        // 同步所有語言選擇器
        syncAllLanguageSelectors();
        
        try {
            console.log("Language updated successfully");
            
            // 更新各個組件
            updateChart();
            updatePracticeModeTexts();
            if (typeof updateModeSelectTexts === 'function') {
                updateModeSelectTexts();
            }
            
            // 更新所有 i18n 綁定文字
            __i18nRef?.updateAllTexts?.();
            
            // 更新 Google 按鈕（如果存在）
            if (typeof updateGoogleButtonsLanguage === 'function') {
                updateGoogleButtonsLanguage().catch(error => {
                    console.warn('Google buttons update failed:', error);
                });
            }
            
            // If currently on learning statistics page, reload statistics data to apply new language
            const statisticsTab = document.getElementById('statistics-tab');
            const activeNavTab = document.querySelector('.nav-tab[data-tab="statistics"].active');
            if ((statisticsTab && statisticsTab.style.display !== 'none' && statisticsTab.classList.contains('active')) || activeNavTab) {
                console.log("Statistics module will handle language change automatically");
            }
        } catch (error) {
            console.error("Error in setLanguage:", error);
        }
    }

    function showTab(tabName) {
        console.log("showTab called with:", tabName);
        
        // First hide all tab-content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none';
        });
        // First remove active from all nav-tabs
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

        // Show corresponding tab
        const currentTab = document.getElementById(tabName + '-tab');
        if (currentTab) {
            currentTab.classList.add('active');
            currentTab.style.display = 'block';
            console.log("Tab displayed:", tabName);
        } else {
            console.log("Tab not found:", tabName + '-tab');
        }
        
        // Add active to corresponding nav-tab
        const activeNavTab = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        if (activeNavTab) {
            activeNavTab.classList.add('active');
            console.log("Nav tab activated:", tabName);
        }

        // 更新動態 SEO 標題
        if (window.seoManager) {
            window.seoManager.updateDynamicTitle(tabName);
        }

        // Control start practice button display
        const startBtn = document.getElementById("start-btn");
        if (startBtn) {
            if (tabName === 'practice') {
                startBtn.style.display = "";
                startBtn.innerText = t('practice.startBtn');
                console.log("Start button shown");
            } else {
                startBtn.style.display = "none";
                console.log("Start button hidden");
            }
        }

        // 確保語言設定正確應用到當前標籤頁
        if (window.updateAllTexts) {
            __i18nRef?.updateAllTexts?.();
        }
        
        if (tabName === 'chart') {
            updateChart();
            console.log("Chart updated");
        } else if (tabName === 'statistics') {
            // Statistics module handles loading automatically via events
            console.log("Statistics tab activated - module will handle loading");
        }
        
        // Show/hide statistics section
        const statisticsSection = document.getElementById('statistics-section');
        if (statisticsSection) {
            statisticsSection.toggleAttribute('hidden', tabName !== 'statistics');
        }
    }

    function updateKanaType() {
        // Logic can be added when kana type is updated
    }

    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // ROW_INITIALS 轉接器：從 kanaData 動態取得行資料
    const ROW_INITIALS = {
        'a-row':'', 'ka-row':'k','sa-row':'s','ta-row':'t','na-row':'n',
        'ha-row':'h','ma-row':'m','ya-row':'y','ra-row':'r','wa-row':'w'
    };
    
    // 轉接器：優先用完整的 kanaRowData；沒有時才動態從 kanaData.basic 推導
    function pickRowFromKanaData(rowKey, type) {
        // 1) 先走 row 資料（涵蓋清音/濁音/半濁音/拗音）
        if (typeof kanaRowData === 'object' && kanaRowData && kanaRowData[rowKey]) {
            const row = kanaRowData[rowKey];
            if (type === 'hiragana') return Array.isArray(row.hiragana) ? row.hiragana : [];
            if (type === 'katakana') return Array.isArray(row.katakana) ? row.katakana : [];
            return [];
        }

        // 2) 回退：只對「清音基本行 a/ka/sa…」動態從 kanaData.basic 推導
        const initial = ROW_INITIALS[rowKey];
        if (initial === undefined) return []; // 非清音行而又沒在 kanaRowData，就放空

        const src = (kanaData.basic && Array.isArray(kanaData.basic[type]))
            ? kanaData.basic[type]
            : [];

        const vowels = new Set(['a', 'i', 'u', 'e', 'o']);
        return src.filter(([_, romaji]) => {
            if (!romaji) return false;
            if (initial === '') return vowels.has(romaji);                    // a-row：a/i/u/e/o
            return romaji.startsWith(initial) && vowels.has(romaji.slice(-1)); // 其餘：ka/sa/… + 母音
        });
    }

    function startQuiz() {
        console.log("startQuiz called");
        
        try {
            // Clean up previous practice state
            const existingQuizArea = document.getElementById("quiz-area");
            if (existingQuizArea) {
                existingQuizArea.style.display = "none";
            }
            const inlineQuiz = document.getElementById("inline-quiz");
            if (inlineQuiz) {
                inlineQuiz.remove();
            }
            const existingQuizHeader = document.getElementById("quiz-header");
            if (existingQuizHeader) {
                existingQuizHeader.remove();
            }
            
            const kanaTypeEl = document.querySelector('input[name="kana-type"]:checked');
            if (!kanaTypeEl) {
                console.log("No kana type selected");
                return;
            }
            
            const kanaType = kanaTypeEl.value;
            // Security improvement: validate kanaType value
            if (!['hiragana', 'katakana', 'mixed'].includes(kanaType)) {
                console.error("Invalid kana type:", kanaType);
                return;
            }
            
            // 檢查練習模式
            const practiceModeEl = document.querySelector('input[name="practice-mode"]:checked');
            const practiceMode = practiceModeEl ? practiceModeEl.value : 'quick';
            console.log("Practice mode:", practiceMode);

            let kanaList = [];
            let maxQuestions = 0;

            if (practiceMode === 'quick') {
                // 快速模式：根據選中的範圍
                const quickQuestionCount = parseInt(document.getElementById('quick-question-count').value);
                const quickRanges = Array.from(document.querySelectorAll('input[name="quick-range"]:checked')).map(cb => cb.value);
                
                if (quickRanges.length === 0) {
                    alert(t('practice.selectRangeAlert'));
                    return;
                }
                
                // 根據選中的範圍添加假名
                quickRanges.forEach(category => {
                    if (kanaData[category]) {
                        if (kanaType === 'mixed') {
                            if (kanaData[category].hiragana) kanaList.push(...kanaData[category].hiragana);
                            if (kanaData[category].katakana) kanaList.push(...kanaData[category].katakana);
                        } else {
                            if (kanaData[category][kanaType]) kanaList.push(...kanaData[category][kanaType]);
                        }
                    }
                });
                
                maxQuestions = quickQuestionCount;
                console.log("Quick mode: generating", quickQuestionCount, "questions from", kanaList.length, "available kana in ranges:", quickRanges);
                
            } else if (practiceMode === 'custom') {
                // 自訂模式：根據勾選的行
                const selectedRows = Array.from(document.querySelectorAll('input[name="kana-row"]:checked')).map(cb => cb.value);
                console.log("Custom mode - selectedRows:", selectedRows);
                
                // 同步選擇狀態到 state
                if (window.practiceModule?.setSelection && selectedRows.length > 0) {
                    window.practiceModule.setSelection({ rows: selectedRows, ranges: [] });
                    console.log("Synced selection to state:", selectedRows);
                }
                
                // 同步練習模式到 state
                if (window.practiceModule?.setPracticeConfig) {
                    window.practiceModule.setPracticeConfig({ mode: 'custom' });
                    console.log("Synced practice mode to state: custom");
                }
                
                if (selectedRows.length === 0) {
                    console.warn("No rows selected for custom practice");
                    // 添加更詳細的錯誤提示
                    const errorMessage = (__i18nRef?.t ? __i18nRef.t('practice.selectRowAlert') : '請先勾選至少一行') + '\n\n' + 
                        '請在自訂練習區域中勾選至少一個假名行（如：あ行、か行等）';
                    alert(errorMessage);
                    
                    // 高亮顯示自訂練習選項區域
                    const customModeOptions = document.getElementById('custom-mode-options');
                    if (customModeOptions) {
                        customModeOptions.style.border = '2px solid #e74c3c';
                        customModeOptions.style.borderRadius = '8px';
                        setTimeout(() => {
                            customModeOptions.style.border = '';
                            customModeOptions.style.borderRadius = '';
                        }, 3000);
                    }
                    return;
                }

                selectedRows.forEach(rowKey => {
                    console.log(`Processing row: ${rowKey}`);
                    if (kanaType === 'mixed') {
                        const hiraganaData = pickRowFromKanaData(rowKey, 'hiragana');
                        const katakanaData = pickRowFromKanaData(rowKey, 'katakana');
                        console.log(`Adding ${hiraganaData.length} hiragana + ${katakanaData.length} katakana characters from ${rowKey}`);
                        kanaList.push(...hiraganaData);
                        kanaList.push(...katakanaData);
                    } else {
                        const rowData = pickRowFromKanaData(rowKey, kanaType);
                        console.log(`Adding ${rowData.length} ${kanaType} characters from ${rowKey}`);
                        kanaList.push(...rowData);
                    }
                });
                
                if (kanaList.length === 0) {
                    alert(__i18nRef?.t ? __i18nRef.t('practice.noKanaInSelection') : '所選行沒有可用的假名');
                    return;
                }
                
                maxQuestions = kanaList.length; // 自訂模式使用所選字符的總數作為最大題數
                console.log("Custom mode: using all", kanaList.length, "selected kana characters");
            }

            if (kanaList.length === 0) {
                alert(__i18nRef?.t ? __i18nRef.t('practice.noKanaInSelection') : '所選行沒有可用的假名');
                // 可視化提醒：把自訂區塊框起來 3 秒
                const box = document.getElementById('custom-mode-options');
                if (box) {
                    box.style.border = '2px solid #e74c3c';
                    box.style.borderRadius = '8px';
                    setTimeout(() => { box.style.border = ''; box.style.borderRadius = ''; }, 3000);
                }
                return;
            }

            // 打亂題目順序
            selected = shuffle(kanaList);
            
            // 限制題目數量
            if (maxQuestions > 0 && selected.length > maxQuestions) {
                selected = selected.slice(0, maxQuestions);
            }
            
            current = 0;
            score = 0;
            total = selected.length;
            
            // Start practice session record for logged-in users
            if (currentUser) {
                // 準備傳遞給後端的參數
                const sessionCategories = practiceMode === 'quick' ? 
                    Array.from(document.querySelectorAll('input[name="quick-range"]:checked')).map(cb => cb.value) :
                    Array.from(document.querySelectorAll('input[name="kana-row"]:checked')).map(cb => cb.getAttribute('data-category') || cb.value);
                
                startPracticeSession(kanaType, sessionCategories, practiceMode, maxQuestions);
            }
            
            // Enter practice mode - hide main menu content, show practice content
            const practiceTab = document.getElementById("practice-tab");
            const chartTab = document.getElementById("chart-tab");
            const navTabs = document.querySelector(".nav-tabs");
            const languageSelect = document.querySelector('div[style*="margin-bottom: 20px"]');
            
            console.log("Hiding menu elements...");
            
            // 隱藏練習選項
            togglePracticeOptions(false);
            
            // 隱藏導航和其他界面元素
            if (navTabs) {
                navTabs.style.display = "none";
                console.log("Nav tabs hidden");
            }
            if (chartTab) {
                chartTab.style.display = "none";
                console.log("Chart tab hidden");
            }
            if (languageSelect) {
                languageSelect.style.display = "none";
                console.log("Language select hidden");
            }
            
            if (practiceTab) {
                // Create practice page top navigation
                let quizHeader = document.createElement("div");
                quizHeader.id = "quiz-header";
                quizHeader.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding: 15px; background: rgba(255,255,255,0.9); border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);";
                
                const backButton = document.createElement("button");
                backButton.innerHTML = "← " + t('practice.backBtn');
                backButton.style.cssText = "background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;";
                backButton.onclick = returnToMenu;
                
                const title = document.createElement("h2");
                title.style.cssText = "margin: 0; color: #2c3e50;";
                title.innerText = t('practice.title');
                
                // Add language selector to practice mode header
                const languageContainer = document.createElement("div");
                languageContainer.style.cssText = "display: flex; align-items: center; gap: 8px;";
                
                const langLabel = document.createElement("label");
                langLabel.textContent = "🌐";
                langLabel.style.cssText = "font-size: 14px; color: #666;";
                
                const langSelect = document.createElement("select");
                langSelect.id = "practice-language";
                langSelect.style.cssText = "padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;";
                
                // Add language options
                const zhOption = document.createElement("option");
                zhOption.value = "zh";
                zhOption.textContent = (__i18nRef?.getCurrentLanguage?.() || 'zh') === 'en' ? 'Chinese' : '中文';
                const enOption = document.createElement("option");
                enOption.value = "en";
                enOption.textContent = "English";
                
                langSelect.appendChild(zhOption);
                langSelect.appendChild(enOption);
                langSelect.value = __i18nRef?.getCurrentLanguage?.() || 'zh';
                
                // Add event listener for language change
                langSelect.addEventListener('change', async function() {
                    await __i18nRef?.changeLanguage?.(this.value);
                    syncAllLanguageSelectors();
                    
                    // Update practice mode texts immediately
                    updatePracticeModeTexts();
                });
                
                languageContainer.appendChild(langLabel);
                languageContainer.appendChild(langSelect);
                
                quizHeader.appendChild(backButton);
                quizHeader.appendChild(title);
                quizHeader.appendChild(languageContainer);
                
                practiceTab.insertBefore(quizHeader, practiceTab.firstChild);
                console.log("Quiz header created");
            }
            
            // Force display quiz content
            console.log("Force showing quiz content...");
            
            // Directly display quiz area here
            const quizArea = document.getElementById("quiz-area");
            console.log("Direct quiz area check:", quizArea);
            
            if (quizArea) {
                quizArea.style.display = "block";
                quizArea.style.visibility = "visible";
                quizArea.style.opacity = "1";
                quizArea.style.position = "relative";
                quizArea.style.zIndex = "1000";
                quizArea.style.backgroundColor = "rgba(255,255,255,0.95)";
                quizArea.style.padding = "20px";
                quizArea.style.borderRadius = "10px";
                quizArea.style.marginTop = "20px";
                console.log("Quiz area shown directly with enhanced styles");
            } else {
                console.log("Quiz area NOT found - creating inline");
                // Directly create quiz content - use secure DOM API
                const practiceTab = document.getElementById("practice-tab");
                if (practiceTab) {
                    const inlineQuiz = document.createElement("div");
                    inlineQuiz.id = "inline-quiz";
                    
                    // 使用安全的 DOM API 而不是 innerHTML
                    const kanaDiv = document.createElement("div");
                    kanaDiv.id = "kana";
                    kanaDiv.style.cssText = "font-size: 72px; margin: 20px; color: #2c3e50; text-align: center;";
                    
                    const containerDiv = document.createElement("div");
                    containerDiv.style.cssText = "text-align: center; margin: 20px;";
                    
                    const answerInput = document.createElement("input");
                    answerInput.id = "answer";
                    answerInput.placeholder = t('practice.enterRomaji');
                    answerInput.style.cssText = "padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; margin: 5px;";
                    // 不要在這裡加事件監聽
                    
                    const submitBtn = document.createElement("button");
                    submitBtn.id = "submit-btn";
                    submitBtn.textContent = t('practice.submitAnswer');
                    submitBtn.style.cssText = "padding: 12px 24px; font-size: 16px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;";
                    // 不要在這裡加事件監聽
                    
                    const feedbackDiv = document.createElement("div");
                    feedbackDiv.id = "feedback";
                    feedbackDiv.style.cssText = "font-size: 18px; margin: 20px; font-weight: 500;";
                    
                    const img = document.createElement("img");
                    img.src = "kabo-seed.gif";
                    img.alt = "Kabo Seed GIF";
                    img.style.cssText = "width:300px; height:auto; margin-top: 20px;";
                    
                    // 組裝 DOM 結構
                    containerDiv.appendChild(answerInput);
                    containerDiv.appendChild(document.createElement("br"));
                    containerDiv.appendChild(document.createElement("br"));
                    containerDiv.appendChild(submitBtn);
                    containerDiv.appendChild(feedbackDiv);
                    containerDiv.appendChild(img);
                    
                    inlineQuiz.appendChild(kanaDiv);
                    inlineQuiz.appendChild(containerDiv);
                    
                    practiceTab.appendChild(inlineQuiz);
                    console.log("Inline quiz created using safe DOM API");
                    
                    // 重新設置事件監聽器（因為新創建的元素）
                    setupQuizEventListeners();
                }
            }
            
            const totalNumEl = document.getElementById("total-num");
            if (totalNumEl) {
                totalNumEl.innerText = total;
                console.log("Total number set to:", total);
            }
            
            console.log("Calling updateStats...");
            updateStats();
            console.log("Calling nextQuestion...");
            nextQuestion();
            console.log("Quiz started successfully");
            showQuizContent();
        } catch (error) {
            console.error("Error in startQuiz:", error);
            alert(t('common.error'));
        }
    }
    
    // 將 startQuiz 函數暴露到全局範圍
    window.startQuiz = startQuiz;

    // 通用函數：隱藏/顯示練習選項
    function togglePracticeOptions(show = true) {
        const practiceTab = document.getElementById("practice-tab");
        if (!practiceTab) return;

        // 基本選項元素
        const basicElements = [
            practiceTab.querySelector(".checkbox-grid"),
            practiceTab.querySelector(".mode-select"),
            practiceTab.querySelector(".practice-mode-select"),
            document.getElementById("quick-mode-options"),
            document.getElementById("custom-mode-options"),
            document.getElementById("start-btn"),
            practiceTab.querySelector(".practice-options"),
            practiceTab.querySelector(".practice-settings")
        ];

        // 自訂練習相關元素
        const customSelectors = [
            '.quick-selection',
            '.row-selection',
            '.selection-summary',
            '.category-section',
            '.row-grid'
        ];

        // 處理基本元素
        basicElements.forEach(element => {
            if (element) {
                element.style.display = show ? "" : "none";
            }
        });

        // 處理自訂練習元素
        customSelectors.forEach(selector => {
            const elements = practiceTab.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = show ? "" : "none";
            });
        });

        // 如果是顯示模式，需要根據當前練習模式決定顯示哪些選項
        if (show) {
            const practiceMode = document.querySelector('input[name="practice-mode"]:checked');
            if (practiceMode) {
                handlePracticeModeChange();
            }
        }

        console.log(`Practice options ${show ? 'shown' : 'hidden'}`);
    }

    function showQuizContent() {
        // Ensure all practice-related elements are displayed
        const elementsToShow = [
            "progress", "current-num", "total-num", "score-num", "accuracy",
            "stat-current", "stat-total", "stat-score", "stat-accuracy",
            "kana", "answer", "submit-btn", "feedback"
        ];
        
        elementsToShow.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = "";
            }
        });
        
        // 確保進度條容器顯示
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) progressBar.style.display = "block";
        
        // 確保統計區域顯示
        const stats = document.querySelector(".stats");
        if (stats) stats.style.display = "flex";
        
        // 確保測驗容器顯示
        const quizContainer = document.querySelector(".quiz-container");
        if (quizContainer) quizContainer.style.display = "flex";
        
        // 確保咖波種子顯示
        const kaboImg = document.querySelector('img[alt="Kabo Seed GIF"]');
        if (kaboImg) {
            kaboImg.style.display = "block";
        }
        
        // 更新所有練習元素的文字
        updatePracticeModeTexts(false); // 普通練習模式
    }

    function returnToMenu() {
        console.log("Returning to menu...");
        
        // Return to main menu - show main menu content, hide practice content
        const practiceTab = document.getElementById("practice-tab");
        const chartTab = document.getElementById("chart-tab");
        const navTabs = document.querySelector(".nav-tabs");
        const languageSelect = document.querySelector('div[style*="margin-bottom: 20px"]');
        const quizHeader = document.getElementById("quiz-header");
        
        // 顯示練習選項
        togglePracticeOptions(true);
        
        // 恢復導航和其他界面元素
        if (navTabs) {
            navTabs.style.display = "";
            console.log("Nav tabs restored");
        }
        if (languageSelect) {
            languageSelect.style.display = "";
            console.log("Language select restored");
        }
        if (quizHeader) {
            quizHeader.style.display = "none";
            console.log("Quiz header hidden");
        }
        
        // 修正：不要直接設 display: none，讓 tab 切換時自動管理
        if (chartTab) {
            chartTab.classList.remove('active');
            console.log("Chart tab reset (remove active class)");
        }
        
        // 隱藏測驗內容
        hideQuizContent();
        
        console.log("Returned to main menu");
    }

    function hideQuizContent() {
        // 隱藏 quiz-area
        const quizArea = document.getElementById("quiz-area");
        if (quizArea) quizArea.style.display = "none";

        // 隱藏進度條容器
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) progressBar.style.display = "none";
        
        // 隱藏統計區域
        const stats = document.querySelector(".stats");
        if (stats) stats.style.display = "none";
        
        // 隱藏測驗容器
        const quizContainer = document.querySelector(".quiz-container");
        if (quizContainer) quizContainer.style.display = "none";
        
        // 隱藏假名顯示
        const kanaEl = document.getElementById("kana");
        if (kanaEl) kanaEl.innerText = "";
        
        // 隱藏咖波種子
        const kaboImg = document.querySelector('img[alt="Kabo Seed GIF"]');
        if (kaboImg) {
            kaboImg.style.display = "none";
        }
        
        // 清除反饋
        const feedbackEl = document.getElementById("feedback");
        if (feedbackEl) feedbackEl.innerText = "";
    }

    function updateStats() {
        const currentEl = document.getElementById("current-num");
        const scoreEl = document.getElementById("score-num");
        const accuracyEl = document.getElementById("accuracy");
        const progressEl = document.getElementById("progress");
        
        if (currentEl) currentEl.innerText = current + 1;
        if (scoreEl) scoreEl.innerText = score;
        if (accuracyEl) accuracyEl.innerText = current > 0 ? Math.round(score / current * 100) + "%" : "0%";
        
        if (progressEl) {
            const progress = ((current) / total) * 100;
            progressEl.style.width = progress + "%";
        }
    }

    function nextQuestion() {
        console.log("nextQuestion called, current:", current, "total:", total);
        
        const kanaEl = document.getElementById("kana");
        const answerEl = document.getElementById("answer");
        const submitBtnEl = document.getElementById("submit-btn");
        const feedbackEl = document.getElementById("feedback");
        
        console.log("Kana element:", kanaEl);
        console.log("Answer element:", answerEl);
        
        if (current >= selected.length) {
            // 為登入用戶完成練習記錄
            if (currentUser && currentSessionId) {
                completePracticeSession(score, total);
            }
            
            if (kanaEl) {
                let finalMessage;
                
                // 檢查是否為錯題複習模式
                const isReviewMode = currentSessionId === null && document.getElementById('review-language');
                
                if (isReviewMode) {
                    finalMessage = `🔄 ${t('practice.reviewMode')} ${t('practice.practiceComplete')}！\n${t('common.score')}：${score} / ${total} (${Math.round(score/total*100)}%)`;
                } else {
                    finalMessage = `🌟 ${t('practice.practiceComplete')}！${t('common.score')}：${score} / ${total} (${Math.round(score/total*100)}%)`;
                }
                
                // 如果用戶未登入，添加警告訊息（但錯題複習模式不需要）
                if (!currentUser && !isReviewMode) {
                    finalMessage += `\n\n⚠️ ${t('app.guestWarning')}\n${t('common.loginToTrack')}`;
                }
                
                kanaEl.innerText = finalMessage;
                console.log(isReviewMode ? "Review mode completed" : "Practice completed");
            }
            if (answerEl) answerEl.style.display = "none";
            if (submitBtnEl) submitBtnEl.style.display = "none";
            if (feedbackEl) feedbackEl.innerText = "";
            
            // 如果用戶未登入，在反饋區域顯示登入提示
            if (!currentUser && feedbackEl) {
                feedbackEl.innerHTML = `<div style="background: rgba(255, 193, 7, 0.1); border: 1px solid #ffc107; border-radius: 6px; padding: 15px; margin-top: 20px;"><div style="color: #856404; font-weight: 500; margin-bottom: 10px;">${t('common.saveRecordsPrompt')}</div><div style="color: #856404; font-size: 14px; margin-bottom: 15px;">${t('common.registerPrompt')}</div><button onclick="showAuthScreen()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">${t('common.registerNow')}</button></div>`;
            }
            return;
        }
        
        if (kanaEl) {
            kanaEl.innerText = selected[current][0];
            questionStartTime = Date.now(); // 記錄本題開始時間
            console.log("Current kana set to:", selected[current][0]);
        }
        if (answerEl) {
            answerEl.value = "";
            answerEl.style.display = "inline";
            setTimeout(() => answerEl.focus(), 100);
            console.log("Answer input reset and focused");
        }
        if (submitBtnEl) submitBtnEl.style.display = "inline";
        if (feedbackEl) feedbackEl.innerText = "";
        
        updateStats();
    }

    function checkAnswer() {
        const answerEl = document.getElementById("answer");
        const feedbackEl = document.getElementById("feedback");
        
        if (!answerEl || !feedbackEl) return;
        
        // 安全性改進：輸入驗證與清理
        let user = answerEl.value.trim().toLowerCase();
        
        // 防止 XSS 攻擊：移除危險字符
        user = user.replace(/[<>\"'&]/g, '');
        
        // 限制輸入長度
        if (user.length > 50) {
            user = user.substring(0, 50);
        }
        
        // 只允許字母、數字和基本符號
        if (!/^[a-zA-Z0-9\s\/\-]+$/.test(user)) {
            feedbackEl.innerText = "⚠️ " + t('practice.enterRomaji');
            feedbackEl.style.color = "#e74c3c";
            return;
        }
        
        const char = selected[current][0];
        const correctAnswers = selected[current][1];
        const questionStartTime = Date.now(); // 記錄答題開始時間
        
        // 處理多種讀音的情況
        let acceptableAnswers = [];
        if (correctAnswers.includes('/')) {
            acceptableAnswers = correctAnswers.split('/');
        } else {
            acceptableAnswers = [correctAnswers];
        }
        
        // 特殊情況處理
        if (char === "を" || char === "ヲ") {
            acceptableAnswers = ["wo", "o"];
        }
        if (char === "ぢ" || char === "ヂ") {
            acceptableAnswers = ["di", "ji"];
        }
        if (char === "づ" || char === "ヅ") {
            acceptableAnswers = ["du", "zu"];
        }
        if (char === "じ" || char === "ジ") {
            acceptableAnswers = ["ji", "zi"];
        }
        
        const isCorrect = acceptableAnswers.includes(user);
        
        if (isCorrect) {
            feedbackEl.innerText = t('common.correct');
            feedbackEl.style.color = "#27ae60";
            score++;
        } else {
            const answerDisplay = acceptableAnswers.length > 1 ? 
                acceptableAnswers.join(' / ') : acceptableAnswers[0];
            feedbackEl.innerText = `❌ ${t('common.incorrect')}, ${t('sessionDetail.correct')}: ${answerDisplay}`;
            feedbackEl.style.color = "#e74c3c";
        }
        
        // 為登入用戶記錄答題
        if (currentUser) {
            const responseTime = questionStartTime ? Date.now() - questionStartTime : 0;
            recordAnswerWithTime(char, user, correctAnswers, isCorrect, responseTime);
        }
        
        current++;
        setTimeout(nextQuestion, 1500);
    }

    function updateChart() {
        console.log("updateChart called");
        
        const chartType = document.querySelector('input[name="chart-type"]:checked');
        if (!chartType) {
            console.log("No chart type selected, defaulting to hiragana");
            // 如果找不到選中的類型，默認為平假名
            const hiraganaRadio = document.querySelector('input[name="chart-type"][value="hiragana"]');
            if (hiraganaRadio) hiraganaRadio.checked = true;
        }
        
        const selectedType = chartType ? chartType.value : 'hiragana';
        console.log("Chart type:", selectedType);
        
        const chartContainer = document.getElementById("kana-chart");
        console.log("Chart container:", chartContainer);
        
        if (!chartContainer) {
            console.log("Chart container not found!");
            return;
        }
        
        let html = "";
        
        // 基本音表
        html += `<h3>${t('kana.categories.basic')}</h3>`;
        html += createChartTable(chartData.basic, selectedType);
        
        // 濁音表
        html += `<h3>${t('kana.categories.dakuten')}</h3>`;
        html += createChartTable(chartData.dakuten, selectedType);
        
        // 半濁音表
        html += `<h3>${t('kana.categories.handakuten')}</h3>`;
        html += createChartTable(chartData.handakuten, selectedType);
        
        // 拗音表
        html += `<h3>${t('kana.categories.youon')}</h3>`;
        html += createYouonTable(selectedType);
        
        console.log("Generated HTML length:", html.length);
        console.log("HTML preview:", html.substring(0, 200) + "...");
        
        // 安全性改進：使用 textContent 而不是 innerHTML（如果可能）
        // 由於這裡需要 HTML 格式，我們確保內容是安全的
        chartContainer.innerHTML = html;
        console.log("Chart container updated");
    }

    function createChartTable(data, type) {
        console.log("createChartTable called with type:", type);
        console.log("Data:", data);
        
        let html = '<table class="chart-table" style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">';
        
        data.forEach((row, index) => {
            html += '<tr>';
            row.forEach((cell, cellIndex) => {
                const cellStyle = index === 0 ? 
                    'style="padding: 12px; text-align: center; border: 1px solid #e9ecef; background: #667eea; color: white; font-weight: 600;"' :
                    'style="padding: 12px; text-align: center; border: 1px solid #e9ecef; font-size: 18px;"';
                
                if (index === 0) {
                    html += `<th ${cellStyle}>${cell}</th>`;
                } else {
                    if (cellIndex === 0) {
                        html += `<th ${cellStyle}>${cell}</th>`;
                    } else {
                        if (cell === "") {
                            html += '<td style="padding: 12px; text-align: center; border: 1px solid #e9ecef;"></td>';
                        } else {
                            // 檢查是否包含括號（多種讀音）
                            if (cell.includes('(')) {
                                // 有括號的情況，直接顯示
                                const kanaChars = cell.split(' (')[0].split('/');
                                const displayChar = type === 'hiragana' ? kanaChars[0] : kanaChars[1];
                                const romajiPart = cell.split(' (')[1].replace(')', '');
                                html += `<td style="padding: 12px; text-align: center; border: 1px solid #e9ecef;">
                                    <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${displayChar}</div>
                                    <div style="font-size: 14px; color: #666; font-family: monospace;">${romajiPart}</div>
                                </td>`;
                            } else {
                                // 普通情況，查找羅馬字
                                const kanaChars = cell.split('/');
                                const displayChar = type === 'hiragana' ? kanaChars[0] : kanaChars[1];
                                const romaji = getRomajiForKana(displayChar);
                                html += `<td style="padding: 12px; text-align: center; border: 1px solid #e9ecef;">
                                    <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${displayChar}</div>
                                    <div style="font-size: 14px; color: #666; font-family: monospace;">${romaji}</div>
                                </td>`;
                            }
                        }
                    }
                }
            });
            html += '</tr>';
        });
        
        html += '</table>';
        console.log("Generated table HTML length:", html.length);
        return html;
    }

    function createYouonTable(type) {
        const youonGroups = [
            {name: "きゃ行", kana: ["きゃ/キャ", "きゅ/キュ", "きょ/キョ"], romaji: ["kya", "kyu", "kyo"]},
            {name: "しゃ行", kana: ["しゃ/シャ", "しゅ/シュ", "しょ/ショ"], romaji: ["sha", "shu", "sho"]},
            {name: "ちゃ行", kana: ["ちゃ/チャ", "ちゅ/チュ", "ちょ/チョ"], romaji: ["cha", "chu", "cho"]},
            {name: "にゃ行", kana: ["にゃ/ニャ", "にゅ/ニュ", "にょ/ニョ"], romaji: ["nya", "nyu", "nyo"]},
            {name: "ひゃ行", kana: ["ひゃ/ヒャ", "ひゅ/ヒュ", "ひょ/ヒョ"], romaji: ["hya", "hyu", "hyo"]},
            {name: "みゃ行", kana: ["みゃ/ミャ", "みゅ/ミュ", "みょ/ミョ"], romaji: ["mya", "myu", "myo"]},
            {name: "りゃ行", kana: ["りゃ/リャ", "りゅ/リュ", "りょ/リョ"], romaji: ["rya", "ryu", "ryo"]},
            {name: "ぎゃ行", kana: ["ぎゃ/ギャ", "ぎゅ/ギュ", "ぎょ/ギョ"], romaji: ["gya", "gyu", "gyo"]},
            {name: "じゃ行", kana: ["じゃ/ジャ", "じゅ/ジュ", "じょ/ジョ"], romaji: ["ja", "ju", "jo"]},
            {name: "びゃ行", kana: ["びゃ/ビャ", "びゅ/ビュ", "びょ/ビョ"], romaji: ["bya", "byu", "byo"]},
            {name: "ぴゃ行", kana: ["ぴゃ/ピャ", "ぴゅ/ピュ", "ぴょ/ピョ"], romaji: ["pya", "pyu", "pyo"]}
        ];

        let html = '<table class="chart-table">';
        html += `<tr><th>${t('chart.tableRow')}</th><th>${t('chart.yaColumn')}</th><th>${t('chart.yuColumn')}</th><th>${t('chart.yoColumn')}</th></tr>`;
        
        youonGroups.forEach(group => {
            html += '<tr>';
            html += `<th>${group.name}</th>`;
            group.kana.forEach((kana, index) => {
                const kanaChars = kana.split('/');
                const displayChar = type === 'hiragana' ? kanaChars[0] : kanaChars[1];
                html += `<td>
                    <div class="kana-char">${displayChar}</div>
                    <div class="romaji">${group.romaji[index]}</div>
                </td>`;
            });
            html += '</tr>';
        });
        
        html += '</table>';
        return html;
    }

    function getRomajiForKana(kana) {
        // 查找假名對應的羅馬字
        for (const category in kanaData) {
            for (const type in kanaData[category]) {
                const found = kanaData[category][type].find(item => item[0] === kana);
                if (found) return found[1];
            }
        }
        return "";
    }

    // API 基礎設定 - 動態偵測環境
    let API_BASE_URL = '/api'; // 預設值
    
    // 動態設定 API 基礎 URL
    function setApiBaseUrl() {
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
            // 本地開發環境
            API_BASE_URL = 'http://localhost:8001/api';
        } else if (hostname === 'www.japanese50sounds.com' || hostname === 'japanese50sounds.com') {
            // 生產環境
            API_BASE_URL = 'https://www.japanese50sounds.com/api';
        } else {
            // VM 或其他環境 - 使用相對路徑
            API_BASE_URL = '/api';
        }
        
        console.log(`🌐 [API Config] 偵測到環境: ${hostname}`);
        console.log(`🌐 [API Config] 設定 API Base URL: ${API_BASE_URL}`);
    }
    
    // 初始化時設定 API URL
    setApiBaseUrl();
    let currentUser = null;
    let authToken = null;
    
    // Learning record related variables
    let currentSessionId = null;
    let sessionStartTime = null;

    // Password show/hide functionality
    function togglePassword(inputId) {
        const input = document.getElementById(inputId);
        const toggleButton = input.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggleButton.textContent = '🙈'; // 猴子遮眼的 emoji
        } else {
            input.type = 'password';
            toggleButton.textContent = '👁'; // 眼睛 emoji
        }
    }
    
    // Password validation functionality
    function validatePassword() {
        const password = document.getElementById('register-password').value;
        
        // 長度要求
        const lengthReq = document.getElementById('req-length');
        const lengthMet = password.length >= 8;
        updateRequirement(lengthReq, lengthMet);
        
        // 英文字母要求
        const letterReq = document.getElementById('req-letter');
        const letterMet = /[a-zA-Z]/.test(password);
        updateRequirement(letterReq, letterMet);
        
        // 數字要求
        const numberReq = document.getElementById('req-number');
        const numberMet = /[0-9]/.test(password);
        updateRequirement(numberReq, numberMet);
        
        return lengthMet && letterMet && numberMet;
    }
    
    function updateRequirement(element, isMet) {
        const icon = element.querySelector('.icon');
        if (isMet) {
            element.className = 'password-requirement requirement-met';
            icon.textContent = '✓';
        } else {
            element.className = 'password-requirement requirement-not-met';
            icon.textContent = '❌';
        }
    }

    // Authentication related functions
    async function apiCall(endpoint, method = 'GET', data = null, options = {}) {
        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        if (data) {
            config.body = JSON.stringify(data);
        }
        
        // 支援 AbortController
        if (options.signal) {
            config.signal = options.signal;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            
            // 如果是健康檢查且返回 404，靜默處理
            if (endpoint === '/' && response.status === 404) {
                console.log('API health check skipped (endpoint not available)');
                return { success: true, message: 'Health check skipped' };
            }
            
            const result = await response.json();
            
            if (!response.ok) {
                console.error('API Error Details:', result);
                // Handle Django-style error responses
                if (result.errors) {
                    const errorMessages = [];
                    for (const field in result.errors) {
                        errorMessages.push(...result.errors[field]);
                    }
                    throw new Error(errorMessages.join("\n") || `HTTP error! status: ${response.status}`);
                }
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }
            
            return result;
        } catch (error) {
            // 不記錄 AbortError，因為這是正常的取消操作
            if (error.name !== 'AbortError') {
                console.error('API call failed:', error);
                console.error('Request URL:', `${API_BASE_URL}${endpoint}`);
                console.error('Request config:', config);
            }
            throw error;
        }
    }
    
    // 暴露 apiCall 到全域供模組使用
    window.apiCall = apiCall;
    
    // Learning record API functions
    async function startPracticeSession(sessionType, categories, practiceMode, maxQuestions) {
        if (!currentUser || !authToken) {
            console.log('User not logged in, not recording learning data');
            return null;
        }
        
        console.log('Starting practice session:', { sessionType, categories, practiceMode, maxQuestions });
        
        try {
            const response = await apiCall('/practice/sessions/start/', 'POST', {
                session_type: sessionType,
                categories: categories,
                practice_mode: practiceMode || 'quick',
                max_questions: maxQuestions || 10
            });
            
            if (response.success) {
                currentSessionId = response.session_id;
                sessionStartTime = new Date();
                console.log('Practice session started:', currentSessionId);
                return response.session_id;
            }
        } catch (error) {
            console.error('Failed to start practice session:', error);
        }
        return null;
    }
    
    async function recordAnswerWithTime(questionKana, userAnswer, correctRomaji, isCorrect, responseTime) {
        if (!currentUser || !authToken || !currentSessionId) {
            return;
        }
        
        try {
            await apiCall('/practice/answers/', 'POST', {
                session_id: currentSessionId,
                question_kana: questionKana,
                user_answer: userAnswer,
                correct_romaji: correctRomaji,
                response_time_ms: responseTime
            });
            console.log('Answer recorded:', questionKana, userAnswer, isCorrect);
        } catch (error) {
            console.error('Failed to record answer:', error);
        }
    }
    
    async function completePracticeSession(finalScore, totalQuestions) {
        console.log('completePracticeSession called:', { 
            finalScore, 
            totalQuestions, 
            hasUser: !!currentUser, 
            hasToken: !!authToken, 
            hasSessionId: !!currentSessionId,
            sessionId: currentSessionId
        });
        
        if (!currentUser || !authToken || !currentSessionId) {
            console.warn('completePracticeSession skipped - missing requirements:', {
                currentUser: !!currentUser,
                authToken: !!authToken, 
                currentSessionId: !!currentSessionId
            });
            return;
        }
        
        try {
            const endTime = new Date();
            const durationSeconds = Math.round((endTime - sessionStartTime) / 1000);
            const accuracyRate = Math.round((finalScore / totalQuestions) * 100);
            
            const response = await apiCall(`/practice/sessions/${currentSessionId}/complete/`, 'POST', {
                total_questions: totalQuestions,
                correct_answers: finalScore,
                accuracy_rate: accuracyRate,
                duration_seconds: durationSeconds
            });
            
            if (response.success) {
                console.log('Practice session completed');
            }
            
            // Clear current session
            currentSessionId = null;
            sessionStartTime = null;
            
        } catch (error) {
            console.error('Failed to complete practice session:', error);
        }
    }
    
    async function getLearningStatistics() {
        if (!currentUser || !authToken) {
            return null;
        }
        
        try {
            const response = await apiCall('/practice/statistics/', 'GET');
            if (response.success) {
                return response;
            }
        } catch (error) {
            console.error('Failed to load learning statistics:', error);
        }
        return null;
    }
    
    // loadStatistics function removed - now handled by statistics module
    async function loadStatistics() {
        console.warn('[DEPRECATED] loadStatistics() called directly. Statistics module handles loading automatically.');
        return; // Prevent execution - statistics module handles this
        
        const loadingEl = document.getElementById('statistics-loading');
        const contentEl = document.getElementById('statistics-content');
        
        if (loadingEl) {
            loadingEl.style.display = 'block';
            loadingEl.textContent = t('common.loading');
        }
        if (contentEl) contentEl.style.display = 'none';
        
        if (!currentUser || !authToken) {
            console.log('No user or token, showing login message');
            if (loadingEl) loadingEl.textContent = t('stats.loginRequired');
            return;
        }
        
        const stats = await getLearningStatistics();
        console.log('Statistics received:', stats);
        
        if (stats) {
            // 更新總體統計
            const overall = stats.overall;
            document.getElementById('total-sessions-num').textContent = overall.total_sessions;
            document.getElementById('total-questions-num').textContent = overall.total_questions;
            document.getElementById('total-correct-num').textContent = overall.total_correct;
            document.getElementById('avg-accuracy-num').textContent = overall.avg_accuracy + '%';
            document.getElementById('total-time-num').textContent = overall.total_time_minutes;
            
            // 顯示最近練習記錄
            const recentList = document.getElementById('recent-sessions-list');
            if (recentList && stats.recent_sessions) {
                let html = '';
                stats.recent_sessions.forEach(session => {
                    const date = new Date(session.started_at).toLocaleDateString();
                    const time = new Date(session.started_at).toLocaleTimeString();
                    const sessionTypeText = translateType(session.session_type);
                    const categoriesText = session.categories.map(cat => translateType(cat)).join(', ');
                    
                    html += `<div style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 6px; cursor: pointer; transition: background 0.2s;" 
                             onclick="showSessionDetail(${session.id})" 
                             onmouseover="this.style.background='#e9ecef'" 
                             onmouseout="this.style.background='#f8f9fa'">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${sessionTypeText}</strong> - ${categoriesText}
                                <br><small>${date} ${time}</small>
                                <br><small style="color: #667eea;">${t('stats.clickForDetail')}</small>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: #667eea; font-weight: bold;">${session.accuracy_rate}%</div>
                                <small>${session.correct_answers}/${session.total_questions}</small>
                            </div>
                        </div>
                    </div>`;
                });
                recentList.innerHTML = html;
            }
            
            // 顯示各類別統計
            const categoryList = document.getElementById('category-stats-list');
            if (categoryList && stats.by_category) {
                let html = '';
                stats.by_category.forEach(category => {
                    const kanaTypeText = translateType(category.kana_type) || category.kana_type;
                    const categoryText = translateType(category.category) || category.category;
                    const timesText = t('common.times');
                    const totalPracticeText = t('stats.totalPractice');
                    
                    html += `<div style="background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${kanaTypeText}</strong> - ${categoryText}
                            <br><small>${totalPracticeText}: ${category.total_attempts} ${timesText}</small>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: #667eea; font-weight: bold;">${category.accuracy_rate}%</div>
                            <small>${category.correct_attempts}/${category.total_attempts}</small>
                        </div>
                    </div>`;
                });
                categoryList.innerHTML = html;
            }
            
            if (loadingEl) loadingEl.style.display = 'none';
            if (contentEl) contentEl.style.display = 'block';
        } else {
            if (loadingEl) loadingEl.textContent = t('stats.cannotLoad');
        }
    }
    
    // 顯示練習記錄詳情
    async function showSessionDetail(sessionId) {
        const modal = document.getElementById('session-detail-modal');
        const content = document.getElementById('session-detail-content');
        const loading = document.getElementById('session-detail-loading');
        
        if (!modal) return;
        
        modal.style.display = 'block';
        if (loading) loading.style.display = 'block';
        
        // 使用 i18next t() 函數替代舊的 texts[lang]
        
        // 更新模態視窗標題和載入文字
        const titleEl = document.getElementById('session-detail-title');
        const loadingTextEl = document.getElementById('session-detail-loading');
        
        if (titleEl) titleEl.textContent = t('sessionDetail.title');
        if (loadingTextEl) loadingTextEl.textContent = t('common.loading');
        
        try {
            const response = await apiCall(`/practice/sessions/${sessionId}/`, 'GET');
            
            if (response.success) {
                const session = response.session;
                const sessionTypeText = translateType(session.session_type);
                const categoriesText = session.categories.map(cat => translateType(cat)).join(', ');
                const startDate = new Date(session.started_at);
                const endDate = new Date(session.completed_at);
                
                const typeLabel = t('sessionDetail.practiceType');
                const rangeLabel = t('sessionDetail.practiceRange');
                const startLabel = t('sessionDetail.startTime');
                const endLabel = t('sessionDetail.endTime');
                const durationLabel = t('sessionDetail.duration');
                const resultLabel = t('sessionDetail.result');
                const recordsLabel = t('sessionDetail.answerRecords');
                const detailTitle = t('sessionDetail.title');
                const minuteText = t('common.minutes');
                
                let detailHtml = `
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${detailTitle}</h4>
                        <p><strong>${typeLabel}:</strong> ${sessionTypeText}</p>
                        <p><strong>${rangeLabel}:</strong> ${categoriesText}</p>
                        <p><strong>${startLabel}:</strong> ${startDate.toLocaleString()}</p>
                        <p><strong>${endLabel}:</strong> ${endDate.toLocaleString()}</p>
                        <p><strong>${durationLabel}:</strong> ${Math.round(session.duration_seconds / 60)} ${minuteText}</p>
                        <p><strong>${resultLabel}:</strong> ${session.correct_answers}/${session.total_questions} (${session.accuracy_rate}%)</p>
                    </div>
                    
                    <h4 style="color: #2c3e50; margin-bottom: 15px;">${recordsLabel}</h4>
                    <div style="max-height: 300px; overflow-y: auto;">
                `;
                
                // 顯示所有答題記錄
                if (session.answer_records && session.answer_records.length > 0) {
                    session.answer_records.forEach((record, index) => {
                        const isCorrect = record.is_correct;
                        const recordClass = isCorrect ? 'answer-correct' : 'answer-incorrect';
                        const icon = isCorrect ? '✓' : '✗';
                        const responseTime = (record.response_time_ms / 1000).toFixed(1);
                        
                        detailHtml += `
                            <div class="answer-record ${recordClass}">
                                <div>
                                    <span class="kana-large">${record.question_kana}</span>
                                    <span style="margin-left: 10px; color: #666;">${t('sessionDetail.correct')}: ${record.correct_romaji}</span>
                                </div>
                                <div style="text-align: right;">
                                    <div>
                                        <span style="font-weight: bold;">${icon} ${record.user_answer}</span>
                                        <span style="margin-left: 10px; font-size: 12px; color: #666;">${responseTime}s</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    
                    // 錯題複習按鈕
                    const wrongAnswers = session.answer_records.filter(record => !record.is_correct);
                    if (wrongAnswers.length > 0) {
                        detailHtml += `
                            <div style="margin-top: 20px; text-align: center;">
                                <button onclick="startReviewSession(${sessionId})" 
                                        style="background: #e74c3c; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 500;">
${t('sessionDetail.reviewWrongAnswers')} (${wrongAnswers.length} ${t('common.questions')})
                                </button>
                            </div>
                        `;
                    }
                } else {
                    detailHtml += `<p style="text-align: center; color: #666;">${t('sessionDetail.noAnswerRecords')}</p>`;
                }
                
                detailHtml += '</div>';
                
                if (loading) loading.style.display = 'none';
                if (content) content.innerHTML = detailHtml;
            }
        } catch (error) {
            console.error('Failed to load session details:', error);
            if (loading) loading.style.display = 'none';
            if (content) content.innerHTML = `<p style="color: #e74c3c; text-align: center;">${t('sessionDetail.cannotLoadDetails')}</p>`;
        }
    }
    
    // 關閉詳情模態視窗
    function closeSessionDetail() {
        document.getElementById('session-detail-modal').style.display = 'none';
    }
    
    // 錯題複習功能
    async function startReviewSession(sessionId) {
        try {
            const response = await apiCall(`/practice/sessions/${sessionId}/`, 'GET');
            
            if (response.success) {
                const session = response.session;
                const wrongAnswers = session.answer_records.filter(record => !record.is_correct);
                
                if (wrongAnswers.length > 0) {
                    // 準備錯題複習數據
                    const reviewData = wrongAnswers.map(record => [record.question_kana, record.correct_romaji]);
                    
                    // 關閉模態視窗
                    closeSessionDetail();
                    
                    // 切換到練習模式並開始錯題複習
                    showTab('practice');
                    startReviewQuiz(reviewData, session.session_type);
                }
            }
        } catch (error) {
            console.error('Wrong answer review failed:', error);
            alert(t('sessionDetail.reviewFailed'));
        }
    }
    
    // 開始錯題複習
    function startReviewQuiz(reviewData, sessionType) {
        selected = shuffle(reviewData);
        current = 0;
        score = 0;
        total = selected.length;
        
        // Wrong answer review not recorded to database, just practice
        currentSessionId = null;
        
        // Hide options area, show practice content
        const practiceTab = document.getElementById("practice-tab");
        const chartTab = document.getElementById("chart-tab");
        const navTabs = document.querySelector(".nav-tabs");
        const languageSelect = document.querySelector('div[style*="margin-bottom: 20px"]');
        
        // 隱藏練習選項
        togglePracticeOptions(false);
        
        // 隱藏導航和其他界面元素
        if (navTabs) navTabs.style.display = "none";
        if (chartTab) chartTab.style.display = "none";
        if (languageSelect) languageSelect.style.display = "none";
        
        if (practiceTab) {
            // 隱藏所有練習頁面的內容容器
            const allContainers = practiceTab.querySelectorAll("div, section");
            allContainers.forEach(container => {
                if (!container.id || (container.id !== "quiz-header" && container.id !== "inline-quiz")) {
                    container.style.display = "none";
                }
            });
            
            // Create wrong answer review title
            let quizHeader = document.createElement("div");
            quizHeader.id = "quiz-header";
            quizHeader.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding: 15px; background: rgba(255,200,200,0.9); border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 2px solid #e74c3c;";
            
            const backButton = document.createElement("button");
            backButton.innerHTML = "← " + t('practice.backBtn');
            backButton.style.cssText = "background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;";
            backButton.onclick = returnToMenu;
            
            const titleContainer = document.createElement("div");
            titleContainer.style.cssText = "text-align: center;";
            
            const title = document.createElement("h2");
            title.style.cssText = "margin: 0; color: #e74c3c; display: flex; align-items: center; gap: 8px;";
            title.innerHTML = "🔄 " + t('practice.reviewMode');
            
            const subtitle = document.createElement("div");
            subtitle.style.cssText = "font-size: 12px; color: #666; margin-top: 4px;";
            subtitle.textContent = `${total} ${t('common.questions')}`;
            
            titleContainer.appendChild(title);
            titleContainer.appendChild(subtitle);
            
            // Add language selector to review mode header
            const languageContainer = document.createElement("div");
            languageContainer.style.cssText = "display: flex; align-items: center; gap: 8px;";
            
            const langLabel = document.createElement("label");
            langLabel.textContent = "🌐";
            langLabel.style.cssText = "font-size: 14px; color: #666;";
            
            const langSelect = document.createElement("select");
            langSelect.id = "review-language";
            langSelect.style.cssText = "padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;";
            
            // Add language options
            const zhOption = document.createElement("option");
            zhOption.value = "zh";
            zhOption.textContent = __i18nRef?.getCurrentLanguage?.() === 'en' ? 'Chinese' : '中文';
            const enOption = document.createElement("option");
            enOption.value = "en";
            enOption.textContent = "English";
            
            langSelect.appendChild(zhOption);
            langSelect.appendChild(enOption);
            langSelect.value = __i18nRef?.getCurrentLanguage?.() || 'zh';
            
            // Add event listener for language change
            langSelect.addEventListener('change', async function() {
                await __i18nRef?.changeLanguage?.(this.value);
                syncAllLanguageSelectors();
                // Update review mode UI
                updateReviewModeTexts();
            });
            
            languageContainer.appendChild(langLabel);
            languageContainer.appendChild(langSelect);
            
            quizHeader.appendChild(backButton);
            quizHeader.appendChild(titleContainer);
            quizHeader.appendChild(languageContainer);
            
            practiceTab.insertBefore(quizHeader, practiceTab.firstChild);
        }
        
        // 確保測驗區域存在，如果不存在則創建
        let quizArea = document.getElementById("quiz-area");
        if (!quizArea) {
            console.log("Creating quiz area for review mode...");
            quizArea = document.createElement("div");
            quizArea.id = "quiz-area";
            quizArea.style.cssText = "display: block;";
            
            // 創建進度條
            const progressBar = document.createElement("div");
            progressBar.className = "progress-bar";
            progressBar.style.cssText = "width: 100%; height: 8px; background: #e9ecef; border-radius: 4px; margin-bottom: 20px; overflow: hidden;";
            
            const progressFill = document.createElement("div");
            progressFill.className = "progress-fill";
            progressFill.id = "progress";
            progressFill.style.cssText = "height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); width: 0%; transition: width 0.3s ease;";
            
            progressBar.appendChild(progressFill);
            
            // 創建統計區域
            const stats = document.createElement("div");
            stats.className = "stats";
            stats.style.cssText = "display: flex; justify-content: space-around; margin-bottom: 30px; background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);";
            
            const statItems = [
                { id: "current-num", labelId: "stat-current", value: "1" },
                { id: "total-num", labelId: "stat-total", value: total.toString() },
                { id: "score-num", labelId: "stat-score", value: "0" },
                { id: "accuracy", labelId: "stat-accuracy", value: "0%" }
            ];
            
            statItems.forEach(item => {
                const statItem = document.createElement("div");
                statItem.className = "stat-item";
                statItem.style.cssText = "text-align: center;";
                
                const statNumber = document.createElement("div");
                statNumber.className = "stat-number";
                statNumber.id = item.id;
                statNumber.style.cssText = "font-size: 24px; font-weight: bold; color: #2c3e50;";
                statNumber.textContent = item.value;
                
                const statLabel = document.createElement("div");
                statLabel.className = "stat-label";
                statLabel.id = item.labelId;
                statLabel.style.cssText = "font-size: 14px; color: #666;";
                
                statItem.appendChild(statNumber);
                statItem.appendChild(statLabel);
                stats.appendChild(statItem);
            });
            
            // 創建測驗容器
            const quizContainer = document.createElement("div");
            quizContainer.className = "quiz-container";
            quizContainer.style.cssText = "display: flex; flex-direction: column; align-items: center; text-align: center; background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);";
            
            // 創建假名顯示
            const kanaDiv = document.createElement("div");
            kanaDiv.className = "kana";
            kanaDiv.id = "kana";
            kanaDiv.style.cssText = "font-size: 72px; margin: 20px; color: #2c3e50; text-align: center; font-weight: bold;";
            
            // 創建答案輸入框
            const answerInput = document.createElement("input");
            answerInput.id = "answer";
            answerInput.placeholder = t('practice.enterRomaji');
            answerInput.style.cssText = "padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; margin: 10px; width: 200px; text-align: center;";
            answerInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    checkAnswer();
                }
            });
            
            // 創建提交按鈕
            const submitBtn = document.createElement("button");
            submitBtn.id = "submit-btn";
            submitBtn.textContent = t('practice.submitAnswer');
            submitBtn.style.cssText = "padding: 12px 24px; font-size: 16px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 10px;";
            submitBtn.addEventListener('click', checkAnswer);
            
            // 創建反饋區域
            const feedbackDiv = document.createElement("div");
            feedbackDiv.className = "result";
            feedbackDiv.id = "feedback";
            feedbackDiv.style.cssText = "font-size: 18px; margin: 20px; font-weight: 500; min-height: 25px;";
            
            // 創建咖波圖片
            const kaboImg = document.createElement("img");
            kaboImg.src = "kabo-seed.gif";
            kaboImg.alt = "Kabo Seed GIF";
            kaboImg.style.cssText = "width: 300px; height: auto; margin-top: 20px;";
            
            // 組裝所有元素
            quizContainer.appendChild(kanaDiv);
            quizContainer.appendChild(answerInput);
            quizContainer.appendChild(submitBtn);
            quizContainer.appendChild(feedbackDiv);
            quizContainer.appendChild(kaboImg);
            
            quizArea.appendChild(progressBar);
            quizArea.appendChild(stats);
            quizArea.appendChild(quizContainer);
            
            practiceTab.appendChild(quizArea);
            console.log("Quiz area created for review mode");
            
            // 立即更新新創建元素的文字
            updatePracticeModeTexts(true); // 錯題複習模式
        } else {
            quizArea.style.display = "block";
            console.log("Quiz area already exists, showing it");
        }
        
        const totalNumEl = document.getElementById("total-num");
        if (totalNumEl) totalNumEl.innerText = total;
        
        updateStats();
        nextQuestion();
        showQuizContent();
    }
    
    // 更新練習模式的文字（通用）
    function updatePracticeModeTexts(isReviewMode = false) {
        const quizHeader = document.getElementById('quiz-header');
        if (quizHeader) {
            const backButton = quizHeader.querySelector('button');
            const title = quizHeader.querySelector('h2');
            const subtitle = quizHeader.querySelector('div[style*="font-size: 12px"]');
            
            if (backButton) backButton.innerHTML = "← " + t('practice.backBtn');
            if (title) {
                if (isReviewMode) {
                    title.innerHTML = "🔄 " + t('practice.reviewMode');
                } else {
                    title.innerHTML = t('practice.title');
                }
            }
            if (subtitle) subtitle.textContent = `${total} ${t('common.questions')}`;
        }
        
        // 更新答案輸入框和提交按鈕
        const answerInput = document.getElementById('answer');
        const submitBtn = document.getElementById('submit-btn');
        if (answerInput) answerInput.placeholder = t('practice.enterRomaji');
        if (submitBtn) submitBtn.textContent = t('practice.submitAnswer');
        
        // 同步語言選擇器
        const reviewLanguageSelect = document.getElementById('review-language');
        if (reviewLanguageSelect) {
            reviewLanguageSelect.value = __i18nRef?.getCurrentLanguage?.() || 'zh';
        }
        
        // 更新統計標籤
        const statLabels = [
            { id: 'stat-current', key: 'practice.current' },
            { id: 'stat-total', key: 'practice.total' },
            { id: 'stat-score', key: 'practice.score' },
            { id: 'stat-accuracy', key: 'practice.accuracy' }
        ];
        
        statLabels.forEach(({id, key}) => {
            const element = document.getElementById(id);
            if (element) element.textContent = t(key);
        });
    }
    
    // 向後兼容的函數
    function updateReviewModeTexts() {
        updatePracticeModeTexts(true); // 錯題複習模式
    }

    function showMessage(elementId, message, isError = false) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.className = isError ? 'error-message' : 'success-message';
        
        // 3秒後清除訊息
        setTimeout(() => {
            element.textContent = '';
            element.className = '';
        }, 3000);
    }

    function switchAuthTab(tabName) {
        // 切換標籤活動狀態
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // 切換表單顯示
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabName}-form`).classList.add('active');
        
        // 重新繫結 i18n 文字（處理分頁切換後的文字顯示）
        getI18n().then(({ bindI18nTexts }) => {
            bindI18nTexts(document);
        }).catch(err => console.warn('Failed to rebind i18n texts:', err));
    }

    async function handleLogin(event) {
        event.preventDefault();
        
        const identifier = document.getElementById('login-identifier').value;
        const password = document.getElementById('login-password').value;
        const button = document.getElementById('login-button');
        
        button.disabled = true;
        button.textContent = t('auth.loggingIn');
        
        try {
            const response = await apiCall('/auth/login/', 'POST', {
                identifier: identifier,
                password: password
            });
            
            if (response.success) {
                authToken = response.token;
                currentUser = response.user;
                
                // 清除舊版本localStorage數據避免衝突（不再使用舊版儲存）
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                
                // 使用新的 auth 系統
                const { loginSuccess } = await getAuth();
                loginSuccess({ user: response.user, token: response.token });
                
                showAuthenticatedApp();
                showMessage('login-message', t('common.success'));
            }
        } catch (error) {
            showMessage('login-message', error.message || t('common.error'), true);
        } finally {
            button.disabled = false;
            button.textContent = t('app.login');
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const displayName = document.getElementById('register-display-name').value;
        const birthDate = document.getElementById("register-birth-date").value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        const button = document.getElementById('register-button');
        
        if (password !== passwordConfirm) {
            showMessage('register-message', t('auth.passwordMismatch'), true);
            return;
        }
        
        button.disabled = true;
        button.textContent = t('auth.registering');
        
        const preferredLanguage = document.getElementById('register-language').value;
        
        try {
            const response = await apiCall('/auth/register/', 'POST', {
                username: username,
                email: email,
                display_name: displayName,
                password: password,
                password_confirm: passwordConfirm,
                preferred_language: preferredLanguage
            });
            
            if (response.success) {
                authToken = response.token;
                currentUser = response.user;
                
                // 清除舊版本localStorage數據避免衝突（不再使用舊版儲存）
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                
                // 使用新的 auth 系統
                const { loginSuccess } = await getAuth();
                loginSuccess({ user: response.user, token: response.token });
                
                showAuthenticatedApp();
                showMessage('register-message', t('common.success'));
            }
        } catch (error) {
            const errorMessage = error.message || t('common.error');
            showMessage('register-message', errorMessage, true);
        } finally {
            button.disabled = false;
            button.textContent = t('app.register');
        }
    }

    // Google OAuth 功能
    async function initGoogleSignIn() {
        if (!isGoogleOAuthConfigured()) {
            console.log('Google OAuth not configured');
            return;
        }
        
        // 使用新的等待器進行初始化和按鈕渲染
        await updateGoogleButtonsLanguage();
    }

    // Google API 初始化狀態追踪
    let googleInitialized = false;
    
    // 等待Google API可用並初始化
    async function waitForGoogleAPIAndInitialize() {
        return new Promise((resolve) => {
            const checkGoogleAPI = () => {
                if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                    if (!googleInitialized) {
                        // 只初始化一次
                        google.accounts.id.initialize({
                            client_id: appConfig.googleClientId,
                            callback: handleGoogleLoginCallback,
                            auto_select: false,
                            cancel_on_tap_outside: true,
                            origin: window.location.origin
                        });
                        googleInitialized = true;
                        console.log('✅ Google API initialized');
                    }
                    resolve();
                } else {
                    // 繼續等待
                    setTimeout(checkGoogleAPI, 100);
                }
            };
            checkGoogleAPI();
        });
    }
    
    // 重新渲染Google按鈕以更新語言
    async function updateGoogleButtonsLanguage() {
        console.log('🔄 Starting Google buttons language update...');
        console.log('📍 Current origin:', window.location.origin);
        console.log('🌐 Current HTML lang:', document.documentElement.lang);
        
        try {
            // 確保Google API已初始化
            await waitForGoogleAPIAndInitialize();
            
            // 重新渲染登入按鈕
            const loginButton = document.getElementById('google-signin-button');
            if (loginButton) {
                console.log('🔄 Re-rendering login button...');
                loginButton.innerHTML = ''; // 清除舊按鈕
                try {
                    google.accounts.id.renderButton(loginButton, {
                        theme: 'outline',
                        size: 'large',
                        text: 'signin_with',
                        shape: 'rectangular',
                        logo_alignment: 'left'
                    });
                    console.log('✅ Login button rendered successfully');
                } catch (renderError) {
                    console.error('❌ Login button render failed:', renderError);
                    if (renderError.message && renderError.message.includes('origin')) {
                        console.error('🚨 Origin not allowed! Please add the following origins to your Google OAuth settings:');
                        console.error('  - ' + window.location.origin);
                        console.error('  - http://localhost:8000');
                        console.error('  - http://127.0.0.1:8000');
                        console.error('  - http://[::1]:8000');
                        console.error('  - http://localhost:5173 (if using Vite)');
                    }
                }
            }
            
            // 重新渲染註冊按鈕
            const registerButton = document.getElementById('google-register-button');
            if (registerButton) {
                console.log('🔄 Re-rendering register button...');
                registerButton.innerHTML = ''; // 清除舊按鈕
                try {
                    google.accounts.id.renderButton(registerButton, {
                        theme: 'filled_blue',
                        size: 'large',
                        text: 'signup_with',
                        shape: 'rectangular',
                        logo_alignment: 'left'
                    });
                    console.log('✅ Register button rendered successfully');
                } catch (renderError) {
                    console.error('❌ Register button render failed:', renderError);
                }
            }
            
            console.log('✅ Google buttons language update completed for:', document.documentElement.lang);
        } catch (error) {
            console.error('❌ Failed to update Google buttons:', error);
            console.error('💡 Debug info:');
            console.error('  - Google API available:', typeof google !== 'undefined');
            console.error('  - Google accounts available:', typeof google !== 'undefined' && !!google.accounts);
            console.error('  - Google ID available:', typeof google !== 'undefined' && !!google.accounts?.id);
            console.error('  - Google initialized:', googleInitialized);
        }
    }
    
    // 調試函數 - 檢查Google OAuth狀態
    window.debugGoogleOAuth = function() {
        console.log('🔍 Google OAuth Debug Information:');
        console.log('📍 Current origin:', window.location.origin);
        console.log('🌐 HTML lang attribute:', document.documentElement.lang);
        console.log('🔧 Google API available:', typeof google !== 'undefined');
        console.log('🔧 Google accounts available:', typeof google !== 'undefined' && !!google.accounts);
        console.log('🔧 Google ID available:', typeof google !== 'undefined' && !!google.accounts?.id);
        console.log('🔧 Google initialized:', typeof googleInitialized !== 'undefined' ? googleInitialized : 'undefined');
        console.log('🔧 OAuth configured:', isGoogleOAuthConfigured());
        
        // 檢查按鈕元素
        const loginBtn = document.getElementById('google-signin-button');
        const registerBtn = document.getElementById('google-register-button');
        console.log('🔘 Login button exists:', !!loginBtn);
        console.log('🔘 Login button content:', loginBtn ? loginBtn.innerHTML.substring(0, 100) + '...' : 'N/A');
        console.log('🔘 Register button exists:', !!registerBtn);
        console.log('🔘 Register button content:', registerBtn ? registerBtn.innerHTML.substring(0, 100) + '...' : 'N/A');
        
        // 建議的Origins
        console.log('📝 Suggested origins for Google OAuth settings:');
        console.log('  - ' + window.location.origin);
        console.log('  - http://localhost:8000');
        console.log('  - http://127.0.0.1:8000');
        console.log('  - http://[::1]:8000');
        console.log('  - http://localhost:5173');
        console.log('💡 Run debugGoogleOAuth() to see this info again');
        console.log('💡 Run updateGoogleButtonsLanguage() to manually trigger button update');
    };
    
    function updateGoogleOAuthVisibility() {
        const elements = [
            document.querySelector('.oauth-divider'),
            document.getElementById('google-signin-button'),
            document.querySelector('.oauth-divider:nth-of-type(2)'),
            document.getElementById('google-register-button')
        ];
        
        const isConfigured = isGoogleOAuthConfigured();
        elements.forEach(el => {
            if (el) el.style.display = isConfigured ? 'block' : 'none';
        });
    }

    async function handleGoogleLoginCallback(response) {
        console.log('Google login callback received:', response);
        
        try {
            const result = await apiCall('/auth/oauth/google/', 'POST', {
                token: response.credential
            });
            
            if (result.success) {
                authToken = result.token;
                currentUser = result.user;
                
                // 清除舊版本localStorage數據避免衝突（不再使用舊版儲存）
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                
                // 使用新的 auth 系統
                const { loginSuccess } = await getAuth();
                loginSuccess({ user: result.user, token: result.token });
                
                if (result.is_new_user) {
                    // 新用戶導向個人資料設定頁面
                    showGoogleProfileSetup();
                } else {
                    // 現有用戶直接進入應用
                    showAuthenticatedApp();
                    showMessage('login-message', t('auth.googleLoginSuccess'));
                }
            }
        } catch (error) {
            console.error('Google OAuth error:', error);
            showMessage('login-message', error.message || t('common.error'), true);
        }
    }

    // Google 個人資料設定頁面
    function showGoogleProfileSetup() {
        // 隱藏主應用和認證頁面
        const appContainer = document.getElementById('main-app');
        const authScreen = document.getElementById('auth-screen');
        if (appContainer) appContainer.classList.add('hidden');
        if (authScreen) authScreen.classList.add('hidden');
        
        // 顯示 Google 設定頁面
        document.getElementById('google-profile-setup').classList.remove('hidden');
        
        // 更新頁面文字
        updateGoogleProfileTexts();
        
        // 預填用戶資訊
        if (currentUser) {
            document.getElementById('google-nickname').value = currentUser.display_name || '';
            document.getElementById('google-language').value = currentUser.preferred_language || (__i18nRef?.getCurrentLanguage?.() || 'zh');
        }
    }

    function updateGoogleProfileTexts() {
        const elements = {
            'complete-profile-title': 'auth.completeProfile',
            'google-nickname-label': 'auth.nickname',
            'google-birth-date-label': 'auth.birthDate',
            'google-language-label': 'auth.preferredLanguage',
            'skip-setup-btn': 'auth.skipSetup',
            'save-profile-btn': 'auth.saveProfile'
        };
        
        Object.entries(elements).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = t(key);
        });
        
        // 更新subtitle
        const subtitle = document.getElementById('complete-profile-subtitle');
        if (subtitle && currentUser) {
            subtitle.textContent = __i18nRef?.getCurrentLanguage?.() === 'en' ? 
                `Welcome, ${currentUser.email}! Please complete your profile.` : 
                `歡迎，${currentUser.email}！請完成您的個人資料。`;
        }
        
        // 更新 placeholder
        const nicknameInput = document.getElementById('google-nickname');
        if (nicknameInput) nicknameInput.placeholder = t('auth.nicknamePlaceholder');
        
        // 更新語言選擇器
        updateGoogleLanguageSelector();
    }

    function updateGoogleLanguageSelector() {
        const languageSelect = document.getElementById('google-language');
        if (languageSelect) {
            const currentValue = languageSelect.value;
            languageSelect.innerHTML = '';
            
            const zhOption = document.createElement('option');
            zhOption.value = 'zh';
            zhOption.textContent = __i18nRef?.getCurrentLanguage?.() === 'en' ? 'Chinese' : '中文';
            
            const enOption = document.createElement('option');
            enOption.value = 'en';
            enOption.textContent = 'English';
            
            languageSelect.appendChild(zhOption);
            languageSelect.appendChild(enOption);
            languageSelect.value = currentValue || (__i18nRef?.getCurrentLanguage?.() || 'zh');
        }
    }

    async function skipGoogleSetup() {
        showAuthenticatedApp();
        showMessage('google-profile-message', t('auth.googleRegisterSuccess'));
    }

    async function handleGoogleProfileSubmit(event) {
        event.preventDefault();
        
        const nickname = document.getElementById('google-nickname').value;
        const birthDate = document.getElementById('google-birth-date').value;
        const language = document.getElementById('google-language').value;
        const button = document.getElementById('save-profile-btn');
        
        button.disabled = true;
        
        try {
            const result = await apiCall('/auth/profile/update/', 'PUT', {
                display_name: nickname,
                birth_date: birthDate,
                preferred_language: language
            });
            
            if (result.success) {
                currentUser = result.user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // 如果語言有變更，更新界面語言
                if (language !== __i18nRef?.getCurrentLanguage?.()) {
                    await __i18nRef?.changeLanguage?.(language);
                }
                
                showAuthenticatedApp();
                showMessage('google-profile-message', t('auth.googleRegisterSuccess'));
            }
        } catch (error) {
            showMessage('google-profile-message', error.message || t('common.error'), true);
        } finally {
            button.disabled = false;
        }
    }

    function showAuthenticatedApp() {
        const authScreen = document.getElementById('auth-screen');
        const googleProfileSetup = document.getElementById('google-profile-setup');
        const appContainer = document.getElementById('main-app');

        if (authScreen) authScreen.classList.add('hidden');
        if (googleProfileSetup) googleProfileSetup.classList.add('hidden');
        if (appContainer) appContainer.classList.remove('hidden');
        
        // 顯示用戶資訊，隱藏遊客訊息
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('guest-info').style.display = 'none';
        
        // 顯示統計標籤
        const statisticsNavTab = document.getElementById('statistics-nav-tab');
        if (statisticsNavTab) statisticsNavTab.style.display = 'block';
        
        // 更新用戶資訊顯示
        if (currentUser) {
            document.getElementById('user-name').textContent = currentUser.display_name || currentUser.username;
            document.getElementById('user-email').textContent = currentUser.email;
            document.getElementById('user-avatar').textContent = (currentUser.display_name || currentUser.username).charAt(0).toUpperCase();
        }
    }

    function showAuthScreen() {
        const authScreen = document.getElementById('auth-screen');
        const appContainer = document.getElementById('main-app');

        if (authScreen) authScreen.classList.remove('hidden');
        if (appContainer) appContainer.classList.add('hidden');
    }
    
    function showGuestApp() {
        const authScreen = document.getElementById('auth-screen');
        const appContainer = document.getElementById('main-app');

        if (authScreen) authScreen.classList.add('hidden');
        if (appContainer) appContainer.classList.remove('hidden');

        // 顯示遊客訊息，隱藏用戶資訊
        const userInfo = document.getElementById('user-info');
        const guestInfo = document.getElementById('guest-info');
        if (userInfo) userInfo.style.display = 'none';
        if (guestInfo) guestInfo.style.display = 'block';

        // 隱藏統計標籤
        const statisticsNavTab = document.getElementById('statistics-nav-tab');
        // Show statistics for all users
        if (statisticsNavTab) statisticsNavTab.style.display = "block";
    }

    async function logout() {
        authToken = null;
        currentUser = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        // 使用新的 auth 系統
        const { logoutSuccess } = await getAuth();
        logoutSuccess();
        
        showGuestApp();
        
        // 清空表單
        document.getElementById('login-form').reset();
        document.getElementById('register-form').reset();
    }

    function checkAuthStatus() {
        // 清除舊版認證數據，避免與新系統衝突
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        // 檢查新版認證系統
        const newAuthData = localStorage.getItem('app_auth_v1');
        if (newAuthData) {
            try {
                const auth = JSON.parse(newAuthData);
                if (auth.user && auth.token && (!auth.tokenExp || Date.now() < auth.tokenExp * 1000)) {
                    // 新系統有效的認證
                    authToken = auth.token;
                    currentUser = auth.user;
                    showAuthenticatedApp();
                    return;
                }
            } catch (error) {
                console.error('Failed to parse new auth data:', error);
                localStorage.removeItem('app_auth_v1');
            }
        }
        
        // 如果沒有有效認證，顯示訪客界面
        showGuestApp();
    }

    function setupAuthEventListeners() {
        // 認證標籤切換
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                switchAuthTab(tab.getAttribute('data-auth-tab'));
            });
        });
        
        // 登入表單（如果存在）
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // 註冊表單（如果存在）
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }

        // Google 個人資料表單（如果存在）
        const googleProfileForm = document.getElementById('google-profile-form');
        if (googleProfileForm) {
            googleProfileForm.addEventListener('submit', handleGoogleProfileSubmit);
        }

        // 登出按鈕（如果存在）
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    }

    // 初始化
    // 本地 i18n 參考，不上 global
    let __i18nRef = null;
    
    // 共用 i18n 模組載入器（全域可用）
    let __i18nModPromise = null;
    function getI18n() {
        return __i18nModPromise ??= import('/js/i18n/i18n.js');
    }
    
    // 共用 auth 模組載入器
    let __authModPromise = null;
    function getAuth() {
        return __authModPromise ??= import('/js/core/auth.js');
    }
    
    async function initializePage() {
        // 動態載入 i18n 模組並指派給本地參考
        try {
            console.log("🔄 Loading i18n module...");
            const mod = await import('/js/i18n/i18n.js');
            __i18nRef = mod; // or mod.default ?? mod
            window.__i18nRef = __i18nRef; // 同時暴露到全域
            console.log("✅ i18n module loaded successfully", __i18nRef);
        } catch (e) {
            console.error('❌ i18n module load failed:', e);
            // 降級處理：提供基本功能避免整頁停擺
            __i18nRef = {
                initI18n: async () => { console.warn("i18n init fallback"); },
                updateAllTexts: () => { console.warn("i18n updateAllTexts fallback"); },
                getCurrentLanguage: () => localStorage.getItem('language') || 'zh',
                changeLanguage: async (lang) => { 
                    localStorage.setItem('language', lang);
                    console.warn("i18n changeLanguage fallback:", lang);
                },
                t: (key) => key // 直接返回鍵值作為降級
            };
            window.__i18nRef = __i18nRef; // 同時暴露到全域
        }
        
        // 初始化 i18n（取代裸呼叫 updateAllTexts()）
        if (typeof __i18nRef?.initI18n === 'function') {
            await __i18nRef?.initI18n?.();
        }
        __i18nRef?.updateAllTexts?.();
        
        // 載入 state 模組
        try {
            const stateModule = await import('/js/core/state.js');
            window.practiceModule = {
                setPracticeConfig: stateModule.setPracticeConfig,
                setSelection: stateModule.setSelection,
                getState: stateModule.getState
            };
            console.log("Practice module loaded successfully");
        } catch (error) {
            console.warn("Failed to load practice module:", error);
        }
        
        // 設置語言選擇器
        const languageSelect = document.getElementById('language');
        if (languageSelect) {
            languageSelect.value = __i18nRef?.getCurrentLanguage?.() || 'zh';
            languageSelect.addEventListener('change', async (e) => {
                await setLanguage(); // 使用統一的 setLanguage 函數
            });
        }
        
        // 更新所有文字
        __i18nRef?.updateAllTexts?.();
        
        // 更新模式選擇區域的文字（包括selected-count）
        if (typeof updateModeSelectTexts === 'function') {
            updateModeSelectTexts();
        }
        
        // 初始化Google按鈕（確保使用正確的語言）
        if (typeof updateGoogleButtonsLanguage === 'function') {
            updateGoogleButtonsLanguage().catch(error => {
                console.warn('Initial Google buttons setup failed:', error);
            });
        }
        updateChart();
        
        // 更新 Google OAuth 可見性
        updateGoogleOAuthVisibility();
        
        // 初始化 Google Sign-In
        initGoogleSignIn();
        
        // 設置認證事件監聽器
        setupAuthEventListeners();
        
        // 檢查認證狀態
        checkAuthStatus();
        
        // 綁定所有事件監聽器
        setupEventListeners();
        
        // Step 2: 初始化核心架構
        await setupCoreArchitecture();
        
        // 初始化練習模式狀態 (由 practice module 處理)
        
        // 快速練習範圍標籤由 updatePracticeModeTexts() 統一處理
        
        // 為自訂練習的 checkbox 添加事件監聽器 (由 practice module 處理)
        
        // 綁定練習模式切換事件，顯示/隱藏對應區塊
        const modeRadios = document.querySelectorAll('input[name="practice-mode"]');
        modeRadios.forEach(radio => {
            radio.addEventListener('change', handlePracticeModeChange);
        });
        
        console.log("Page initialized with i18next"); // Debug info
    }

    // Step 2: 設置事件監聽器來測試新架構
    async function setupCoreArchitecture() {
        // 動態載入核心模組
        try {
            const { on, emit } = await import('/js/core/events.js');
            const { setAppReady } = await import('/js/core/state.js');

            // 監聽語言變化事件
            on('i18n:changed', (lng) => {
                console.log('🌐 Language changed via events:', lng);
            });

            // 監聽狀態變化事件
            on('state:changed', (state) => {
                if (window.location.hostname === 'localhost') {
                    console.log('📊 State updated');
                }
            });

            // 設置應用為就緒狀態
            setAppReady(true);

            console.log('✅ Core architecture initialized');

            // 創建練習內容
            createPracticeContent();

        } catch (error) {
            console.warn('⚠️ Core architecture not available:', error);
            // 降級處理：直接創建練習內容
            createPracticeContent();
        }
    }

    // 創建練習模式的內容
    function createPracticeContent() {
        const practiceTab = document.getElementById('practice-tab');
        if (!practiceTab || practiceTab.innerHTML.trim() !== '<!-- 內容將由模板系統動態載入 -->') {
            console.log('Practice content already exists, skipping creation');
            return; // 內容已存在
        }

        console.log('Creating practice content...');

        practiceTab.innerHTML = `
            <!-- 字體類型選擇 -->
            <div class="checkbox-grid" style="margin-bottom: 20px;">
                <label><input type="radio" name="kana-type" value="hiragana" checked> <span id="hiragana-label">平假名</span></label>
                <label><input type="radio" name="kana-type" value="katakana"> <span id="katakana-label">片假名</span></label>
                <label><input type="radio" name="kana-type" value="mixed"> <span id="mixed-label">混合練習</span></label>
            </div>

            <!-- 練習模式選擇 -->
            <div class="mode-select" style="margin-bottom: 20px;">
                <h3 id="practice-mode-title">練習模式</h3>
                <div class="practice-mode-select">
                    <label><input type="radio" name="practice-mode" value="quick" checked> <span id="quick-practice-label">快速練習</span><br><small id="quick-practice-desc">15題隨機，適合快速練習</small></label>
                    <label><input type="radio" name="practice-mode" value="custom"> <span id="custom-practice-label">自訂練習</span><br><small id="custom-practice-desc">自選範圍和題數</small></label>
                </div>
            </div>

            <!-- 快速練習選項 -->
            <div id="quick-mode-options">
                <h4 id="practice-range-title">練習範圍：</h4>
                <div class="quick-selection">
                    <label><input type="checkbox" name="quick-range" value="basic" checked> <span id="basic-range-label">清音 (五十音)</span></label>
                    <label><input type="checkbox" name="quick-range" value="dakuten"> <span id="dakuten-range-label">濁音 (が、ざ、だ...)</span></label>
                    <label><input type="checkbox" name="quick-range" value="handakuten"> <span id="handakuten-range-label">拗音 (きゃ、しゅ、ちょ...)</span></label>
                    <label><input type="checkbox" name="quick-range" value="youon"> <span id="youon-range-label">拗音 (きゃ、しゅ、ちょ...)</span></label>
                </div>
                <div style="margin-top: 15px;">
                    <label for="quick-question-count" id="question-count-label">題數：</label>
                    <select id="quick-question-count">
                        <option value="15">15題</option>
                        <option value="25">25題</option>
                        <option value="50">50題</option>
                    </select>
                </div>
            </div>

            <!-- 自訂練習選項 -->
            <div id="custom-mode-options" style="display: none;">
                <h4 id="custom-range-title">練習範圍：</h4>
                <div class="row-selection">
                    <!-- 這裡會動態創建行選擇器 -->
                </div>
            </div>

            <!-- 開始練習按鈕 -->
            <button id="start-btn" class="practice-button" style="margin-top: 20px; padding: 15px 30px; font-size: 18px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">
                <span id="start-practice-label">開始練習</span>
            </button>
        `;

        console.log('✅ Practice content created');
    }

    // 設置所有事件監聽器
    function setupEventListeners() {
        console.log("Setting up event listeners...");
        
        // 開始練習按鈕
        const startBtn = document.getElementById("start-btn");
        if (startBtn) {
            // 移除舊的事件監聽器（如果有的話）
            startBtn.removeEventListener('click', startQuiz);
            startBtn.addEventListener('click', startQuiz);
            console.log("Start button event listener added");
        } else {
            console.log("Start button not found");
        }
        
        // 語言選擇
        const languageSelect = document.getElementById("language");
        if (languageSelect) {
            // 移除舊的事件監聽器（如果有的話）
            languageSelect.removeEventListener('change', setLanguage);
            languageSelect.addEventListener('change', setLanguage);
            console.log("Language select event listener added");
        } else {
            console.log("Language select not found");
        }
        
        // 導航標籤
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            // 移除舊的事件監聽器（如果有的話）
            tab.removeEventListener('click', tabClickHandler);
            tab.addEventListener('click', tabClickHandler);
        });
        console.log("Nav tabs event listeners added:", navTabs.length);
        
        // 假名類型選擇
        const kanaTypeRadios = document.querySelectorAll('input[name="kana-type"]');
        kanaTypeRadios.forEach(radio => {
            // 移除舊的事件監聽器（如果有的話）
            radio.removeEventListener('change', updateCategoryLabels);
            radio.addEventListener('change', updateCategoryLabels);
        });
        console.log("Kana type radios event listeners added:", kanaTypeRadios.length);
        
        // 五十音表類型選擇
        const chartTypeRadios = document.querySelectorAll('input[name="chart-type"]');
        chartTypeRadios.forEach(radio => {
            // 移除舊的事件監聽器（如果有的話）
            radio.removeEventListener('change', updateChart);
            radio.addEventListener('change', updateChart);
        });
        console.log("Chart type radios event listeners added:", chartTypeRadios.length);
        
        // 練習模式選擇
        const practiceModeRadios = document.querySelectorAll('input[name="practice-mode"]');
        practiceModeRadios.forEach(radio => {
            // 保險：同時註冊 change 與 click，避免某些瀏覽器組合事件異常
            const handler = () => handlePracticeModeChange();
            radio.removeEventListener('change', handler);
            radio.addEventListener('change', handler);
            radio.removeEventListener('click', handler);
            radio.addEventListener('click', handler);
            
            // 同步狀態到 state
            radio.addEventListener('change', function() {
                console.log("Practice mode changed to:", this.value);
                if (window.practiceModule?.setPracticeConfig) {
                    window.practiceModule.setPracticeConfig({ mode: this.value });
                }
            });
        });
        console.log("Practice mode radios event listeners added:", practiceModeRadios.length);
        
        // 初始化一次顯示狀態（由 practice module 處理）
        
        // 行選擇checkbox (由 practice module 處理)
        
        
        // 快速範圍選擇checkbox
        const quickRangeCheckboxes = document.querySelectorAll('input[name="quick-range"]');
        quickRangeCheckboxes.forEach(checkbox => {
            // 不需要特別的處理，只是確保至少有一個選中
            console.log("Quick range checkbox found:", checkbox.value);
        });
        console.log("Quick range checkboxes found:", quickRangeCheckboxes.length);
        
        // 密碼驗證事件監聽器
        const passwordInput = document.getElementById('register-password');
        if (passwordInput) {
            passwordInput.removeEventListener('input', validatePassword);
            passwordInput.addEventListener('input', validatePassword);
            console.log("Password validation event listener added");
        }
        
        // 答案輸入框和送出按鈕（這些可能在動態創建時才存在）
        setupQuizEventListeners();
        
        console.log("All event listeners set up successfully");
        
        // 初始化預覽文字（在模板加載完成後）
        if (document.querySelector('input[name="kana-type"]') && typeof updateRowPreviews === 'function') {
            updateRowPreviews();
            console.log("Row previews initialized after template load");
        }
    }
    
    // 暴露 setupEventListeners 到全域範圍供 app.js 使用
    if (typeof window !== 'undefined') {
        window.setupEventListeners = setupEventListeners;
    }
    
    // 設置測驗相關的事件監聽器
    function setupQuizEventListeners() {
        // 答案輸入框
        const answerInput = document.getElementById("answer");
        if (answerInput) {
            // 移除舊的事件監聽器（如果有的話）
            answerInput.removeEventListener('keydown', answerKeydownHandler);
            answerInput.addEventListener('keydown', answerKeydownHandler);
            console.log("Answer input event listener added");
        }
        
        // 送出按鈕
        const submitBtn = document.getElementById("submit-btn");
        if (submitBtn) {
            // 移除舊的事件監聽器（如果有的話）
            submitBtn.removeEventListener('click', checkAnswer);
            submitBtn.addEventListener('click', checkAnswer);
            console.log("Submit button event listener added");
        }
    }
    
    // 導航標籤點擊處理器
    function tabClickHandler() {
        const tabName = this.getAttribute('data-tab');
        console.log("Tab clicked:", tabName);
        showTab(tabName);
    }
    
    // 答案輸入框按鍵處理器
    function answerKeydownHandler(event) {
        if (event.key === 'Enter') {
            console.log("Enter key pressed in answer input");
            checkAnswer();
        }
    }
    
    // 處理練習模式切換
    function handlePracticeModeChange() {
        const practiceModeEl = document.querySelector('input[name="practice-mode"]:checked');
        if (!practiceModeEl) {
            console.warn("No practice mode selected, defaulting to quick mode");
            const quickRadio = document.querySelector('input[name="practice-mode"][value="quick"]');
            if (quickRadio) quickRadio.checked = true;
            return;
        }
        
        const practiceMode = practiceModeEl.value;
        console.log("Practice mode changed to:", practiceMode);
        
        const quickModeOptions = document.getElementById('quick-mode-options');
        const customModeOptions = document.getElementById('custom-mode-options');
        
        if (!quickModeOptions || !customModeOptions) {
            console.error("Mode option elements not found");
            return;
        }
        
        // 保險：同時控制 class 與 inline style，避免樣式覆蓋導致顯示錯誤
        const show = (el, visible) => {
            el.classList.toggle('hidden', !visible);
            el.style.display = visible ? '' : 'none';
        };
        
        if (practiceMode === 'quick') {
            show(quickModeOptions, true);
            show(customModeOptions, false);
            console.log("Switched to quick mode");
        } else {
            show(quickModeOptions, false);
            show(customModeOptions, true);
            console.log("Switched to custom mode");
        }
    }
    
    // 練習模式文字更新函數

// 暴露重要函數到全域作用域，供HTML事件處理器使用
window.showTab = showTab;
window.updateKanaType = updateKanaType;
window.startQuiz = startQuiz;
window.setLanguage = setLanguage;
window.setLanguageAndUpdateAuth = setLanguageAndUpdateAuth;
window.onLanguagePreferenceChange = onLanguagePreferenceChange;
window.initializeLanguage = initializeLanguage;
window.syncAllLanguageSelectors = syncAllLanguageSelectors;
window.getCurrentKanaType = getCurrentKanaType;
window.shuffle = shuffle;
window.pickRowFromKanaData = pickRowFromKanaData;
window.togglePracticeOptions = togglePracticeOptions;
window.showQuizContent = showQuizContent;
window.returnToMenu = returnToMenu;
window.hideQuizContent = hideQuizContent;
window.updateStats = updateStats;
window.nextQuestion = nextQuestion;
window.showGuestApp = showGuestApp;
window.togglePassword = togglePassword;
window.showAuthScreen = showAuthScreen;
window.skipGoogleSetup = skipGoogleSetup;
window.closeSessionDetail = closeSessionDetail;
window.handleLanguageChange = handleLanguageChange;


// 暴露數據到全域作用域
window.kanaData = kanaData;
window.kanaRowData = kanaRowData;
window.rowNameData = rowNameData;
window.rowPreviewData = rowPreviewData;
window.chartData = chartData;

// 更新模式選擇區域的文字（從原始版本恢復）
function updateModeSelectTexts() {
    const _t = (k) => (typeof __i18nRef?.t === 'function' ? __i18nRef.t(k) : k);

    // 允許不存在就略過：依據頁面實際有的元素做更新
    const setText = (sel, key) => {
        const el = document.querySelector(sel);
        if (!el) return;
        // 若有 data-i18n 就覆寫為對應鍵，否則直接填字
        if (el.hasAttribute('data-i18n')) {
            el.setAttribute('data-i18n', key);
            el.textContent = _t(key);
        } else {
            el.textContent = _t(key);
        }
    };

    // 標題/模式名稱與說明
    setText('#practice-mode-title', 'practice.title');
    setText('#mode-quick-name', 'practice.quickMode');
    setText('#mode-quick-desc', 'practice.quickModeDesc');
    setText('#mode-custom-name', 'practice.customMode');
    setText('#mode-custom-desc', 'practice.customModeDesc');

    // 快速模式：範圍與題數（與假名類型無關的通用鍵）
    setText('#quick-range-label', 'practice.practiceRange');
    setText('#quick-basic-label', 'practice.quickBasic');
    setText('#quick-dakuten-label', 'practice.quickDakuten');
    setText('#quick-handakuten-label', 'practice.quickHandakuten');
    setText('#quick-youon-label', 'practice.quickYouon');
    setText('#quick-count-label', 'practice.questionCount');
    setText('#quick-count-10', 'practice.count10');
    setText('#quick-count-15', 'practice.count15');
    setText('#quick-count-20', 'practice.count20');

    // 自訂模式：快速選擇區塊、分類標題、批次操作
    setText('#quick-selection-title', 'practice.quickSelection');
    setText('#basic-category-title', 'practice.basicCategory');
    setText('#dakuten-category-title', 'practice.dakutenCategory');
    setText('#handakuten-category-title', 'practice.handakutenCategory');
    setText('#youon-category-title', 'practice.youonCategory');

    setText('#basic-select-all-btn', 'practice.basicSelectAll');
    setText('#dakuten-select-all-btn', 'practice.dakutenSelectAll');
    setText('#handakuten-select-all-btn', 'practice.handakutenSelectAll');
    setText('#youon-select-all-btn', 'practice.youonSelectAll');
    setText('#clear-all-selection-btn', 'practice.clearAllSelection');
    
    // 詳細選擇標題
    setText('#detailed-selection-title', 'practice.detailedSelection');
    
    console.log('Mode select texts updated');
}

// 簡化的語言切換處理器（備用方案）
function handleLanguageChange() {
    console.log("🌐 handleLanguageChange called");
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        const newLang = languageSelect.value;
        console.log("Selected language:", newLang);
        
        // 保存語言設定
        localStorage.setItem('preferredLanguage', newLang);
        localStorage.setItem('language', newLang);
        
        // 嘗試使用主要的setLanguage函數
        if (typeof setLanguage === 'function') {
            console.log("Using main setLanguage function");
            setLanguage();
        } else if (window.__i18nRef?.changeLanguage) {
            console.log("Using __i18nRef.changeLanguage directly");
            window.__i18nRef.changeLanguage(newLang).then(() => {
                syncAllLanguageSelectors();
                console.log("Language changed to:", newLang);
            }).catch(err => {
                console.error("Language change failed:", err);
            });
        } else {
            console.log("Using fallback language change");
            // 降級處理：至少同步所有選擇器
            syncAllLanguageSelectors();
            
            // 簡單的文字更新
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (newLang === 'en') {
                    // 簡單的英文翻譯
                    if (key === 'nav.practice') el.textContent = 'Practice';
                    if (key === 'nav.chart') el.textContent = 'Chart';
                    if (key === 'nav.statistics') el.textContent = 'Statistics';
                } else {
                    // 中文翻譯
                    if (key === 'nav.practice') el.textContent = '練習';
                    if (key === 'nav.chart') el.textContent = '圖表';
                    if (key === 'nav.statistics') el.textContent = '統計';
                }
            });
            
            console.log("Fallback language change completed");
        }
    }
}

    // 調試用的引用會在 initializePage 中設置

// 重要：初始化頁面（這在原始版本中會自動執行）
// 這個調用是語言切換功能正常工作的關鍵！
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
