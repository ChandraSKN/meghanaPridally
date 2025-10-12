import React, { createContext, useContext, useState, useEffect } from 'react';

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
  responses: Record<string, any>;
  completed: boolean;
}

interface HealthContextType {
  metrics: HealthMetric[];
  dailyEntries: DailyEntry[];
  hasCompletedToday: () => boolean;
  hasCompletedAllToday: () => boolean;
  submitDailyEntry: (responses: Record<string, any>) => void;
  getDailyEntry: (date: string) => DailyEntry | undefined;
}

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
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);

  useEffect(() => {
    // Load existing data from localStorage
    const storedData = localStorage.getItem('pridally_daily_data');
    if (storedData) {
      setDailyEntries(JSON.parse(storedData));
    }
  }, []);

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

  const submitDailyEntry = (responses: Record<string, any>) => {
    const today = getTodayString();
    
    // Find existing entry for today
    const existingEntry = dailyEntries.find(entry => entry.date === today);
    
    // Merge new responses with existing ones
    const mergedResponses = existingEntry 
      ? { ...existingEntry.responses, ...responses }
      : responses;
    
    const newEntry: DailyEntry = {
      date: today,
      responses: mergedResponses,
      completed: true,
    };

    const updatedEntries = dailyEntries.filter(entry => entry.date !== today);
    updatedEntries.push(newEntry);
    
    setDailyEntries(updatedEntries);
    localStorage.setItem('pridally_daily_data', JSON.stringify(updatedEntries));
  };

  const getDailyEntry = (date: string): DailyEntry | undefined => {
    return dailyEntries.find(entry => entry.date === date);
  };

  const value = {
    metrics: healthMetrics,
    dailyEntries,
    hasCompletedToday,
    hasCompletedAllToday,
    submitDailyEntry,
    getDailyEntry,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};