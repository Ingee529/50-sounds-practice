"""
Google OAuth 認證服務
"""
import json
from google.auth.transport import requests
from google.oauth2 import id_token
from django.conf import settings
from django.contrib.auth import get_user_model
from .authentication import generate_jwt_token

User = get_user_model()


class GoogleOAuthService:
    """Google OAuth 服務類別"""
    
    @staticmethod
    def verify_google_token(token):
        """驗證 Google ID Token"""
        try:
            # 驗證 token
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                settings.GOOGLE_OAUTH2_CLIENT_ID
            )
            
            # 檢查發行者
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Invalid issuer')
            
            return idinfo
            
        except ValueError as e:
            return None
    
    @staticmethod
    def get_or_create_user(google_user_info):
        """根據 Google 用戶信息獲取或創建用戶"""
        google_id = google_user_info.get('sub')
        email = google_user_info.get('email')
        name = google_user_info.get('name', '')
        picture = google_user_info.get('picture', '')
        
        if not google_id or not email:
            raise ValueError('Missing required Google user information')
        
        # 嘗試根據 Google ID 查找用戶
        try:
            user = User.objects.get(oauth_provider='google', oauth_id=google_id)
            # 更新用戶信息
            user.email = email
            user.display_name = name
            user.avatar_url = picture
            user.save()
            return user, False  # 現有用戶
            
        except User.DoesNotExist:
            # 檢查是否已有相同郵箱的用戶
            try:
                existing_user = User.objects.get(email=email)
                # 如果是郵箱註冊的用戶，升級為 Google OAuth
                if existing_user.oauth_provider == 'email':
                    existing_user.oauth_provider = 'google'
                    existing_user.oauth_id = google_id
                    existing_user.display_name = name or existing_user.display_name
                    existing_user.avatar_url = picture
                    existing_user.save()
                    return existing_user, False
                else:
                    raise ValueError('Email already registered with different OAuth provider')
                    
            except User.DoesNotExist:
                # 創建新用戶
                username = email.split('@')[0]
                # 確保用戶名唯一
                base_username = username
                counter = 1
                while User.objects.filter(username=username).exists():
                    username = f"{base_username}_{counter}"
                    counter += 1
                
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    display_name=name,
                    oauth_provider='google',
                    oauth_id=google_id,
                    avatar_url=picture,
                    preferred_language='zh'
                )
                return user, True  # 新用戶
    
    @staticmethod
    def authenticate_google_user(token):
        """Google OAuth 認證流程"""
        # 驗證 Google token
        google_user_info = GoogleOAuthService.verify_google_token(token)
        if not google_user_info:
            return None, 'Invalid Google token'
        
        try:
            # 獲取或創建用戶
            user, is_new = GoogleOAuthService.get_or_create_user(google_user_info)
            
            # 生成 JWT token
            jwt_token = generate_jwt_token(user)
            
            return {
                'user': user,
                'token': jwt_token,
                'is_new': is_new
            }, None
            
        except ValueError as e:
            return None, str(e)
        except Exception as e:
            return None, f'Authentication failed: {str(e)}'