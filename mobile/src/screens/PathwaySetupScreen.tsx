import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import { usersApi } from '../lib/api';

const PATHWAYS = [
  { value: 'fitness', emoji: '🏋️', label: 'Fitness' },
  { value: 'nutrition', emoji: '🥗', label: 'Nutrition' },
  { value: 'mental_health', emoji: '🧠', label: 'Mental Health' },
  { value: 'general', emoji: '🌱', label: 'General Wellness' },
] as const;

export default function PathwaySetupScreen() {
  const { user, refreshUser } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    if (!selected || !user) return;
    setError('');
    setSubmitting(true);
    try {
      await usersApi.updateHealthPathway(user.id, selected);
      await usersApi.completeOnboarding();
      await refreshUser();
    } catch {
      setError('Could not save your choice. Check your connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What brings you here?</Text>
      <Text style={styles.subtitle}>Pick a focus — you can always explore everything either way.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.options}>
        {PATHWAYS.map((p) => {
          const active = selected === p.value;
          return (
            <TouchableOpacity
              key={p.value}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => setSelected(p.value)}
            >
              <Text style={styles.optionEmoji}>{p.emoji}</Text>
              <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{p.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.button, (!selected || submitting) && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!selected || submitting}
      >
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 28 },
  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionActive: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.secondary },
  optionEmoji: { fontSize: 22, marginRight: 12 },
  optionLabel: { fontSize: 16, fontWeight: '600', color: colors.text },
  optionLabelActive: { color: colors.primaryDark },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  error: { color: colors.danger, textAlign: 'center', marginBottom: 12, fontSize: 13 },
});
