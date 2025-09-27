"""
認證相關 URL 配置
"""
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('verify/', views.verify_token, name='verify_token'),
    path('oauth/google/', views.google_oauth_login, name='google_oauth_login'),
]