import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { appointmentsApi, DoctorAppointment } from '../lib/api';

const TYPE_LABEL: Record<DoctorAppointment['appointment_type'], string> = {
  in_person: '🏥 In person',
  video_call: '🎥 Video call',
  phone_call: '📞 Phone call',
};

const STATUS_STYLE: Record<DoctorAppointment['status'], { label: string; color: string }> = {
  scheduled: { label: 'Scheduled', color: colors.primary },
  rescheduled: { label: 'Rescheduled', color: colors.primary },
  completed: { label: 'Completed ✓', color: colors.accent },
  cancelled: { label: 'Cancelled', color: colors.danger },
  no_show: { label: 'No show', color: colors.danger },
};

function formatDate(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T00:00:00`);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
  const monthDay = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${weekday}, ${monthDay} · ${timeStr.slice(0, 5)}`;
}

function AppointmentCard({ appointment }: { appointment: DoctorAppointment }) {
  const status = STATUS_STYLE[appointment.status];
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>
          {appointment.doctor_name} · {appointment.doctor_speciality.replace('_', ' ')}
        </Text>
        <Text style={[styles.status, { color: status.color }]}>{status.label}</Text>
      </View>
      <Text style={styles.dateText}>{formatDate(appointment.appointment_date, appointment.appointment_time)}</Text>
      <Text style={styles.typeText}>{TYPE_LABEL[appointment.appointment_type]}</Text>
    </View>
  );
}

export default function AppointmentsScreen({ navigation }: any) {
  const [upcoming, setUpcoming] = useState<DoctorAppointment[]>([]);
  const [past, setPast] = useState<DoctorAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [upcomingRes, pastRes] = await Promise.all([appointmentsApi.upcoming(), appointmentsApi.past()]);
      setUpcoming(upcomingRes);
      setPast(pastRes);
    } catch {
      // keep whatever was last loaded rather than blanking the screen
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Appointments</Text>
        <View style={styles.backButton} />
      </View>

      {loading && upcoming.length === 0 && past.length === 0 ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcoming.length === 0 ? (
            <Text style={styles.emptyText}>No upcoming appointments.</Text>
          ) : (
            upcoming.map((a) => <AppointmentCard key={a.id} appointment={a} />)
          )}

          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookAppointment')}>
            <Text style={styles.bookButtonText}>+ Book appointment</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Past</Text>
          {past.length === 0 ? (
            <Text style={styles.emptyText}>No past appointments yet.</Text>
          ) : (
            past.map((a) => <AppointmentCard key={a.id} appointment={a} />)
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 28, color: colors.text, marginTop: -4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 10 },
  emptyText: { fontSize: 13, color: colors.textMuted },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  doctorName: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1, marginRight: 8 },
  status: { fontSize: 12, fontWeight: '700' },
  dateText: { fontSize: 13, color: colors.text, marginTop: 6 },
  typeText: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  bookButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
