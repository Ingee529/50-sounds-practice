"""
練習記錄序列化器
"""
from rest_framework import serializers
from .models import PracticeSession, AnswerRecord, LearningStatistics
from accounts.serializers import UserProfileSerializer


class AnswerRecordSerializer(serializers.ModelSerializer):
    """答題記錄序列化器"""
    
    class Meta:
        model = AnswerRecord
        fields = [
            'question_kana', 'correct_romaji', 'user_answer', 
            'is_correct', 'response_time_ms', 'created_at'
        ]
        read_only_fields = ['created_at']


class PracticeSessionSerializer(serializers.ModelSerializer):
    """練習記錄序列化器"""
    
    user = UserProfileSerializer(read_only=True)
    answer_records = AnswerRecordSerializer(many=True, read_only=True)
    
    class Meta:
        model = PracticeSession
        fields = [
            'id', 'user', 'session_type', 'categories', 
            'total_questions', 'correct_answers', 'accuracy_rate',
            'duration_seconds', 'started_at', 'completed_at', 'answer_records'
        ]
        read_only_fields = ['id', 'started_at', 'completed_at']


class PracticeSessionCreateSerializer(serializers.ModelSerializer):
    """建立練習記錄序列化器"""
    
    class Meta:
        model = PracticeSession
        fields = ['session_type', 'categories']
    
    def validate_categories(self, value):
        """驗證練習類別"""
        valid_categories = ['basic', 'dakuten', 'handakuten', 'youon']
        
        if not value:
            raise serializers.ValidationError('至少需要選擇一個練習類別')
        
        for category in value:
            if category not in valid_categories:
                raise serializers.ValidationError(f'無效的練習類別: {category}')
        
        return value
    
    def create(self, validated_data):
        """建立練習記錄"""
        validated_data['user'] = self.context['request'].user
        validated_data['total_questions'] = 0
        validated_data['correct_answers'] = 0
        validated_data['accuracy_rate'] = 0.00
        validated_data['duration_seconds'] = 0
        
        return super().create(validated_data)


class PracticeSessionCompleteSerializer(serializers.ModelSerializer):
    """完成練習記錄序列化器"""
    
    class Meta:
        model = PracticeSession
        fields = ['total_questions', 'correct_answers', 'duration_seconds']
    
    def validate(self, attrs):
        """驗證完成資料"""
        total_questions = attrs.get('total_questions', 0)
        correct_answers = attrs.get('correct_answers', 0)
        
        if total_questions <= 0:
            raise serializers.ValidationError('總題數必須大於 0')
        
        if correct_answers < 0 or correct_answers > total_questions:
            raise serializers.ValidationError('答對題數不能小於 0 或大於總題數')
        
        return attrs
    
    def update(self, instance, validated_data):
        """更新練習記錄"""
        from datetime import datetime
        
        instance.total_questions = validated_data['total_questions']
        instance.correct_answers = validated_data['correct_answers']
        instance.duration_seconds = validated_data['duration_seconds']
        instance.completed_at = datetime.now()
        
        # 計算正確率
        if instance.total_questions > 0:
            instance.accuracy_rate = round(
                (instance.correct_answers / instance.total_questions) * 100, 2
            )
        
        instance.save()
        return instance


class AnswerRecordCreateSerializer(serializers.ModelSerializer):
    """建立答題記錄序列化器"""
    
    session_id = serializers.IntegerField()
    
    class Meta:
        model = AnswerRecord
        fields = [
            'session_id', 'question_kana', 'correct_romaji', 
            'user_answer', 'response_time_ms'
        ]
    
    def validate_session_id(self, value):
        """驗證練習記錄 ID"""
        user = self.context['request'].user
        
        try:
            session = PracticeSession.objects.get(id=value, user=user)
            if session.completed_at:
                raise serializers.ValidationError('此練習記錄已完成')
        except PracticeSession.DoesNotExist:
            raise serializers.ValidationError('找不到對應的練習記錄')
        
        return value
    
    def create(self, validated_data):
        """建立答題記錄"""
        session_id = validated_data.pop('session_id')
        session = PracticeSession.objects.get(id=session_id)
        
        # 判斷答案是否正確
        correct_romaji = validated_data['correct_romaji']
        user_answer = validated_data['user_answer'].lower().strip()
        
        # 處理多種正確答案的情況
        correct_answers = []
        if '/' in correct_romaji:
            correct_answers = [ans.strip().lower() for ans in correct_romaji.split('/')]
        else:
            correct_answers = [correct_romaji.lower()]
        
        # 特殊假名處理
        kana = validated_data['question_kana']
        if kana in ['を', 'ヲ']:
            correct_answers.extend(['wo', 'o'])
        elif kana in ['ぢ', 'ヂ']:
            correct_answers.extend(['di', 'ji'])
        elif kana in ['づ', 'ヅ']:
            correct_answers.extend(['du', 'zu'])
        elif kana in ['じ', 'ジ']:
            correct_answers.extend(['ji', 'zi'])
        
        validated_data['is_correct'] = user_answer in correct_answers
        validated_data['session'] = session
        
        return super().create(validated_data)


class LearningStatisticsSerializer(serializers.ModelSerializer):
    """學習統計序列化器"""
    
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = LearningStatistics
        fields = [
            'user', 'kana_type', 'category', 'total_attempts',
            'correct_attempts', 'accuracy_rate', 'last_practiced_at'
        ]