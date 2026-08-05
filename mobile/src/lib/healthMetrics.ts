// Mirrors src/contexts/HealthContext.tsx's `healthMetrics` config (web app) so the
// mobile "Health categories" cards ask the same questions and write to the same
// `DailyCheckIn.responses` JSON field on the backend.

export interface HealthQuestion {
  id: string;
  question: string;
  type: 'scale' | 'boolean' | 'text';
  scale?: { min: number; max: number; labels: string[] };
}

export interface HealthMetric {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: HealthQuestion[];
}

export const healthMetrics: HealthMetric[] = [
  {
    id: 'mood',
    name: 'Mental Health',
    emoji: '🧠',
    description: 'Track your emotional wellbeing and mental state',
    questions: [
      {
        id: 'mood_rating',
        question: 'How would you rate your overall mood today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Poor', 'Excellent'] },
      },
      {
        id: 'stress_level',
        question: 'How stressed do you feel today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['No Stress', 'Very High'] },
      },
      { id: 'anxiety', question: 'Did you experience anxiety today?', type: 'boolean' },
    ],
  },
  {
    id: 'sexual_health',
    name: 'Sexual Health',
    emoji: '💜',
    description: 'Track your sexual wellness and intimate health',
    questions: [
      {
        id: 'sexual_satisfaction',
        question: 'How satisfied are you with your sexual life?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Dissatisfied', 'Very Satisfied'] },
      },
      {
        id: 'sexual_comfort',
        question: 'How comfortable do you feel discussing sexual health?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Uncomfortable', 'Very Comfortable'] },
      },
      {
        id: 'sexual_wellness_concern',
        question: 'Do you have any concerns about your sexual health?',
        type: 'boolean',
      },
    ],
  },
  {
    id: 'reproductive_health',
    name: 'Reproductive Health',
    emoji: '🌱',
    description: 'Monitor your reproductive wellness and menstrual health',
    questions: [
      { id: 'menstrual_cycle', question: 'Are you currently tracking your menstrual cycle?', type: 'boolean' },
      { id: 'reproductive_concerns', question: 'Do you have any reproductive health concerns?', type: 'boolean' },
      {
        id: 'contraceptive_satisfaction',
        question: 'How satisfied are you with your current contraceptive method (if applicable)?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['Very Dissatisfied', 'Very Satisfied'] },
      },
    ],
  },
  {
    id: 'exercise',
    name: 'Physical Health',
    emoji: '💪',
    description: 'Track your exercise and physical activity levels',
    questions: [
      {
        id: 'exercise_duration',
        question: 'How many minutes of exercise did you do today?',
        type: 'scale',
        scale: { min: 0, max: 120, labels: ['None', '60+m'] },
      },
      {
        id: 'exercise_intensity',
        question: 'How intense was your physical activity?',
        type: 'scale',
        scale: { min: 1, max: 5, labels: ['Light', 'Very Vigorous'] },
      },
    ],
  },
  {
    id: 'social',
    name: 'Social Health',
    emoji: '🤝',
    description: 'Track your social interactions and relationships',
    questions: [
      {
        id: 'social_interaction',
        question: 'How much meaningful social interaction did you have today?',
        type: 'scale',
        scale: { min: 1, max: 10, labels: ['None', 'Plenty'] },
      },
      { id: 'support_system', question: 'Do you feel supported by friends/family?', type: 'boolean' },
      { id: 'loneliness', question: 'Did you feel lonely today?', type: 'boolean' },
    ],
  },
];

export function getHealthMetric(id: string): HealthMetric | undefined {
  return healthMetrics.find((m) => m.id === id);
}

export function categoryProgress(metricId: string, responses: Record<string, unknown> | undefined): number {
  const metric = getHealthMetric(metricId);
  if (!metric || !responses) return 0;
  const answered = metric.questions.filter((q) => responses[q.id] !== undefined).length;
  return Math.round((answered / metric.questions.length) * 100);
}
