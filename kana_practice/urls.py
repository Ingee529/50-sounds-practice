"""
URL configuration for kana_practice project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_health(request):
    return JsonResponse({'status': 'ok', 'message': 'API is working'})

urlpatterns = [
    path('secret-admin-a3753211e81c54ef/', admin.site.urls),
    path('api/', api_health, name='api_health'),
    path('api/auth/', include('accounts.urls')),
    path('api/practice/', include('practice.urls')),
]