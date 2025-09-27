# 日文五十音練習器 - 後端 API

基於 Django + Django REST Framework 的後端 API 服務。

## 🚀 快速開始

### 1. 環境需求

- Python 3.8+
- MySQL 8.0+
- pip (Python 套件管理器)

### 2. 安裝與設置

```bash
# 1. 建立虛擬環境
python -m venv venv

# 2. 啟動虛擬環境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 3. 安裝依賴套件
pip install -r requirements.txt

# 4. 複製環境變數檔案
cp .env.example .env

# 5. 修改 .env 檔案中的資料庫設定
# 設定你的 MySQL 連接資訊

# 6. 執行資料庫遷移
python manage.py makemigrations
python manage.py migrate

# 7. 建立超級使用者 (可選)
python manage.py createsuperuser

# 8. 啟動開發伺服器
python manage.py runserver
```

或者使用自動設置腳本：

```bash
python setup.py
```

### 3. 資料庫設定

在 MySQL 中建立資料庫：

```sql
CREATE DATABASE kana_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然後在 `.env` 檔案中設定：

```env
DB_NAME=kana_practice
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

## 📁 專案結構

```
backend/
├── kana_practice/          # Django 主專案
│   ├── settings.py         # 專案設定
│   ├── urls.py            # 主 URL 配置
│   └── wsgi.py            # WSGI 配置
├── accounts/              # 使用者認證應用
│   ├── models.py          # 使用者模型
│   ├── views.py           # 認證 API 視圖
│   ├── serializers.py     # 序列化器
│   └── authentication.py  # JWT 認證
├── practice/              # 練習記錄應用
│   ├── models.py          # 練習記錄模型
│   ├── views.py           # 練習 API 視圖
│   └── serializers.py     # 序列化器
├── requirements.txt       # Python 依賴套件
├── .env.example          # 環境變數範例
└── manage.py             # Django 管理工具
```

## 🔌 API 文檔

### 認證相關 API

#### 使用者註冊
```http
POST /api/auth/register/
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword123",
    "password_confirm": "securepassword123",
    "display_name": "測試使用者",
    "preferred_language": "zh"
}
```

#### 使用者登入
```http
POST /api/auth/login/
Content-Type: application/json

{
    "identifier": "testuser",  // 使用者名稱或信箱
    "password": "securepassword123"
}
```

#### 獲取使用者資料
```http
GET /api/auth/profile/
Authorization: Bearer <jwt_token>
```

#### 驗證 Token
```http
GET /api/auth/verify/
Authorization: Bearer <jwt_token>
```

### 練習記錄 API

#### 開始練習
```http
POST /api/practice/sessions/start/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "session_type": "hiragana",
    "categories": ["basic", "dakuten"]
}
```

#### 記錄答題
```http
POST /api/practice/answers/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "session_id": 1,
    "question_kana": "あ",
    "correct_romaji": "a",
    "user_answer": "a",
    "response_time_ms": 1500
}
```

#### 完成練習
```http
POST /api/practice/sessions/{session_id}/complete/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "total_questions": 20,
    "correct_answers": 18,
    "duration_seconds": 300
}
```

#### 獲取練習記錄
```http
GET /api/practice/sessions/
Authorization: Bearer <jwt_token>
```

#### 獲取學習統計
```http
GET /api/practice/statistics/
Authorization: Bearer <jwt_token>
```

## 🗄️ 資料庫模型

### 使用者 (User)
- 自定義 Django 使用者模型
- 支援使用者名稱/郵箱登入
- 多語言偏好設定

### 練習記錄 (PracticeSession)
- 記錄每次練習的基本資訊
- 支援多種假名類型和類別組合
- 計算正確率和練習時長

### 答題記錄 (AnswerRecord)
- 詳細記錄每個問題的答題情況
- 記錄反應時間
- 支援多種正確答案格式

### 學習統計 (LearningStatistics)
- 按假名類型和類別統計學習情況
- 動態更新正確率
- 追蹤最後練習時間

## 🔒 安全特性

- JWT Token 認證
- 密碼強度驗證
- CORS 跨域保護
- SQL 注入防護 (Django ORM)
- XSS 防護

## 🚀 部署指南

### Oracle VM 部署

1. **安裝依賴**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv mysql-server nginx
```

2. **設置 MySQL**
```bash
sudo mysql_secure_installation
sudo mysql -u root -p
CREATE DATABASE kana_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kana_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON kana_practice.* TO 'kana_user'@'localhost';
FLUSH PRIVILEGES;
```

3. **部署應用**
```bash
cd /home/user/projects/kana-practice/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
```

4. **設置 Gunicorn**
```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:8001 kana_practice.wsgi:application
```

5. **設置 Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /static/ {
        alias /path/to/staticfiles/;
    }
}
```

## 📝 開發說明

### 新增 API 端點

1. 在對應的 `models.py` 中定義資料模型
2. 在 `serializers.py` 中建立序列化器
3. 在 `views.py` 中實現視圖邏輯
4. 在 `urls.py` 中配置 URL 路由
5. 執行 `python manage.py makemigrations` 和 `python manage.py migrate`

### 測試

```bash
# 執行所有測試
python manage.py test

# 執行特定應用的測試
python manage.py test accounts
python manage.py test practice
```

## 🆘 常見問題

### Q: MySQL 連接錯誤
A: 確認 MySQL 服務正在運行，並檢查 `.env` 檔案中的資料庫設定。

### Q: JWT Token 無效
A: 檢查 token 是否過期，或者 JWT_SECRET_KEY 設定是否正確。

### Q: CORS 錯誤
A: 確認前端域名已加入到 `CORS_ALLOWED_ORIGINS` 設定中。

## 📞 技術支援

如有問題請聯繫開發者或提交 Issue。