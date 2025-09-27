#!/usr/bin/env python
"""
建立管理員用戶腳本
"""
import os
import django

# 設置 Django 環境
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kana_practice.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# 建立超級用戶
admin_username = 'admin'
admin_email = 'admin@example.com'
admin_password = 'admin123'

if not User.objects.filter(username=admin_username).exists():
    User.objects.create_superuser(
        username=admin_username,
        email=admin_email,
        password=admin_password
    )
    print(f"✅ 管理員帳號建立成功！")
    print(f"   用戶名：{admin_username}")
    print(f"   郵箱：{admin_email}")
    print(f"   密碼：{admin_password}")
    print(f"   管理後台：http://127.0.0.1:8001/admin/")
else:
    print(f"ℹ️  管理員帳號已存在：{admin_username}")