import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { checkinsApi, DailyCheckIn } from '../lib/api';
import { getHealthMetric, HealthQuestion } from '../lib/healthMetrics';

function scaleOptions(min: number, max: number, count = 5): number[] {
  const step = (max - min) / (count - 1);
  const values = Array.from({ length: count }, (_, i) => Math.round(min + step * i));
  return Array.from(new Set(values));
}

function CategoryQuestion({
  question,
  value,
  onChange,
}: {
  question: HealthQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (question.type === 'scale' && question.scale) {
    const options = scaleOptions(question.scale.min, question.scale.max);
    return (
      <View style={styles.questionBlock}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.wrap}>
          {options.map((n) => (
            <Chip key={n} label={String(n)} selected={value === n} onPress={() => onChange(n)} />
          ))}
        </View>
        <View style={styles.scaleLabels}>
          <Text style={styles.scaleLabelText}>{question.scale.labels[0]}</Text>
          <Text style={styles.scaleLabelText}>{question.scale.labels[question.scale.labels.length - 1]}</Text>
        </View>
      </View>
    );
  }

  if (question.type === 'boolean') {
    return (
      <View style={styles.questionBlock}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.wrap}>
          <Chip label="Yes" selected={value === true} onPress={() => onChange(true)} />
          <Chip label="No" selected={value === false} onPress={() => onChange(false)} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionText}>{question.question}</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={typeof value === 'string' ? value : ''}
        onChangeText={onChange}
        multiline
        placeholder="Share your thoughts..."
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
}

const MOODS: { key: DailyCheckIn['mood']; label: string; emoji: string }[] = [
  { key: 'very_bad', label: 'Very Bad', emoji: '😞' },
  { key: 'bad', label: 'Bad', emoji: '🙁' },
  { key: 'neutral', label: 'Neutral', emoji: '😐' },
  { key: 'good', label: 'Good', emoji: '🙂' },
  { key: 'very_good', label: 'Very Good', emoji: '😄' },
];

const ENERGY: { key: DailyCheckIn['energy_level']; label: string }[] = [
  { key: 'very_low', label: 'Very Low' },
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
  { key: 'very_high', label: 'Very High' },
];

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function CheckInScreen({ navigation, route }: any) {
  const category: string | undefined = route?.params?.category;
  const metric = category ? getHealthMetric(category) : undefined;

  const [existing, setExisting] = useState<DailyCheckIn | null>(null);
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryResponses, setCategoryResponses] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      setLoading(true);
      checkinsApi
        .today()
        .then((c) => {
          if (!active) return;
          setExisting(c);
          if (c) {
            setMood(c.mood || '');
            setEnergy(c.energy_level || '');
            setSleepHours(c.sleep_hours != null ? String(c.sleep_hours) : '');
            setExerciseMinutes(String(c.exercise_minutes ?? ''));
            setWaterIntake(String(c.water_intake ?? ''));
            setNotes(c.notes || '');
            setCategoryResponses(c.responses || {});
          }
        })
        .finally(() => active && setLoading(false));
      return () => {
        active = false;
      };
    }, [])
  );

  const onSubmitCategory = async () => {
    if (!metric) return;
    setSubmitting(true);
    try {
      const answers = Object.fromEntries(
        metric.questions.filter((q) => categoryResponses[q.id] !== undefined).map((q) => [q.id, categoryResponses[q.id]])
      );
      await checkinsApi.upsertTodayResponses(answers);
      Alert.alert('Saved', `Your ${metric.name.toLowerCase()} check-in has been recorded.`, [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
      ]);
    } catch {
      Alert.alert('Something went wrong', 'Could not save your check-in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        mood: mood || undefined,
        energy_level: energy || undefined,
        sleep_hours: sleepHours ? Number(sleepHours) : undefined,
        exercise_minutes: exerciseMinutes ? Number(exerciseMinutes) : undefined,
        water_intake: waterIntake ? Number(waterIntake) : undefined,
        notes,
      } as Partial<DailyCheckIn>;

      if (existing) {
        await checkinsApi.update(existing.id, payload);
      } else {
        await checkinsApi.create(payload);
      }
      Alert.alert('Saved', 'Your daily check-in has been recorded.', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
      ]);
    } catch {
      Alert.alert('Something went wrong', 'Could not save your check-in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (metric) {
    return (
      <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
        <Text style={styles.title}>{metric.emoji} {metric.name}</Text>
        <Text style={styles.subtitle}>{metric.description}</Text>

        {metric.questions.map((q) => (
          <CategoryQuestion
            key={q.id}
            question={q}
            value={categoryResponses[q.id]}
            onChange={(value) => setCategoryResponses((prev) => ({ ...prev, [q.id]: value }))}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={onSubmitCategory} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save {metric.name}</Text>}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Check-in</Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      <Text style={styles.label}>Mood</Text>
      <View style={styles.wrap}>
        {MOODS.map((m) => (
          <Chip key={m.key} label={`${m.emoji} ${m.label}`} selected={mood === m.key} onPress={() => setMood(m.key)} />
        ))}
      </View>

      <Text style={styles.label}>Energy level</Text>
      <View style={styles.wrap}>
        {ENERGY.map((e) => (
          <Chip key={e.key} label={e.label} selected={energy === e.key} onPress={() => setEnergy(e.key)} />
        ))}
      </View>

      <Text style={styles.label}>Sleep (hours)</Text>
      <TextInput style={styles.input} value={sleepHours} onChangeText={setSleepHours} keyboardType="numeric" placeholder="e.g. 7.5" placeholderTextColor={colors.textMuted} />

      <Text style={styles.label}>Exercise (minutes)</Text>
      <TextInput style={styles.input} value={exerciseMinutes} onChangeText={setExerciseMinutes} keyboardType="numeric" placeholder="e.g. 30" placeholderTextColor={colors.textMuted} />

      <Text style={styles.label}>Water intake (ml)</Text>
      <TextInput style={styles.input} value={waterIntake} onChangeText={setWaterIntake} keyboardType="numeric" placeholder="e.g. 2000" placeholderTextColor={colors.textMuted} />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Anything else you'd like to note..."
        placeholderTextColor={colors.textMuted}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={submitting}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{existing ? 'Update' : 'Save'} Check-in</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '700', color: colors.text, marginTop: 18, marginBottom: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, color: colors.text, fontWeight: '600' },
  chipTextSelected: { color: '#fff' },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  textarea: { minHeight: 90, textAlignVertical: 'top' },
  questionBlock: { marginTop: 18 },
  questionText: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  scaleLabelText: { fontSize: 11, color: colors.textMuted },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
