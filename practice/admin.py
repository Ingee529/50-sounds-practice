"""
Practice Admin 管理界面配置
"""
from django.contrib import admin
from .models import PracticeSession, AnswerRecord, LearningStatistics


@admin.register(PracticeSession)
class PracticeSessionAdmin(admin.ModelAdmin):
    """練習記錄管理"""
    
    list_display = [
        'user', 'session_type', 'total_questions', 'correct_answers', 
        'accuracy_rate', 'duration_seconds', 'started_at'
    ]
    list_filter = ['session_type', 'started_at']
    search_fields = ['user__username', 'user__email']
    ordering = ['-started_at']
    readonly_fields = ['started_at', 'completed_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(AnswerRecord) 
class AnswerRecordAdmin(admin.ModelAdmin):
    """答題記錄管理"""
    
    list_display = [
        'session', 'question_kana', 'correct_romaji', 
        'user_answer', 'is_correct', 'response_time_ms', 'created_at'
    ]
    list_filter = ['is_correct', 'created_at']
    search_fields = ['question_kana', 'correct_romaji', 'user_answer']
    ordering = ['-created_at']
    readonly_fields = ['created_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('session', 'session__user')


@admin.register(LearningStatistics)
class LearningStatisticsAdmin(admin.ModelAdmin):
    """學習統計管理"""
    
    list_display = [
        'user', 'kana_type', 'category', 'total_attempts', 
        'correct_attempts', 'accuracy_rate', 'last_practiced_at'
    ]
    list_filter = ['kana_type', 'category', 'last_practiced_at']
    search_fields = ['user__username', 'user__email']
    ordering = ['-last_practiced_at']
    readonly_fields = ['updated_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')