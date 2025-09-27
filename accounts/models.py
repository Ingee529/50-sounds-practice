"""
使用者模型
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """自定義使用者模型"""
    
    LANGUAGE_CHOICES = [
        ('zh', '繁體中文'),
        ('en', 'English'),
    ]
    
    OAUTH_PROVIDER_CHOICES = [
        ('email', 'Email'),
        ('google', 'Google'),
    ]
    
    email = models.EmailField(unique=True, verbose_name='電子郵件')
    display_name = models.CharField(
        max_length=100, 
        blank=True, 
        null=True, 
        verbose_name='顯示名稱'
    )
    preferred_language = models.CharField(
        max_length=2,
        choices=LANGUAGE_CHOICES,
        default='zh',
        verbose_name='偏好語言'
    )
    oauth_provider = models.CharField(
        max_length=10,
        choices=OAUTH_PROVIDER_CHOICES,
        default='email',
        verbose_name='登入方式'
    )
    oauth_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name='OAuth ID'
    )
    avatar_url = models.URLField(
        blank=True,
        null=True,
        verbose_name='頭像URL'
    )
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name='出生日期'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='建立時間')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新時間')
    last_login_at = models.DateTimeField(null=True, blank=True, verbose_name='最後登入時間')
    
    class Meta:
        db_table = 'users'
        verbose_name = '使用者'
        verbose_name_plural = '使用者'
    
    def __str__(self):
        return self.username
    
    @property
    def name(self):
        """返回顯示名稱或使用者名稱"""
        return self.display_name or self.username