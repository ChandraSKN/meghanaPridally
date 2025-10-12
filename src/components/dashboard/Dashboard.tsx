import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MessageCircle, 
  Stethoscope, 
  LogOut, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  User
} from 'lucide-react';
import DailyCheckIn from './DailyCheckIn';
import HealthCalendar from './HealthCalendar';
import DoctorScheduling from './DoctorScheduling';
import HealthChatbot from './HealthChatbot';

type ActiveView = 'overview' | 'checkin' | 'calendar' | 'schedule' | 'chat';

const Dashboard: React.FC = () => {
  const { user, signout } = useAuth();
  const { metrics, hasCompletedToday, hasCompletedAllToday, dailyEntries } = useHealth();
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [selectedHealthCategory, setSelectedHealthCategory] = useState<string | null>(null);

  const completionRate = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    const todayEntry = dailyEntries.find(entry => entry.date === todayString);
    if (!todayEntry) return 0;
    
    const allQuestions = metrics.flatMap(metric => metric.questions);
    const answeredQuestions = allQuestions.filter(q => 
      todayEntry.responses[q.id] !== undefined
    ).length;
    
    return allQuestions.length > 0 
      ? Math.round((answeredQuestions / allQuestions.length) * 100)
      : 0;
  })();

  const currentStreak = () => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const entry = dailyEntries.find(e => e.date === dateString);
      if (entry && entry.completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const handleHealthCardClick = (categoryName: string) => {
    setSelectedHealthCategory(categoryName);
    setActiveView('checkin');
  };

  const getCategoryProgress = (categoryName: string) => {
    // Find the metric for this category
    const metric = metrics.find(m => m.name.includes(categoryName.split(' ')[0]));
    if (!metric) return 0;
    
    // Check today's entry for this category's questions
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    const todayEntry = dailyEntries.find(entry => entry.date === todayString);
    if (!todayEntry) return 0;
    
    const answeredQuestions = metric.questions.filter(q => 
      todayEntry.responses[q.id] !== undefined
    ).length;
    
    return Math.round((answeredQuestions / metric.questions.length) * 100);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'checkin':
        return <DailyCheckIn 
          onComplete={() => {
            setActiveView('overview');
            setSelectedHealthCategory(null);
          }}
          focusCategory={selectedHealthCategory}
        />;
      case 'calendar':
        return <HealthCalendar />;
      case 'schedule':
        return <DoctorScheduling />;
      case 'chat':
        return <HealthChatbot />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Welcome to <span className="text-purple-600">Pridally</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your Wellness Journey • Friday, October 10 🎃
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-purple-600">{completionRate}% Complete</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>📊</span>
                  <span>👤</span>
                </div>
              </div>
            </div>

            {/* Main Purple Card */}
            <Card className="bg-gradient-primary text-white shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                  Supporting with love and intention 💝
                </CardTitle>
                <CardDescription className="text-white/90 text-sm">
                  Explore resources to better support your loved ones and create inclusive spaces when healing flourishes
                </CardDescription>
                
                <div className="grid grid-cols-4 gap-6 mt-6">
                  <div>
                    <div className="text-xs text-white/80">Overall Progress</div>
                    <div className="text-2xl font-bold">{completionRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/80">Milestones</div>
                    <div className="text-2xl font-bold">2 achieved</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/80">Chat Goals</div>
                    <div className="text-2xl font-bold">12 this week</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/80">Streak</div>
                    <div className="text-2xl font-bold">{currentStreak()} days</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Support Resources */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Support Resources</h2>
              <div className="grid grid-cols-4 gap-4">
                <Card 
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('chat')}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium">Chat with LiLo</div>
                </Card>
                
                <Card 
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('schedule')}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">Schedule Check In</div>
                </Card>
                
                <Card 
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => window.open('#', '_self')}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">Browse Resources</div>
                </Card>
                
                <Card 
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => window.open('#', '_self')}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium">Community</div>
                </Card>
              </div>
            </div>

            {/* Health Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mental Health */}
              <Card 
                className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleHealthCardClick('Mental Health')}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">M</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple-600">Mental Health</h3>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{getCategoryProgress('Mental Health')}%</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Emotional well-being and mental health support
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Ally Resources</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Comprehensive guides, communication tools, and educational materials to support your loved ones in this dimension
                    </p>
                    <Button variant="link" className="text-purple-600 p-0 h-auto text-xs">
                      Explore Resources →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Health */}
              <Card 
                className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleHealthCardClick('Physical Health')}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">P</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-600">Physical Health</h3>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{getCategoryProgress('Physical Health')}%</div>
                      <div className="text-xs text-green-600">+6%</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Body wellness and physical care
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Ally Resources</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Comprehensive guides, communication tools, and educational materials to support your loved ones in this dimension
                    </p>
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-xs">
                      Explore Resources →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Health */}
              <Card 
                className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleHealthCardClick('Social Health')}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-bold">S</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-teal-600">Social Health</h3>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{getCategoryProgress('Social Health')}%</div>
                      <div className="text-xs text-red-500">-5%</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Community connection and relationships
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Ally Resources</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Comprehensive guides, communication tools, and educational materials to support your loved ones in this dimension
                    </p>
                    <Button variant="link" className="text-teal-600 p-0 h-auto text-xs">
                      Explore Resources →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sexual Health */}
              <Card 
                className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleHealthCardClick('Sexual Health')}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-bold">❤️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-pink-600">Sexual Health</h3>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{getCategoryProgress('Sexual Health')}%</div>
                      <div className="text-xs text-red-500">-8%</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sexual wellness and intimate health
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Ally Resources</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Comprehensive guides, communication tools, and educational materials to support your loved ones in this dimension
                    </p>
                    <Button variant="link" className="text-pink-600 p-0 h-auto text-xs">
                      Explore Resources →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reproductive Health - Full Width */}
            <Card 
              className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleHealthCardClick('Reproductive Health')}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">R</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Reproductive Health</h3>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{getCategoryProgress('Reproductive Health')}%</div>
                    <div className="text-xs text-green-600">+5%</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Reproductive care and family planning
                </p>
                <div>
                  <h4 className="font-medium text-sm mb-2">Ally Resources</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Comprehensive guides, communication tools, and educational materials to support your loved ones in this dimension
                  </p>
                  <Button variant="link" className="text-red-600 p-0 h-auto text-xs">
                    Explore Resources →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Action */}
            {!hasCompletedAllToday() && (
              <Card className="bg-gradient-primary text-white animate-fade-in">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Ready for Today's Check-in?</h3>
                  <p className="text-white/90 mb-4">
                    Complete your daily wellness assessment to maintain your {currentStreak()}-day streak
                  </p>
                  <Button 
                    onClick={() => setActiveView('checkin')}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Start Daily Check-in
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">
                <span className="text-blue-600">🦋</span>
                PRIDallY
              </h1>
              <Badge variant="outline" className="hidden md:flex">
                Daily Health Tracker
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeView === 'overview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('overview')}
              >
                Overview
              </Button>
              <Button
                variant={activeView === 'checkin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('checkin')}
                disabled={hasCompletedAllToday()}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Check-in
              </Button>
              <Button
                variant={activeView === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('calendar')}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Calendar
              </Button>
              <Button
                variant={activeView === 'schedule' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('schedule')}
              >
                <Stethoscope className="h-4 w-4 mr-1" />
                Schedule
              </Button>
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={signout}
                className="ml-4"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Dashboard;