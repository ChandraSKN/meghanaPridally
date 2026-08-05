import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function AuthLandingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.brandBlock}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brand}>Pridally</Text>
        <Text style={styles.tagline}>Your daily wellness guide</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  brandBlock: { alignItems: 'center', marginBottom: 64 },
  logo: { width: 96, height: 96, marginBottom: 20, borderRadius: 20 },
  brand: { fontSize: 28, fontWeight: '700', color: colors.text },
  tagline: { fontSize: 15, color: colors.textMuted, marginTop: 6 },
  actions: { gap: 12 },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
});
