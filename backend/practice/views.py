"""
練習記錄相關視圖
"""
from datetime import datetime
from django.db.models import Count, Avg, Sum
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import PracticeSession, AnswerRecord, LearningStatistics
from .serializers import (
    PracticeSessionSerializer,
    PracticeSessionCreateSerializer,
    PracticeSessionCompleteSerializer,
    AnswerRecordCreateSerializer,
    LearningStatisticsSerializer,
)


class StandardResultsSetPagination(PageNumberPagination):
    """標準分頁設定"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_session(request):
    """開始練習記錄"""
    serializer = PracticeSessionCreateSerializer(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        session = serializer.save()
        return Response({
            'success': True,
            'message': '練習記錄建立成功',
            'session_id': session.id,
            'session': PracticeSessionSerializer(session).data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def record_answer(request):
    """記錄答題"""
    serializer = AnswerRecordCreateSerializer(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        answer_record = serializer.save()
        return Response({
            'success': True,
            'message': '答題記錄成功',
            'is_correct': answer_record.is_correct
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_session(request, session_id):
    """完成練習記錄"""
    try:
        session = PracticeSession.objects.get(
            id=session_id,
            user=request.user
        )
    except PracticeSession.DoesNotExist:
        return Response({
            'success': False,
            'message': '找不到對應的練習記錄'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if session.completed_at:
        return Response({
            'success': False,
            'message': '此練習記錄已完成'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PracticeSessionCompleteSerializer(
        session,
        data=request.data,
        partial=True
    )
    
    if serializer.is_valid():
        session = serializer.save()
        
        # 更新學習統計
        update_learning_statistics(session)
        
        return Response({
            'success': True,
            'message': '練習完成',
            'session': PracticeSessionSerializer(session).data
        })
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def session_list(request):
    """獲取練習記錄列表"""
    sessions = PracticeSession.objects.filter(
        user=request.user,
        completed_at__isnull=False
    ).order_by('-started_at')
    
    paginator = StandardResultsSetPagination()
    paginated_sessions = paginator.paginate_queryset(sessions, request)
    
    serializer = PracticeSessionSerializer(paginated_sessions, many=True)
    
    return paginator.get_paginated_response({
        'success': True,
        'sessions': serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def session_detail(request, session_id):
    """獲取單個練習記錄詳情"""
    try:
        session = PracticeSession.objects.get(
            id=session_id,
            user=request.user
        )
    except PracticeSession.DoesNotExist:
        return Response({
            'success': False,
            'message': '找不到對應的練習記錄'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PracticeSessionSerializer(session)
    return Response({
        'success': True,
        'session': serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def learning_statistics(request):
    # ==================== 請加入這兩行 ====================
    print(f"[DEBUG] learning_statistics called for user: {request.user.email} (ID: {request.user.id})")
    # ====================================================
    """獲取學習統計"""
    # 總體統計
    overall_stats = PracticeSession.objects.filter(
        user=request.user,
        completed_at__isnull=False
    ).aggregate(
        total_sessions=Count('id'),
        total_questions=Sum('total_questions'),
        total_correct=Sum('correct_answers'),
        avg_accuracy=Avg('accuracy_rate'),
        total_time=Sum('duration_seconds')
    )
    
    # 按類別統計
    category_stats = LearningStatistics.objects.filter(
        user=request.user
    ).order_by('kana_type', 'category')
    
    category_serializer = LearningStatisticsSerializer(category_stats, many=True)
    
    # 最近的練習記錄
    recent_sessions = PracticeSession.objects.filter(
        user=request.user,
        completed_at__isnull=False
    ).order_by('-started_at')[:5]
    
    recent_serializer = PracticeSessionSerializer(recent_sessions, many=True)
    
    return Response({
        'success': True,
        'overall': {
            'total_sessions': overall_stats['total_sessions'] or 0,
            'total_questions': overall_stats['total_questions'] or 0,
            'total_correct': overall_stats['total_correct'] or 0,
            'avg_accuracy': round(overall_stats['avg_accuracy'] or 0, 2),
            'total_time_minutes': round((overall_stats['total_time'] or 0) / 60, 1)
        },
        'by_category': category_serializer.data,
        'recent_sessions': recent_serializer.data
    })


def update_learning_statistics(session):
    """更新學習統計"""
    user = session.user
    categories = session.categories
    
    # 根據 session_type 決定要更新的假名類型
    kana_types = []
    if session.session_type == 'mixed':
        kana_types = ['hiragana', 'katakana']
    else:
        kana_types = [session.session_type]
    
    # 計算每個類別的答題統計
    category_stats = {}
    for answer in session.answer_records.all():
        # 簡單判斷假名類型（實際應用中可能需要更複雜的邏輯）
        kana = answer.question_kana
        kana_type = 'hiragana' if ord(kana[0]) < 0x30A0 else 'katakana'
        
        # 假設可以根據假名推導類別（實際應用中需要更完整的映射）
        for category in categories:
            key = f"{kana_type}_{category}"
            if key not in category_stats:
                category_stats[key] = {'correct': 0, 'total': 0}
            
            category_stats[key]['total'] += 1
            if answer.is_correct:
                category_stats[key]['correct'] += 1
    
    # 更新或建立統計記錄
    for key, stats in category_stats.items():
        kana_type, category = key.split('_')
        
        learning_stat, created = LearningStatistics.objects.get_or_create(
            user=user,
            kana_type=kana_type,
            category=category,
            defaults={
                'total_attempts': 0,
                'correct_attempts': 0,
                'accuracy_rate': 0.00
            }
        )
        
        learning_stat.update_statistics(stats['correct'], stats['total'])
        learning_stat.last_practiced_at = datetime.now()
        learning_stat.save()