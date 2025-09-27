"""
Admin 管理界面配置
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """使用者管理"""
    
    list_display = ['username', 'email', 'display_name', 'preferred_language', 'is_active', 'created_at']
    list_filter = ['preferred_language', 'is_active', 'is_staff', 'created_at']
    search_fields = ['username', 'email', 'display_name']
    ordering = ['-created_at']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('額外資訊', {
            'fields': ('display_name', 'preferred_language', 'last_login_at')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('額外資訊', {
            'fields': ('email', 'display_name', 'preferred_language')
        }),
    )