import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { profileApi, BodyProfile } from '../lib/api';
import { TransitionDirection } from '../lib/transitionStages';

const DIRECTIONS: { value: TransitionDirection; label: string }[] = [
  { value: 'feminizing', label: 'Feminizing' },
  { value: 'masculinizing', label: 'Masculinizing' },
];

function toInputString(n: number | null) {
  return n === null ? '' : String(n);
}

function toNumberOrNull(s: string): number | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export default function BodyMeasurementsScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<TransitionDirection | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    profileApi
      .me()
      .then((p: BodyProfile) => {
        setDirection(p.transition_direction || null);
        setHeight(toInputString(p.height));
        setWeight(toInputString(p.weight));
        setChest(toInputString(p.chest));
        setWaist(toInputString(p.waist));
        setHip(toInputString(p.hip));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const canSubmit = !!direction && !!height.trim() && !!weight.trim() && !submitting;

  const onSubmit = async () => {
    if (!canSubmit || !direction) return;
    setError('');
    setSubmitting(true);
    try {
      await profileApi.update({
        transition_direction: direction,
        height: toNumberOrNull(height),
        weight: toNumberOrNull(weight),
        chest: toNumberOrNull(chest),
        waist: toNumberOrNull(waist),
        hip: toNumberOrNull(hip),
      });
      navigation.navigate('TransitionTimeline');
    } catch {
      setError('Could not save your measurements. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Body measurements</Text>
        <View style={styles.backButton} />
      </View>

      <Text style={styles.helper}>
        Used to size the illustrated mannequin on your transition timeline. Nothing here is a photo of you.
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Direction</Text>
      <View style={styles.wrap}>
        {DIRECTIONS.map((d) => (
          <TouchableOpacity
            key={d.value}
            style={[styles.chip, direction === d.value && styles.chipSelected]}
            onPress={() => setDirection(d.value)}
          >
            <Text style={[styles.chipText, direction === d.value && styles.chipTextSelected]}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="e.g. 170"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="e.g. 65"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Chest (cm) — optional</Text>
      <TextInput
        style={styles.input}
        value={chest}
        onChangeText={setChest}
        keyboardType="numeric"
        placeholder="e.g. 90"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Waist (cm) — optional</Text>
      <TextInput
        style={styles.input}
        value={waist}
        onChangeText={setWaist}
        keyboardType="numeric"
        placeholder="e.g. 75"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Hip (cm) — optional</Text>
      <TextInput
        style={styles.input}
        value={hip}
        onChangeText={setHip}
        keyboardType="numeric"
        placeholder="e.g. 95"
        placeholderTextColor={colors.textMuted}
      />

      <TouchableOpacity style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={onSubmit} disabled={!canSubmit}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save & view timeline</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 28, color: colors.text, marginTop: -4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  helper: { fontSize: 13, color: colors.textMuted, marginBottom: 12, lineHeight: 18 },
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  error: { color: colors.danger, textAlign: 'center', marginBottom: 8, fontSize: 13 },
});
