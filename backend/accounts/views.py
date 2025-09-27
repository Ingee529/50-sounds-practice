"""
認證相關視圖
"""
from datetime import datetime
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserProfileSerializer, 
    UserUpdateSerializer
)
from .authentication import generate_jwt_token
from .google_oauth import GoogleOAuthService

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """使用者註冊"""
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        token = generate_jwt_token(user)
        
        return Response({
            'success': True,
            'message': '註冊成功',
            'user': UserProfileSerializer(user).data,
            'token': token,
            'expires_in': '7 days'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """使用者登入"""
    serializer = UserLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # 更新最後登入時間
        user.last_login_at = datetime.now()
        user.save(update_fields=['last_login_at'])
        
        token = generate_jwt_token(user)
        
        return Response({
            'success': True,
            'message': '登入成功',
            'user': UserProfileSerializer(user).data,
            'token': token,
            'expires_in': '7 days'
        })
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """獲取使用者資料"""
    serializer = UserProfileSerializer(request.user)
    return Response({
        'success': True,
        'user': serializer.data
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """更新使用者資料"""
    serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'success': True,
            'message': '資料更新成功',
            'user': UserProfileSerializer(user).data
        })
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    """驗證 Token"""
    return Response({
        'success': True,
        'message': 'Token 有效',
        'user': UserProfileSerializer(request.user).data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """登出 (前端刪除 token)"""
    return Response({
        'success': True,
        'message': '登出成功'
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def google_oauth_login(request):
    """Google OAuth 登入"""
    token = request.data.get('token')
    if not token:
        return Response({
            'success': False,
            'message': 'Missing Google token'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # 使用 Google OAuth 服務認證
    auth_result, error = GoogleOAuthService.authenticate_google_user(token)
    
    if error:
        return Response({
            'success': False,
            'message': error
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # 更新最後登入時間
    user = auth_result['user']
    user.last_login_at = datetime.now()
    user.save(update_fields=['last_login_at'])
    
    message = '登入成功' if not auth_result['is_new'] else '註冊並登入成功'
    
    return Response({
        'success': True,
        'message': message,
        'user': UserProfileSerializer(user).data,
        'token': auth_result['token'],
        'expires_in': '7 days',
        'is_new_user': auth_result['is_new']
    })