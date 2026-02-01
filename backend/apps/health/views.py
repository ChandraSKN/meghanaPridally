from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from .models import DailyCheckIn, HealthGoal, HealthMetric
from .serializers import (
    DailyCheckInSerializer, HealthGoalSerializer, HealthMetricSerializer,
    CheckInStatsSerializer
)

class DailyCheckInViewSet(viewsets.ModelViewSet):
    """ViewSet for Daily Check-in operations"""
    serializer_class = DailyCheckInSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return DailyCheckIn.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's check-in"""
        today = timezone.now().date()
        try:
            checkin = DailyCheckIn.objects.get(user=request.user, check_in_date=today)
            serializer = self.get_serializer(checkin)
            return Response(serializer.data)
        except DailyCheckIn.DoesNotExist:
            return Response({'detail': 'No check-in for today'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def weekly(self, request):
        """Get past 7 days check-ins"""
        today = timezone.now().date()
        seven_days_ago = today - timedelta(days=7)
        
        checkins = DailyCheckIn.objects.filter(
            user=request.user,
            check_in_date__gte=seven_days_ago
        ).order_by('-check_in_date')
        
        serializer = self.get_serializer(checkins, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def monthly(self, request):
        """Get past 30 days check-ins"""
        today = timezone.now().date()
        thirty_days_ago = today - timedelta(days=30)
        
        checkins = DailyCheckIn.objects.filter(
            user=request.user,
            check_in_date__gte=thirty_days_ago
        ).order_by('-check_in_date')
        
        serializer = self.get_serializer(checkins, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get check-in statistics"""
        today = timezone.now().date()
        thirty_days_ago = today - timedelta(days=30)
        
        checkins = DailyCheckIn.objects.filter(
            user=request.user,
            check_in_date__gte=thirty_days_ago
        )
        
        if not checkins.exists():
            return Response({'detail': 'No check-ins available'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate stats
        moods = [c.mood for c in checkins]
        energies = [c.energy_level for c in checkins]
        avg_sleep = sum([c.sleep_hours for c in checkins]) / len(checkins)
        total_exercise = sum([c.exercise_minutes for c in checkins])
        
        stats_data = {
            'total_checkins': len(checkins),
            'average_mood': max(moods, key=moods.count) if moods else 'N/A',
            'average_energy': max(energies, key=energies.count) if energies else 'N/A',
            'average_sleep': round(avg_sleep, 2),
            'total_exercise_minutes': total_exercise,
        }
        
        serializer = CheckInStatsSerializer(stats_data)
        return Response(serializer.data)


class HealthGoalViewSet(viewsets.ModelViewSet):
    """ViewSet for Health Goals"""
    serializer_class = HealthGoalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return HealthGoal.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active health goals"""
        goals = HealthGoal.objects.filter(user=request.user, is_active=True)
        serializer = self.get_serializer(goals, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        """Update goal progress"""
        goal = self.get_object()
        goal.progress = request.data.get('progress', goal.progress)
        goal.save()
        serializer = self.get_serializer(goal)
        return Response(serializer.data)


class HealthMetricViewSet(viewsets.ModelViewSet):
    """ViewSet for Health Metrics"""
    serializer_class = HealthMetricSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return HealthMetric.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get metrics by type"""
        metric_type = request.query_params.get('type')
        if not metric_type:
            return Response({'detail': 'metric_type parameter required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        metrics = HealthMetric.objects.filter(
            user=request.user,
            metric_type=metric_type
        ).order_by('-recorded_at')[:50]
        
        serializer = self.get_serializer(metrics, many=True)
        return Response(serializer.data)
