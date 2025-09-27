"""
自定義 JWT 認證
"""
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import authentication, exceptions

User = get_user_model()


class JWTAuthentication(authentication.BaseAuthentication):
    """JWT 認證類別"""
    
    def authenticate(self, request):
        """驗證 JWT Token"""
        auth_header = authentication.get_authorization_header(request).split()
        
        if not auth_header or auth_header[0].lower() != b'bearer':
            return None
        
        if len(auth_header) == 1:
            msg = '無效的 token header。沒有提供認證憑證。'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth_header) > 2:
            msg = '無效的 token header。token 字串不應包含空格。'
            raise exceptions.AuthenticationFailed(msg)
        
        try:
            token = auth_header[1].decode('utf-8')
        except UnicodeError:
            msg = '無效的 token header。token 字串包含無效字符。'
            raise exceptions.AuthenticationFailed(msg)
        
        return self.authenticate_credentials(token)
    
    def authenticate_credentials(self, token):
        """驗證 token 憑證"""
        try:
            payload = jwt.decode(
                token, 
                settings.JWT_SECRET_KEY, 
                algorithms=[settings.JWT_ALGORITHM]
            )
        except jwt.ExpiredSignatureError:
            msg = 'Token 已過期。'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = 'Token 解碼錯誤。'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            msg = '無效的 token。'
            raise exceptions.AuthenticationFailed(msg)
        
        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            msg = '找不到對應的使用者。'
            raise exceptions.AuthenticationFailed(msg)
        
        if not user.is_active:
            msg = '使用者帳號已停用。'
            raise exceptions.AuthenticationFailed(msg)
        
        return (user, token)


def generate_jwt_token(user):
    """產生 JWT Token"""
    payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRATION_HOURS),
        'iat': datetime.utcnow(),
    }
    
    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )
    
    return token