import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../theme/colors';
import { doctorsApi, appointmentsApi, Doctor, DoctorAppointment, ApiError } from '../lib/api';

const TYPES: { value: DoctorAppointment['appointment_type']; label: string }[] = [
  { value: 'in_person', label: '🏥 In person' },
  { value: 'video_call', label: '🎥 Video call' },
  { value: 'phone_call', label: '📞 Phone call' },
];

function toDateString(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toTimeString(d: Date) {
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}:00`;
}

export default function BookAppointmentScreen({ navigation }: any) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [type, setType] = useState<DoctorAppointment['appointment_type']>('in_person');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    doctorsApi
      .list()
      .then(setDoctors)
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false));
  }, []);

  const canSubmit = !!doctorId && !!date && !!time && !!reason.trim() && !submitting;

  const onSubmit = async () => {
    if (!canSubmit || !doctorId || !date || !time) return;
    setError('');
    setSubmitting(true);
    try {
      await appointmentsApi.create({
        doctor: doctorId,
        appointment_type: type,
        appointment_date: toDateString(date),
        appointment_time: toTimeString(time),
        reason_for_visit: reason.trim(),
        patient_notes: notes.trim() || undefined,
      });
      Alert.alert('Appointment booked', "We've saved your appointment.", [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      if (err instanceof ApiError) {
        setError('Could not book this appointment. Check the details and try again.');
      } else {
        setError('Could not reach the server. Check your connection.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Book appointment</Text>
        <View style={styles.backButton} />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Doctor</Text>
      {loadingDoctors ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
      ) : doctors.length === 0 ? (
        <Text style={styles.emptyText}>No doctors available yet. Check back soon.</Text>
      ) : (
        <View style={styles.doctorList}>
          {doctors.map((d) => {
            const active = doctorId === d.id;
            return (
              <TouchableOpacity
                key={d.id}
                style={[styles.doctorOption, active && styles.doctorOptionActive]}
                onPress={() => setDoctorId(d.id)}
              >
                <Text style={[styles.doctorName, active && styles.doctorNameActive]}>{d.name}</Text>
                <Text style={styles.doctorSpeciality}>{d.speciality.replace('_', ' ')}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <Text style={styles.label}>Appointment type</Text>
      <View style={styles.wrap}>
        {TYPES.map((t) => (
          <TouchableOpacity
            key={t.value}
            style={[styles.chip, type === t.value && styles.chipSelected]}
            onPress={() => setType(t.value)}
          >
            <Text style={[styles.chipText, type === t.value && styles.chipTextSelected]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={date ? styles.inputValue : styles.inputPlaceholder}>
          {date ? date.toLocaleDateString() : 'Select a date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_event, selected) => {
            setShowDatePicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text style={time ? styles.inputValue : styles.inputPlaceholder}>
          {time ? time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : 'Select a time'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={(_event, selected) => {
            setShowTimePicker(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      <Text style={styles.label}>Reason for visit</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={reason}
        onChangeText={setReason}
        multiline
        placeholder="What would you like to discuss?"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Anything else the doctor should know..."
        placeholderTextColor={colors.textMuted}
      />

      <TouchableOpacity style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={onSubmit} disabled={!canSubmit}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Book appointment</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 28, color: colors.text, marginTop: -4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  label: { fontSize: 13, fontWeight: '700', color: colors.text, marginTop: 18, marginBottom: 8 },
  emptyText: { fontSize: 13, color: colors.textMuted },
  doctorList: { gap: 8 },
  doctorOption: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  doctorOptionActive: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.secondary },
  doctorName: { fontSize: 14, fontWeight: '700', color: colors.text },
  doctorNameActive: { color: colors.primaryDark },
  doctorSpeciality: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
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
  },
  inputValue: { fontSize: 15, color: colors.text },
  inputPlaceholder: { fontSize: 15, color: colors.textMuted },
  textarea: { minHeight: 80, textAlignVertical: 'top' },
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
