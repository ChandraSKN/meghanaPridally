import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../lib/api';

const TOTAL_STEPS = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function StepDots({ step }: { step: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const n = i + 1;
        return <View key={n} style={[styles.dot, n === step ? styles.dotActive : n < step ? styles.dotDone : null]} />;
      })}
    </View>
  );
}

export default function SignupScreen({ navigation }: any) {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const confirmInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);

  const emailValid = EMAIL_RE.test(email.trim());
  const passwordLongEnough = password.length >= 8;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canContinueStep2 = passwordLongEnough && passwordsMatch;
  const canSubmitStep3 = !!firstName.trim() && !!lastName.trim() && !submitting;

  const goBack = () => {
    setError('');
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep((s) => s - 1);
    }
  };

  const goNext = () => {
    setError('');
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const onSubmit = async () => {
    if (!canSubmitStep3) return;
    setError('');
    setFieldErrors({});
    setSubmitting(true);
    try {
      await signup({
        email: email.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        password,
        password_confirm: confirmPassword,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        const data = err.data as Record<string, string[]> | string;
        if (typeof data === 'object' && data) {
          const firstKey = Object.keys(data)[0];
          const message = Array.isArray(data[firstKey]) ? data[firstKey][0] : 'Signup failed.';
          if (firstKey === 'email') {
            setFieldErrors({ email: message });
            setStep(1);
          } else if (firstKey === 'password' || firstKey === 'password_confirm') {
            setFieldErrors({ password: message });
            setStep(2);
          } else {
            setError(message);
          }
        } else {
          setError('Signup failed.');
        }
      } else {
        setError('Could not reach the server. Check your connection.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <StepDots step={step} />
          <View style={styles.backButton} />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {step === 1 && (
          <View>
            <Text style={styles.title}>What's your email?</Text>
            <Text style={styles.subtitle}>We'll use this to sign you in.</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              returnKeyType="next"
              onSubmitEditing={() => emailValid && goNext()}
              autoFocus
            />
            {fieldErrors.email ? <Text style={styles.fieldError}>{fieldErrors.email}</Text> : null}
            <TouchableOpacity style={[styles.button, !emailValid && styles.buttonDisabled]} onPress={goNext} disabled={!emailValid}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.subtitle}>At least 8 characters.</Text>

            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                returnKeyType="next"
                onSubmitEditing={() => confirmInputRef.current?.focus()}
                autoFocus
              />
              <TouchableOpacity onPress={() => setShowPassword((s) => !s)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                <Text style={styles.eye}>{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.passwordRow}>
              <TextInput
                ref={confirmInputRef}
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                placeholder="Confirm password"
                placeholderTextColor={colors.textMuted}
                returnKeyType="done"
                onSubmitEditing={() => canContinueStep2 && goNext()}
              />
              <TouchableOpacity onPress={() => setShowConfirm((s) => !s)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                <Text style={styles.eye}>{showConfirm ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            {fieldErrors.password ? <Text style={styles.fieldError}>{fieldErrors.password}</Text> : null}

            <View style={styles.checklist}>
              <Text style={[styles.checklistItem, passwordLongEnough && styles.checklistItemDone]}>
                {passwordLongEnough ? '✓' : '○'} At least 8 characters
              </Text>
              <Text style={[styles.checklistItem, passwordsMatch && styles.checklistItemDone]}>
                {passwordsMatch ? '✓' : '○'} Passwords match
              </Text>
            </View>

            <TouchableOpacity style={[styles.button, !canContinueStep2 && styles.buttonDisabled]} onPress={goNext} disabled={!canContinueStep2}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.title}>Almost done</Text>
            <Text style={styles.subtitle}>What should we call you?</Text>

            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={colors.textMuted}
              returnKeyType="next"
              onSubmitEditing={() => lastNameInputRef.current?.focus()}
              autoFocus
            />

            <Text style={styles.label}>Last name</Text>
            <TextInput
              ref={lastNameInputRef}
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={colors.textMuted}
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />

            <TouchableOpacity style={[styles.button, !canSubmitStep3 && styles.buttonDisabled]} onPress={onSubmit} disabled={!canSubmitStep3}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create account</Text>}
            </TouchableOpacity>
          </View>
        )}

        {step === 1 && (
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkAccent}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 28, color: colors.text, marginTop: -4 },
  dotsRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 20 },
  dotDone: { backgroundColor: colors.accent },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 12 },
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginTop: 12,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.text },
  eye: { fontSize: 18, paddingLeft: 10 },
  checklist: { marginTop: 14, gap: 6 },
  checklistItem: { fontSize: 13, color: colors.textMuted },
  checklistItemDone: { color: colors.accent, fontWeight: '600' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: colors.textMuted, fontSize: 13 },
  linkAccent: { color: colors.primary, fontWeight: '700' },
  error: { color: colors.danger, textAlign: 'center', marginBottom: 8, fontSize: 13 },
  fieldError: { color: colors.danger, fontSize: 12, marginTop: 6 },
});
