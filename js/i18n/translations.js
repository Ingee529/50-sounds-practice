// 翻譯資源定義
// 抽離自 i18n.js，用於模塊化架構
// 暫時使用全域變數，稍後會改為 ES Modules

window.translations = {
    zh: {
        // 應用標題和導航
        app: {
            title: "🎌 日文五十音練習器",
            guestMode: "遊客模式",
            guestWarning: "您的學習紀錄將不會被保存",
            loginRegister: "登入/註冊",
            backToGuest: "返回遊客模式",
            login: "登入",
            register: "註冊",
            logout: "登出"
        },
        
        // 導航標籤
        nav: {
            practice: "練習模式",
            chart: "五十音表",
            statistics: "學習統計"
        },
        
        // 認證表單
        auth: {
            loginAccount: "帳號或信箱",
            password: "密碼",
            username: "使用者名稱",
            email: "電子郵件",
            displayName: "顯示名稱",
            displayNamePlaceholder: "選填",
            language: "語言",
            preferredLanguage: "偏好語言",
            confirmPassword: "確認密碼",
            reqLength: "至少 8 個字符",
            reqLetter: "包含字母",
            reqNumber: "包含數字",
            loggingIn: "登入中...",
            registering: "註冊中...",
            googleLogin: "使用 Google 登入",
            googleLoginBtn: "Google 登入",
            orDivider: "或",
            googleLoginSuccess: "使用 Google 登入成功！",
            googleRegisterSuccess: "使用 Google 註冊並登入成功！",
            googleRegisterBtn: "使用 Google 註冊",
            completeProfile: "完成個人資料",
            nickname: "暱稱",
            nicknamePlaceholder: "選填，用於顯示您的名稱",
            login: "登入",
            birthDate: "出生日期",
            birthDatePlaceholder: "選填",
            skipSetup: "跳過設定",
            saveProfile: "保存並完成",
            passwordReq: {
                length: "至少8個字元",
                letter: "包含英文字母",
                number: "包含數字"
            },
            passwordMismatch: "密碼不一致"
        },
        
        // 假名類型和類別
        kana: {
            types: {
                hiragana: "平假名 (ひらがな)",
                katakana: "片假名 (カタカナ)",
                mixed: "混合練習"
            },
            categories: {
                basic: "清音",
                dakuten: "濁音",
                handakuten: "半濁音",
                youon: "拗音",
                sokuon: "促音",
                chouon: "長音",
                basicWithExample: "清音 (五十音)",
                dakutenWithExample: "濁音 (が,ざ,だ,ば)",
                handakutenWithExample: "半濁音 (ぱ行)",
                youonWithExample: "拗音 (きゃ,しゃ,ちゃ...)",
                dakutenKatakana: "濁音 (ガ,ザ,ダ,バ)",
                handakutenKatakana: "半濁音 (パ行)",
                youonKatakana: "拗音 (キャ,シャ,チャ...)"
            },
            groups: {
                basic: "基本音",
                dakuten: "濁音",
                handakuten: "半濁音",
                youon: "拗音",
                sokuon: "促音",
                chouon: "長音"
            }
        },
        
        // 練習模式
        practice: {
            title: "練習模式",
            selectType: "選擇假名類型：",
            selectCategory: "選擇練習類別：",
            startBtn: "開始練習",
            backBtn: "返回主選單",
            submitAnswer: "提交",
            nextQuestion: "下一題",
            backToSetup: "返回設定",
            restartPractice: "重新練習",
            practiceComplete: "練習完成",
            enterRomaji: "請輸入羅馬字",
            reviewMode: "錯題複習模式",
            // Statistics labels
            current: "當前題目",
            total: "總題數",
            score: "得分",
            accuracy: "正確率",
            selectTypeAlert: "⚠️ 請至少選擇一種練習類型！",
            selectedCount: "已選擇 {count} 個字符",
            // New practice mode features
            quickMode: "快速練習",
            customMode: "自訂練習",
            quickModeDesc: "15題隨機，適合快速練習",
            customModeDesc: "自選範圍和題數",
            practiceRange: "練習範圍：",
            questionCount: "題數：",
            quickSelection: "快速選擇：",
            quickBasic: "清音",
            quickDakuten: "濁音",
            quickHandakuten: "半濁音",
            quickYouon: "拗音",
            detailedSelection: "詳細選擇：",
            selectAll: "全選",
            clearAll: "全部清除",
            selectedRange: "已選範圍：",
            characters: "字",
            selectRangeAlert: "請至少選擇一個練習範圍",
            practiceAmount: "練習量：",
            allPractice: "全部練習",
            random15: "隨機15題", 
            random30: "隨機30題",
            questions: "題",
            count10: "10題",
            count15: "15題", 
            count20: "20題",
            // Quick selection buttons
            basicSelectAll: "清音全選",
            dakutenSelectAll: "濁音全選", 
            handakutenSelectAll: "半濁音全選",
            youonSelectAll: "拗音全選",
            clearAllSelection: "全部清除",
            selectRowAlert: "請先勾選至少一行",
            noKanaInSelection: "所選行沒有可用的假名",
            // Category titles
            basicCategory: "基本音（清音）",
            dakutenCategory: "濁音",
            handakutenCategory: "半濁音", 
            youonCategory: "拗音",
            detailedSelection: "詳細選擇：",
            // Quick range labels
            quickBasicHiragana: "清音 (五十音)",
            quickBasicKatakana: "清音 (カタカナ)",
            quickBasicMixed: "清音 (ひらがな/カタカナ)",
            quickDakutenHiragana: "濁音 (が、ざ、だ...)",
            quickDakutenKatakana: "濁音 (ガ、ザ、ダ...)",
            quickDakutenMixed: "濁音 (が/ガ、ざ/ザ...)",
            quickHandakutenHiragana: "半濁音 (ぱ行)",
            quickHandakutenKatakana: "半濁音 (パ行)",
            quickHandakutenMixed: "半濁音 (ぱ/パ行)",
            quickYouonHiragana: "拗音 (きゃ、しゅ、ちょ...)",
            quickYouonKatakana: "拗音 (キャ、シュ、チョ...)",
            quickYouonMixed: "拗音 (きゃ/キャ、しゅ/シュ...)"
        },
        
        // 五十音表
        chart: {
            title: "五十音表",
            hiragana: "平假名",
            katakana: "片假名",
            sokuonDesc: "小つ (っ)，發音時停頓一拍",
            sokuonExample: "例：きっぷ (kippu)、がっこう (gakkou)",
            chouonDesc: "母音延長，持續兩拍",
            chouonExample: "例：おかあさん (okaasan)、コーヒー (koohii)",
            tableRow: "行",
            yaColumn: "や段",
            yuColumn: "ゆ段",
            yoColumn: "よ段"
        },
        
        // 統計頁面
        stats: {
            title: "學習統計",
            loading: "載入中...",
            loginRequired: "請先登入查看學習統計",
            cannotLoad: "無法載入統計數據",
            totalSessions: "練習次數",
            totalQuestions: "總題數",
            totalCorrect: "正確數",
            avgAccuracy: "平均正確率",
            totalTime: "練習時間(分)",
            totalPractice: "總練習",
            recentSessions: "最近練習記錄",
            categoryPerformance: "各類別表現",
            categoryStats: "類別統計",
            noRecords: "暫無練習記錄",
            noRecentSessions: "暫無最近練習記錄",
            noCategoryStats: "暫無類別統計",
            noData: "暫無資料",
            loadError: "載入失敗，請重試",
            retryButton: "重新載入",
            clickForDetail: "點擊查看詳情 »"
        },
        
        // 練習記錄詳情
        sessionDetail: {
            title: "練習記錄詳情",
            loading: "載入中...",
            practiceType: "練習類型",
            practiceRange: "練習範圍",
            startTime: "開始時間",
            endTime: "結束時間",
            duration: "練習時長",
            result: "成績",
            answerRecords: "答題記錄",
            correct: "正確",
            reviewWrongAnswers: "錯題複習",
            noAnswerRecords: "無答題記錄",
            cannotLoadDetails: "無法載入詳情",
            reviewFailed: "無法開始錯題複習"
        },
        
        // 通用詞彙
        common: {
            questions: "題",
            correct: "正確",
            incorrect: "錯誤",
            score: "分數",
            time: "時間",
            seconds: "秒",
            minutes: "分鐘",
            times: "次",
            loading: "載入中...",
            error: "錯誤",
            success: "成功",
            cancel: "取消",
            confirm: "確認",
            close: "關閉",
            currentQuestion: "當前題目",
            accuracy: "正確率",
            saveRecordsPrompt: "想要保存學習紀錄嗎？",
            registerPrompt: "註冊帳號即可追蹤您的學習進度和統計數據！",
            registerNow: "立即註冊",
            loginToTrack: "請登入或註冊以追蹤學習進度"
        },
        
        // 排行榜
        leaderboard: {
            title: "排行榜",
            rank: "排名",
            name: "姓名",
            score: "分數", 
            accuracy: "正確率",
            speed: "速度",
            noData: "暫無資料",
            loadError: "載入失敗，請重試",
            refreshing: "更新中..."
        },
        
        // 通知系統
        notifications: {
            tokenExpired: {
                title: "登入已過期",
                message: "您的登入狀態已過期，請重新登入以繼續使用。"
            },
            tokenRefreshed: {
                title: "登入已更新",
                message: "您的登入狀態已自動更新。"
            },
            refreshFailed: {
                title: "登入更新失敗",
                message: "無法自動更新登入狀態，請重新登入。"
            },
            networkError: {
                title: "網路錯誤",
                message: "網路連接出現問題，請檢查網路連接並稍後再試。"
            }
        },
        
        // 通用擴充
        commonExt: {
            retry: "重試",
            refresh: "刷新頁面"
        }
    },
    
    en: {
        // 應用標題和導航
        app: {
            title: "🎌 Japanese 50 Sounds Practice",
            guestMode: "Guest Mode",
            guestWarning: "Your learning records will not be saved",
            loginRegister: "Login/Register",
            backToGuest: "Back to Guest Mode",
            login: "Login",
            register: "Register",
            logout: "Logout"
        },
        
        // 導航標籤
        nav: {
            practice: "Practice Mode",
            chart: "Kana Chart",
            statistics: "Learning Statistics"
        },
        
        // 認證表單
        auth: {
            loginAccount: "Username or Email",
            password: "Password",
            username: "Username",
            email: "Email",
            displayName: "Display Name",
            displayNamePlaceholder: "Optional",
            language: "Language",
            preferredLanguage: "Preferred Language",
            confirmPassword: "Confirm Password",
            reqLength: "At least 8 characters",
            reqLetter: "Contains letters",
            reqNumber: "Contains numbers",
            loggingIn: "Logging in...",
            registering: "Registering...",
            googleLogin: "Sign in with Google",
            googleLoginBtn: "Google Login",
            orDivider: "or",
            googleLoginSuccess: "Successfully logged in with Google!",
            googleRegisterSuccess: "Successfully registered and logged in with Google!",
            googleRegisterBtn: "Sign up with Google",
            completeProfile: "Complete Your Profile",
            nickname: "Nickname",
            nicknamePlaceholder: "Optional, for displaying your name",
            birthDate: "Birth Date",
            birthDatePlaceholder: "Optional",
            skipSetup: "Skip Setup",
            saveProfile: "Save & Complete",
            passwordReq: {
                length: "At least 8 characters",
                letter: "Include letters",
                number: "Include numbers"
            },
            passwordMismatch: "Passwords do not match"
        },
        
        // 假名類型和類別
        kana: {
            types: {
                hiragana: "Hiragana (ひらがな)",
                katakana: "Katakana (カタカナ)",
                mixed: "Mixed Practice"
            },
            categories: {
                basic: "Basic",
                dakuten: "Dakuten",
                handakuten: "Handakuten",
                youon: "Youon",
                sokuon: "Sokuon",
                chouon: "Chouon",
                basicWithExample: "Basic (gojuon)",
                dakutenWithExample: "Dakuten (が,ざ,だ,ば)",
                handakutenWithExample: "Handakuten (ぱ行)",
                youonWithExample: "Youon (きゃ,しゃ,ちゃ...)",
                dakutenKatakana: "Dakuten (ガ,ザ,ダ,バ)",
                handakutenKatakana: "Handakuten (パ行)",
                youonKatakana: "Youon (キャ,シャ,チャ...)"
            },
            groups: {
                basic: "Basic",
                dakuten: "Dakuten",
                handakuten: "Handakuten",
                youon: "Youon",
                sokuon: "Sokuon",
                chouon: "Chouon"
            }
        },
        
        // 練習模式
        practice: {
            title: "Practice Mode",
            selectType: "Select Kana Type:",
            selectCategory: "Select Practice Categories:",
            startBtn: "Start Practice",
            backBtn: "Back to Menu",
            submitAnswer: "Submit",
            nextQuestion: "Next",
            backToSetup: "Back to Setup",
            restartPractice: "Restart Practice",
            practiceComplete: "Practice Complete",
            enterRomaji: "Enter romaji",
            reviewMode: "Wrong Answer Review Mode",
            // Statistics labels
            current: "Current",
            total: "Total",
            score: "Score",
            accuracy: "Accuracy",
            selectTypeAlert: "⚠️ Please select at least one practice type!",
            selectedCount: "Selected {count} characters",
            // New practice mode features
            quickMode: "Quick Practice",
            customMode: "Custom Practice",
            quickModeDesc: "15 random questions, perfect for quick practice",
            customModeDesc: "Choose your own range and question count",
            practiceRange: "Practice Range:",
            questionCount: "Question Count:",
            quickSelection: "Quick Selection:",
            quickBasic: "Basic",
            quickDakuten: "Dakuten",
            quickHandakuten: "Handakuten",
            quickYouon: "Youon",
            detailedSelection: "Detailed Selection:",
            selectAll: "Select All",
            clearAll: "Clear All",
            selectedRange: "Selected Range: ",
            characters: " characters",
            selectRangeAlert: "Please select at least one practice range",
            practiceAmount: "Practice Amount:",
            allPractice: "All Practice",
            random15: "Random 15 Questions",
            random30: "Random 30 Questions", 
            questions: " questions",
            count10: "10 Questions",
            count15: "15 Questions",
            count20: "20 Questions",
            // Quick selection buttons
            basicSelectAll: "Select All Basic",
            dakutenSelectAll: "Select All Dakuten",
            handakutenSelectAll: "Select All Handakuten", 
            youonSelectAll: "Select All Youon",
            clearAllSelection: "Clear All",
            selectRowAlert: "Please select at least one row",
            noKanaInSelection: "No kana available in selected rows",
            // Category titles
            basicCategory: "Basic Sounds (Seion)",
            dakutenCategory: "Dakuten",
            handakutenCategory: "Handakuten",
            youonCategory: "Youon",
            detailedSelection: "Detailed Selection:",
            // Quick range labels  
            quickBasicHiragana: "Basic (gojuon)",
            quickBasicKatakana: "Basic (katakana)",
            quickBasicMixed: "Basic (hiragana/katakana)",
            quickDakutenHiragana: "Dakuten (が、ざ、だ...)",
            quickDakutenKatakana: "Dakuten (ガ、ザ、ダ...)",
            quickDakutenMixed: "Dakuten (が/ガ、ざ/ザ...)",
            quickHandakutenHiragana: "Handakuten (ぱ行)",
            quickHandakutenKatakana: "Handakuten (パ行)",
            quickHandakutenMixed: "Handakuten (ぱ/パ行)",
            quickYouonHiragana: "Youon (きゃ、しゅ、ちょ...)",
            quickYouonKatakana: "Youon (キャ、シュ、チョ...)",
            quickYouonMixed: "Youon (きゃ/キャ、しゅ/シュ...)"
        },
        
        // 五十音表
        chart: {
            title: "Kana Chart",
            hiragana: "Hiragana",
            katakana: "Katakana",
            sokuonDesc: "Small tsu (っ), pause for one beat",
            sokuonExample: "Example: きっぷ (kippu), がっこう (gakkou)",
            chouonDesc: "Vowel extension, lasts two beats",
            chouonExample: "Example: おかあさん (okaasan), コーヒー (koohii)",
            tableRow: "Row",
            yaColumn: "ya",
            yuColumn: "yu",
            yoColumn: "yo"
        },
        
        // 統計頁面
        stats: {
            title: "Learning Statistics",
            loading: "Loading...",
            loginRequired: "Please login to view learning statistics",
            cannotLoad: "Cannot load statistics",
            totalSessions: "Practice Sessions",
            totalQuestions: "Total Questions",
            totalCorrect: "Correct Answers",
            avgAccuracy: "Average Accuracy",
            totalTime: "Practice Time (min)",
            totalPractice: "Total Practice",
            recentSessions: "Recent Practice Sessions",
            categoryPerformance: "Category Performance",
            categoryStats: "Category Statistics",
            noRecords: "No practice records",
            noRecentSessions: "No recent practice sessions",
            noCategoryStats: "No category statistics",
            noData: "No data available",
            loadError: "Failed to load, please retry",
            retryButton: "Reload",
            clickForDetail: "Click for details »"
        },
        
        // 練習記錄詳情
        sessionDetail: {
            title: "Session Details",
            loading: "Loading...",
            practiceType: "Practice Type",
            practiceRange: "Practice Range",
            startTime: "Start Time",
            endTime: "End Time",
            duration: "Duration",
            result: "Result",
            answerRecords: "Answer Records",
            correct: "Correct",
            reviewWrongAnswers: "Review Wrong Answers",
            noAnswerRecords: "No answer records",
            cannotLoadDetails: "Cannot load details",
            reviewFailed: "Cannot start wrong answer review"
        },
        
        // 通用詞彙
        common: {
            questions: "questions",
            correct: "Correct",
            incorrect: "Incorrect",
            score: "Score",
            time: "Time",
            seconds: "seconds",
            minutes: "minutes",
            times: "times",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            cancel: "Cancel",
            confirm: "Confirm",
            close: "Close",
            currentQuestion: "Current Question",
            accuracy: "Accuracy",
            saveRecordsPrompt: "Want to save your learning records?",
            registerPrompt: "Register an account to track your learning progress and statistics!",
            registerNow: "Register Now",
            loginToTrack: "Please login or register to track learning progress",
            retry: "Retry",
            refresh: "Refresh Page"
        },
        
        // 通知系統
        notifications: {
            tokenExpired: {
                title: "Login Expired",
                message: "Your login session has expired. Please log in again to continue."
            },
            tokenRefreshed: {
                title: "Login Updated",
                message: "Your login session has been automatically updated."
            },
            refreshFailed: {
                title: "Login Update Failed", 
                message: "Unable to automatically update login session. Please log in again."
            },
            networkError: {
                title: "Network Error",
                message: "There was a network connection problem. Please check your connection and try again."
            }
        },
        
        // Leaderboard
        leaderboard: {
            title: "Leaderboard",
            rank: "Rank",
            name: "Name",
            score: "Score",
            accuracy: "Accuracy", 
            speed: "Speed",
            noData: "No data available",
            loadError: "Failed to load, please try again",
            refreshing: "Refreshing..."
        }
    }
};