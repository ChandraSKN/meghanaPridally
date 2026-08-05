import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.first_name?.[0]?.toUpperCase() || '?'}</Text>
      </View>
      <Text style={styles.name}>
        {user?.first_name} {user?.last_name}
      </Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.card}>
        <Row label="Health pathway" value={user?.health_pathway || '—'} />
        <Row label="Phone" value={user?.phone_number || 'Not set'} />
        <Row label="Onboarding" value={user?.onboarding_completed ? 'Completed' : 'Pending'} />
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Appointments')}>
        <Text style={styles.linkButtonText}>Appointments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 14 },
  email: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 28,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { fontSize: 14, color: colors.textMuted },
  rowValue: { fontSize: 14, color: colors.text, fontWeight: '600' },
  linkButton: {
    width: '100%',
    marginTop: 28,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  linkButtonText: { color: colors.text, fontWeight: '700', fontSize: 14 },
  logoutButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: { color: colors.danger, fontWeight: '700', fontSize: 14 },
});
