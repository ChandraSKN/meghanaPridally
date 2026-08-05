import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { checkinsApi, DailyCheckIn } from '../lib/api';
import { healthMetrics, categoryProgress } from '../lib/healthMetrics';
import { dateKey, computeStreak } from '../lib/streak';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarScreen({ navigation }: any) {
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await checkinsApi.monthly();
      setCheckins(data);
    } catch {
      // keep whatever was last loaded
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const byDate = new Map(checkins.map((c) => [c.check_in_date, c]));
  const today = new Date();
  const todayKey = dateKey(today);
  const year = today.getFullYear();
  const month = today.getMonth();
  const totalDays = daysInMonth(year, month);
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysElapsed = today.getDate();
  const completedThisMonth = Array.from({ length: daysElapsed }, (_, i) => i + 1).filter((day) =>
    byDate.has(dateKey(new Date(year, month, day)))
  ).length;
  const completionRate = daysElapsed > 0 ? Math.round((completedThisMonth / daysElapsed) * 100) : 0;
  const streak = computeStreak(checkins);

  const selectedCheckin = selected ? byDate.get(selected) : undefined;
  const selectedIsToday = selected === todayKey;
  const selectedIsFuture = selected ? selected > todayKey : false;

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.primary} />}
    >
      <Text style={styles.monthTitle}>{today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>🔥 {streak}</Text>
          <Text style={styles.statLabel}>day streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completionRate}%</Text>
          <Text style={styles.statLabel}>this month</Text>
        </View>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={i} style={styles.weekdayText}>
            {w}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <View key={`blank-${i}`} style={styles.dayCell} />
        ))}
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const cellDate = new Date(year, month, day);
          const key = dateKey(cellDate);
          const isToday = key === todayKey;
          const isFuture = key > todayKey;
          const hasCheckin = byDate.has(key);
          const isSelected = selected === key;

          return (
            <TouchableOpacity
              key={key}
              disabled={isFuture}
              onPress={() => setSelected(key)}
              style={[
                styles.dayCell,
                hasCheckin && styles.dayCellDone,
                !hasCheckin && !isFuture && styles.dayCellMissed,
                isToday && styles.dayCellToday,
                isSelected && styles.dayCellSelected,
              ]}
            >
              <Text style={[styles.dayText, isFuture && styles.dayTextFuture]}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.legendRow}>
        <LegendDot color={colors.accent} label="Checked in" />
        <LegendDot color={colors.danger} label="Missed" />
      </View>

      {selected && (
        <View style={styles.detailCard}>
          <Text style={styles.detailDate}>
            {new Date(`${selected}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>

          {selectedCheckin ? (
            <>
              <Text style={styles.detailRow}>Mood: {selectedCheckin.mood ? selectedCheckin.mood.replace('_', ' ') : 'not set'}</Text>
              <Text style={styles.detailRow}>Energy: {selectedCheckin.energy_level ? selectedCheckin.energy_level.replace('_', ' ') : 'not set'}</Text>
              {selectedCheckin.notes ? <Text style={styles.detailRow}>Notes: {selectedCheckin.notes}</Text> : null}

              <View style={styles.categoryList}>
                {healthMetrics.map((m) => (
                  <Text key={m.id} style={styles.categoryRow}>
                    {m.emoji} {m.name}: {categoryProgress(m.id, selectedCheckin.responses)}%
                  </Text>
                ))}
              </View>
            </>
          ) : selectedIsToday ? (
            <>
              <Text style={styles.detailEmpty}>You haven't checked in today yet.</Text>
              <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('CheckIn')}>
                <Text style={styles.startButtonText}>Start today's check-in</Text>
              </TouchableOpacity>
            </>
          ) : selectedIsFuture ? null : (
            <Text style={styles.detailEmpty}>No check-in recorded for this day.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 40 },
  monthTitle: { fontSize: 20, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  weekdayRow: { flexDirection: 'row' },
  weekdayText: { flex: 1, textAlign: 'center', fontSize: 12, color: colors.textMuted, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayCellDone: { backgroundColor: `${colors.accent}33`, borderRadius: 10 },
  dayCellMissed: { backgroundColor: `${colors.danger}22`, borderRadius: 10 },
  dayCellToday: { borderWidth: 2, borderColor: colors.primary, borderRadius: 10 },
  dayCellSelected: { borderWidth: 2, borderColor: colors.primaryDark, borderRadius: 10 },
  dayText: { fontSize: 13, color: colors.text, fontWeight: '600' },
  dayTextFuture: { color: colors.textMuted, fontWeight: '400' },
  legendRow: { flexDirection: 'row', gap: 16, marginTop: 14, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: colors.textMuted },
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 20,
  },
  detailDate: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 10 },
  detailRow: { fontSize: 14, color: colors.text, marginTop: 4 },
  detailEmpty: { fontSize: 14, color: colors.textMuted },
  categoryList: { marginTop: 12, gap: 4 },
  categoryRow: { fontSize: 13, color: colors.textMuted },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  startButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
