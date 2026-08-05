import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import { checkinsApi, appointmentsApi, DailyCheckIn, DoctorAppointment } from '../lib/api';
import { healthMetrics, categoryProgress } from '../lib/healthMetrics';
import { computeStreak } from '../lib/streak';

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statTileValue}>{value}</Text>
      <Text style={styles.statTileLabel}>{label}</Text>
    </View>
  );
}

function formatAppointment(a: DoctorAppointment) {
  const date = new Date(`${a.appointment_date}T00:00:00`);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
  const monthDay = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const time = a.appointment_time.slice(0, 5);
  return `${a.doctor_name} · ${weekday}, ${monthDay} · ${time}`;
}

type CheckInStats = {
  total_checkins: number;
  average_mood: string;
  average_energy: string;
  average_sleep: number;
  total_exercise_minutes: number;
};

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [today, setToday] = useState<DailyCheckIn | null>(null);
  const [streak, setStreak] = useState(0);
  const [upcoming, setUpcoming] = useState<DoctorAppointment | null>(null);
  const [stats, setStats] = useState<CheckInStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [checkin, monthCheckins, upcomingAppointments, thirtyDayStats] = await Promise.all([
        checkinsApi.today(),
        checkinsApi.monthly(),
        appointmentsApi.upcoming().catch(() => []),
        checkinsApi.stats().catch(() => null),
      ]);
      setToday(checkin);
      setStreak(computeStreak(monthCheckins));
      setUpcoming(upcomingAppointments[0] ?? null);
      setStats(thirtyDayStats);
    } catch {
      // demo build: fail silently, dashboard still usable
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.primary} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi {user?.first_name || 'there'} 👋</Text>
          <Text style={styles.subtitle}>Here's your daily wellness snapshot.</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => navigation.navigate('Profile')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.avatarInitial}>{(user?.first_name || '?')[0]?.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      {streak > 0 && (
        <View style={styles.streakCard}>
          <Text style={styles.streakText}>🔥 {streak}-day streak</Text>
        </View>
      )}

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Today's check-in</Text>
        {today ? (
          <>
            <Text style={styles.statusValue}>Mood: {today.mood ? today.mood.replace('_', ' ') : 'not set'}</Text>
            <Text style={styles.statusValue}>Energy: {today.energy_level ? today.energy_level.replace('_', ' ') : 'not set'}</Text>
            {today.sleep_hours != null && <Text style={styles.statusValue}>Sleep: {today.sleep_hours}h</Text>}
            {today.exercise_minutes > 0 && <Text style={styles.statusValue}>Exercise: {today.exercise_minutes} min</Text>}
            {today.water_intake > 0 && <Text style={styles.statusValue}>Water: {today.water_intake} ml</Text>}
          </>
        ) : (
          <Text style={styles.statusValue}>You haven't checked in today yet.</Text>
        )}
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('CheckIn')}>
          <Text style={styles.ctaText}>{today ? 'Update check-in' : 'Start daily check-in'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Health categories</Text>
      <View style={styles.grid}>
        {healthMetrics.map((m) => {
          const progress = categoryProgress(m.id, today?.responses);
          return (
            <TouchableOpacity
              key={m.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('CheckIn', { category: m.id })}
            >
              <Text style={styles.categoryEmoji}>{m.emoji}</Text>
              <Text style={styles.categoryLabel}>{m.name}</Text>
              <View style={styles.categoryProgressTrack}>
                <View style={[styles.categoryProgressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.categoryProgressLabel}>{progress}%</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {stats && stats.total_checkins > 0 && (
        <>
          <Text style={styles.sectionTitle}>Last 30 days</Text>
          <View style={styles.statsGrid}>
            <StatTile label="Check-ins" value={String(stats.total_checkins)} />
            <StatTile label="Avg mood" value={stats.average_mood.replace('_', ' ')} />
            <StatTile label="Avg energy" value={stats.average_energy.replace('_', ' ')} />
            <StatTile label="Avg sleep" value={`${stats.average_sleep}h`} />
            <StatTile label="Total exercise" value={`${stats.total_exercise_minutes} min`} />
          </View>
        </>
      )}

      {upcoming && (
        <TouchableOpacity style={styles.appointmentCard} onPress={() => navigation.navigate('Appointments')}>
          <Text style={styles.appointmentLabel}>📅 Upcoming appointment</Text>
          <Text style={styles.appointmentValue}>{formatAppointment(upcoming)}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: { color: '#fff', fontWeight: '700', fontSize: 16 },
  streakCard: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  streakText: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  statusValue: { fontSize: 15, color: colors.text, marginTop: 8 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 28, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  categoryEmoji: { fontSize: 28, marginBottom: 8 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: colors.text, textAlign: 'center' },
  categoryProgressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginTop: 10,
    overflow: 'hidden',
  },
  categoryProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
  categoryProgressLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statTile: {
    width: '30%',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statTileValue: { fontSize: 15, fontWeight: '700', color: colors.text, textTransform: 'capitalize' },
  statTileLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4, textAlign: 'center' },
  appointmentCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20,
  },
  appointmentLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  appointmentValue: { fontSize: 14, color: colors.text, marginTop: 8 },
});
