"""
練習記錄相關 URL 配置
"""
from django.urls import path
from . import views

urlpatterns = [
    # 練習記錄管理
    path('sessions/start/', views.start_session, name='start_session'),
    path('sessions/<int:session_id>/complete/', views.complete_session, name='complete_session'),
    path('sessions/', views.session_list, name='session_list'),
    path('sessions/<int:session_id>/', views.session_detail, name='session_detail'),
    
    # 答題記錄
    path('answers/', views.record_answer, name='record_answer'),
    
    # 學習統計
    path('statistics/', views.learning_statistics, name='learning_statistics'),
]