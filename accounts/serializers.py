"""
序列化器
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    """使用者註冊序列化器"""
    
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'display_name', 'preferred_language']
    
    def validate_username(self, value):
        """驗證使用者名稱"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('此使用者名稱已被使用')
        return value
    
    def validate_email(self, value):
        """驗證電子郵件"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('此電子郵件已被註冊')
        return value
    
    def validate(self, attrs):
        """驗證密碼一致性"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': '密碼確認不一致'})
        
        # 驗證密碼強度
        try:
            validate_password(attrs['password'])
        except ValidationError as e:
            raise serializers.ValidationError({'password': list(e.messages)})
        
        return attrs
    
    def create(self, validated_data):
        """建立使用者"""
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        
        return user


class UserLoginSerializer(serializers.Serializer):
    """使用者登入序列化器"""
    
    identifier = serializers.CharField(help_text='使用者名稱或電子郵件')
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        """驗證登入資訊"""
        identifier = attrs.get('identifier')
        password = attrs.get('password')
        
        if not identifier or not password:
            raise serializers.ValidationError('請提供使用者名稱/郵箱和密碼')
        
        # 嘗試用使用者名稱或郵箱登入
        user = None
        if '@' in identifier:
            try:
                user_obj = User.objects.get(email=identifier)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        else:
            user = authenticate(username=identifier, password=password)
        
        if not user:
            raise serializers.ValidationError('使用者名稱/郵箱或密碼錯誤')
        
        if not user.is_active:
            raise serializers.ValidationError('帳號已被停用')
        
        attrs['user'] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """使用者資料序列化器"""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'display_name', 
            'preferred_language', 'created_at', 'last_login_at'
        ]
        read_only_fields = ['id', 'username', 'email', 'created_at', 'last_login_at']


class UserUpdateSerializer(serializers.ModelSerializer):
    """使用者更新序列化器"""
    
    class Meta:
        model = User
        fields = ['display_name', 'preferred_language']
    
    def update(self, instance, validated_data):
        """更新使用者資料"""
        instance.display_name = validated_data.get('display_name', instance.display_name)
        instance.preferred_language = validated_data.get('preferred_language', instance.preferred_language)
        instance.save()
        return instance