"""
練習記錄模型
"""
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class PracticeSession(models.Model):
    """練習記錄"""
    
    SESSION_TYPE_CHOICES = [
        ('hiragana', '平假名'),
        ('katakana', '片假名'),
        ('mixed', '混合練習'),
    ]
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='practice_sessions',
        verbose_name='使用者'
    )
    session_type = models.CharField(
        max_length=20,
        choices=SESSION_TYPE_CHOICES,
        verbose_name='練習類型'
    )
    categories = models.JSONField(
        default=list,
        verbose_name='練習類別',
        help_text='例：["basic", "dakuten", "handakuten", "youon"]'
    )
    total_questions = models.PositiveIntegerField(verbose_name='總題數')
    correct_answers = models.PositiveIntegerField(verbose_name='答對題數')
    accuracy_rate = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        verbose_name='正確率'
    )
    duration_seconds = models.PositiveIntegerField(verbose_name='練習時長(秒)')
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='開始時間')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='完成時間')
    
    class Meta:
        db_table = 'practice_sessions'
        verbose_name = '練習記錄'
        verbose_name_plural = '練習記錄'
        ordering = ['-started_at']
    
    def __str__(self):
        return f'{self.user.username} - {self.get_session_type_display()} ({self.started_at.strftime("%Y-%m-%d")})'


class AnswerRecord(models.Model):
    """答題記錄"""
    
    session = models.ForeignKey(
        PracticeSession,
        on_delete=models.CASCADE,
        related_name='answer_records',
        verbose_name='練習記錄'
    )
    question_kana = models.CharField(max_length=10, verbose_name='題目假名')
    correct_romaji = models.CharField(max_length=20, verbose_name='正確羅馬拼音')
    user_answer = models.CharField(max_length=20, verbose_name='使用者答案')
    is_correct = models.BooleanField(verbose_name='是否正確')
    response_time_ms = models.PositiveIntegerField(verbose_name='回答時間(毫秒)')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='答題時間')
    
    class Meta:
        db_table = 'answer_records'
        verbose_name = '答題記錄'
        verbose_name_plural = '答題記錄'
        ordering = ['created_at']
    
    def __str__(self):
        return f'{self.question_kana} -> {self.user_answer} ({"✓" if self.is_correct else "✗"})'


class LearningStatistics(models.Model):
    """學習統計"""
    
    KANA_TYPE_CHOICES = [
        ('hiragana', '平假名'),
        ('katakana', '片假名'),
    ]
    
    CATEGORY_CHOICES = [
        ('basic', '基本音'),
        ('dakuten', '濁音'),
        ('handakuten', '半濁音'),
        ('youon', '拗音'),
    ]
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='learning_statistics',
        verbose_name='使用者'
    )
    kana_type = models.CharField(
        max_length=20,
        choices=KANA_TYPE_CHOICES,
        verbose_name='假名類型'
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name='練習類別'
    )
    total_attempts = models.PositiveIntegerField(default=0, verbose_name='總嘗試次數')
    correct_attempts = models.PositiveIntegerField(default=0, verbose_name='答對次數')
    accuracy_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0.00,
        verbose_name='正確率'
    )
    last_practiced_at = models.DateTimeField(null=True, blank=True, verbose_name='最後練習時間')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新時間')
    
    class Meta:
        db_table = 'learning_statistics'
        verbose_name = '學習統計'
        verbose_name_plural = '學習統計'
        unique_together = ['user', 'kana_type', 'category']
    
    def __str__(self):
        return f'{self.user.username} - {self.get_kana_type_display()}{self.get_category_display()}'
    
    def update_statistics(self, correct_count, total_count):
        """更新統計數據"""
        self.total_attempts += total_count
        self.correct_attempts += correct_count
        
        if self.total_attempts > 0:
            self.accuracy_rate = round(
                (self.correct_attempts / self.total_attempts) * 100, 2
            )
        
        self.save()