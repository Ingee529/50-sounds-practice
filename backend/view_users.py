#!/usr/bin/env python
"""
查看註冊用戶腳本
"""
import os
import django

# 設置 Django 環境
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kana_practice.settings')
django.setup()

from django.contrib.auth import get_user_model
from practice.models import PracticeSession, AnswerRecord, LearningStatistics

User = get_user_model()

print("=" * 50)
print("📊 用戶資料總覽")
print("=" * 50)

users = User.objects.all()
print(f"📋 總用戶數：{users.count()}")
print()

for user in users:
    print(f"👤 用戶 #{user.id}")
    print(f"   用戶名：{user.username}")
    print(f"   郵箱：{user.email}")
    print(f"   顯示名稱：{user.display_name or '無'}")
    print(f"   偏好語言：{user.preferred_language}")
    print(f"   註冊時間：{user.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"   最後登入：{user.last_login_at.strftime('%Y-%m-%d %H:%M:%S') if user.last_login_at else '從未登入'}")
    print(f"   是否管理員：{'是' if user.is_staff else '否'}")
    
    # 練習記錄統計
    practice_count = PracticeSession.objects.filter(user=user).count()
    answer_count = AnswerRecord.objects.filter(session__user=user).count()
    stats_count = LearningStatistics.objects.filter(user=user).count()
    
    print(f"   練習記錄：{practice_count} 次")
    print(f"   答題記錄：{answer_count} 題")
    print(f"   學習統計：{stats_count} 項")
    print("-" * 30)

print("=" * 50)
print("📈 資料庫統計")
print("=" * 50)
print(f"練習記錄總數：{PracticeSession.objects.count()}")
print(f"答題記錄總數：{AnswerRecord.objects.count()}")
print(f"學習統計總數：{LearningStatistics.objects.count()}")

# 如果有練習記錄，顯示最近的幾筆
recent_sessions = PracticeSession.objects.filter(completed_at__isnull=False).order_by('-started_at')[:3]
if recent_sessions.exists():
    print(f"\n📝 最近的練習記錄：")
    for session in recent_sessions:
        print(f"   {session.user.username} - {session.get_session_type_display()} - 正確率: {session.accuracy_rate}% ({session.started_at.strftime('%Y-%m-%d %H:%M')})")