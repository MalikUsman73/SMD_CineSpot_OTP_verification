import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  OTP_TEST_MODE,
  friendlyError,
  isValidPhone,
  normalizePhone,
  sendOtp,
} from '../otp';

const RESEND_SECONDS = 30;

export default function PhoneLoginScreen({ onBack, onVerifyStart, onVerifyFail }) {
  const [step, setStep] = useState('phone');
  const [phoneInput, setPhoneInput] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const phone = normalizePhone(phoneInput);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const requestCode = async () => {
    setError('');
    if (!isValidPhone(phone)) {
      setError('Enter the number with its country code, for example +92 300 1234567.');
      return;
    }
    setBusy(true);
    try {
      setConfirmation(await sendOtp(phone));
      setCode('');
      setStep('code');
      setSecondsLeft(RESEND_SECONDS);
    } catch (e) {
      setError(friendlyError(e));
    }
    setBusy(false);
  };

  const verifyCode = async () => {
    setError('');
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code.');
      return;
    }
    setBusy(true);
    onVerifyStart();
    try {
      await confirmation.confirm(code);
    } catch (e) {
      onVerifyFail();
      setError(friendlyError(e));
      setBusy(false);
    }
  };

  const changeNumber = () => {
    setStep('phone');
    setCode('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CineSpot</Text>
      <Text style={styles.subtitle}>
        {step === 'phone' ? 'Sign in with your phone' : 'Enter the verification code'}
      </Text>

      {OTP_TEST_MODE && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Test mode: no real SMS is sent. Use a test number and the code set for it in the
            Firebase console.
          </Text>
        </View>
      )}

      {step === 'phone' ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="+1 650 555 3434"
            keyboardType="phone-pad"
            autoComplete="tel"
            maxLength={20}
            value={phoneInput}
            onChangeText={(text) => {
              setPhoneInput(text);
              setError('');
            }}
            onSubmitEditing={requestCode}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Pressable
            style={[styles.button, busy && styles.busy]}
            onPress={requestCode}
            disabled={busy}
          >
            <Text style={styles.buttonText}>{busy ? 'Sending...' : 'Send OTP'}</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.info}>A 6-digit code was requested for {phone}</Text>
          <TextInput
            style={[styles.input, styles.codeInput]}
            placeholder="______"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={(text) => {
              setCode(text.replace(/\D/g, ''));
              setError('');
            }}
            onSubmitEditing={verifyCode}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Pressable
            style={[styles.button, busy && styles.busy]}
            onPress={verifyCode}
            disabled={busy}
          >
            <Text style={styles.buttonText}>{busy ? 'Verifying...' : 'Verify OTP'}</Text>
          </Pressable>

          <Pressable onPress={requestCode} disabled={secondsLeft > 0 || busy}>
            <Text style={[styles.link, secondsLeft > 0 && styles.linkDisabled]}>
              {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : 'Resend code'}
            </Text>
          </Pressable>
          <Pressable onPress={changeNumber}>
            <Text style={styles.link}>Change number</Text>
          </Pressable>
        </View>
      )}

      <Pressable onPress={onBack}>
        <Text style={styles.link}>Back to email sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#B71C1C', textAlign: 'center' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 16, color: '#555' },
  banner: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  bannerText: { color: '#6D4C00', fontSize: 13 },
  info: { color: '#555', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  codeInput: { fontSize: 24, letterSpacing: 8, textAlign: 'center' },
  button: { backgroundColor: '#B71C1C', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  busy: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#B71C1C', textAlign: 'center', marginTop: 16 },
  linkDisabled: { color: '#999' },
  error: { color: '#B71C1C', marginBottom: 8 },
});
