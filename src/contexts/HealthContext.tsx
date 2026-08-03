import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { checkinsApi, type DailyCheckIn as ApiDailyCheckIn } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export interface HealthMetric {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  questions: {
    id: string;
    question: string;
    type: 'scale' | 'boolean' | 'text';
    scale?: { min: number; max: number; labels: string[] };
  }[];
}

export interface DailyEntry {
  date: string;
  responses: Record<string, unknown>;
  completed: boolean;
}

interface HealthContextType {
  metrics: HealthMetric[];
  dailyEntries: DailyEntry[];
  isLoading: boolean;
  hasCompletedToday: () => boolean;
  hasCompletedAllToday: () => boolean;
  submitDailyEntry: (responses: Record<string, unknown>) => void;
  getDailyEntry: (date: string) => DailyEntry | undefined;
}

const toEntry = (checkin: ApiDailyCheckIn): DailyEntry => ({
  date: checkin.check_in_date,
  responses: checkin.responses,
  completed: true,
});

const healthMetrics: HealthMetric[] = [
  {
    id: 'mood',
    name: 'Mental Health',
    icon: '🧠',
    color: 'medical-blue',
    description: 'Track your emotional wellbeing and mental state',
    questions: [
      {
        id: 'mood_rating',
        question: 'How would you rate your overall mood today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'] }
      },
      {
        id: 'stress_level',
        question: 'How stressed do you feel today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['No Stress', 'Low', 'Moderate', 'High', 'Very High'] }
      },
      {
        id: 'anxiety',
        question: 'Did you experience anxiety today?',
        type: 'boolean'
      }
    ]
  },
  {
    id: 'sexual_health',
    name: 'Sexual Health',
    icon: '💕',
    color: 'calm-purple',
    description: 'Track your sexual wellness and intimate health',
    questions: [
      {
        id: 'sexual_satisfaction',
        question: 'How satisfied are you with your sexual life?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'] }
      },
      {
        id: 'sexual_comfort',
        question: 'How comfortable do you feel discussing sexual health?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'] }
      },
      {
        id: 'sexual_wellness_concern',
        question: 'Do you have any concerns about your sexual health?',
        type: 'boolean'
      }
    ]
  },
  {
    id: 'exercise',
    name: 'Physical Health',
    icon: '💪',
    color: 'energy-orange',
    description: 'Track your exercise and physical activity levels',
    questions: [
      {
        id: 'exercise_duration',
        question: 'How many minutes of exercise did you do today?',
        type: 'scale',
        scale: { min: 0, max: 120, labels: ['None', '1-15m', '16-30m', '31-60m', '60+m'] }
      },
      {
        id: 'exercise_intensity',
        question: 'How intense was your physical activity?',
        type: 'scale',
        scale: { min: 1, max: 5, labels: ['Light', 'Light-Moderate', 'Moderate', 'Vigorous', 'Very Vigorous'] }
      },
      {
        id: 'energy_level',
        question: 'How is your energy level today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Low', 'Low', 'Fair', 'High', 'Very High'] }
      }
    ]
  },
  {
    id: 'reproductive_health',
    name: 'Reproductive Health',
    icon: '🌸',
    color: 'wellness-green',
    description: 'Monitor your reproductive wellness and menstrual health',
    questions: [
      {
        id: 'menstrual_cycle',
        question: 'Are you currently tracking your menstrual cycle?',
        type: 'boolean'
      },
      {
        id: 'reproductive_concerns',
        question: 'Do you have any reproductive health concerns?',
        type: 'boolean'
      },
      {
        id: 'contraceptive_satisfaction',
        question: 'How satisfied are you with your current contraceptive method (if applicable)?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'] }
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Health',
    icon: '👥',
    color: 'focus-indigo',
    description: 'Track your social interactions and relationships',
    questions: [
      {
        id: 'social_interaction',
        question: 'How much meaningful social interaction did you have today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['None', 'Very Little', 'Some', 'Good Amount', 'Plenty'] }
      },
      {
        id: 'support_system',
        question: 'Do you feel supported by friends/family?',
        type: 'boolean'
      },
      {
        id: 'loneliness',
        question: 'Did you feel lonely today?',
        type: 'boolean'
      }
    ]
  }
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setDailyEntries([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    checkinsApi
      .weekly()
      .then((checkins) => {
        if (!cancelled) setDailyEntries(checkins.map(toEntry));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hasCompletedToday = () => {
    const todayEntry = dailyEntries.find(entry => entry.date === getTodayString());
    if (!todayEntry) return false;
    
    // Check if all categories have at least one response
    const allQuestions = healthMetrics.flatMap(metric => metric.questions);
    const answeredQuestions = allQuestions.filter(q => 
      todayEntry.responses[q.id] !== undefined
    );
    
    return answeredQuestions.length > 0; // Has some progress
  };

  const hasCompletedAllToday = () => {
    const todayEntry = dailyEntries.find(entry => entry.date === getTodayString());
    if (!todayEntry) return false;
    
    // Check if all questions are answered
    const allQuestions = healthMetrics.flatMap(metric => metric.questions);
    return allQuestions.every(q => todayEntry.responses[q.id] !== undefined);
  };

  const submitDailyEntry = useCallback((responses: Record<string, unknown>) => {
    const today = getTodayString();

    // Optimistically merge into local state so the UI updates immediately.
    setDailyEntries((prev) => {
      const existingEntry = prev.find((entry) => entry.date === today);
      const mergedResponses = existingEntry
        ? { ...existingEntry.responses, ...responses }
        : responses;
      const newEntry: DailyEntry = { date: today, responses: mergedResponses, completed: true };
      return [...prev.filter((entry) => entry.date !== today), newEntry];
    });

    checkinsApi.upsertTodayResponses(responses).catch((error) => {
      console.error('Failed to save daily check-in', error);
    });
  }, []);

  const getDailyEntry = (date: string): DailyEntry | undefined => {
    return dailyEntries.find(entry => entry.date === date);
  };

  const value = {
    metrics: healthMetrics,
    dailyEntries,
    isLoading,
    hasCompletedToday,
    hasCompletedAllToday,
    submitDailyEntry,
    getDailyEntry,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};