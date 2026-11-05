import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import PhoneLoginScreen from './PhoneLoginScreen';

export default function LoginScreen({ onVerifyStart, onVerifyFail }) {
  const [usePhone, setUsePhone] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (e) {
      setError(e.code ? e.code.replace('auth/', '').replace(/-/g, ' ') : e.message);
    }
    setBusy(false);
  };

  if (usePhone) {
    return (
      <PhoneLoginScreen
        onBack={() => setUsePhone(false)}
        onVerifyStart={onVerifyStart}
        onVerifyFail={onVerifyFail}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CineSpot</Text>
      <Text style={styles.subtitle}>{isSignUp ? 'Create account' : 'Sign in'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={submit}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={[styles.button, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      </Pressable>

      <Pressable onPress={() => { setIsSignUp(!isSignUp); setError(''); }}>
        <Text style={styles.link}>
          {isSignUp ? 'Have an account? Sign in' : "No account? Sign up"}
        </Text>
      </Pressable>

      <Pressable onPress={() => setUsePhone(true)}>
        <Text style={styles.link}>Sign in with phone number (OTP)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#B71C1C', textAlign: 'center' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 24, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#B71C1C', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#B71C1C', textAlign: 'center', marginTop: 16 },
  error: { color: '#B71C1C', marginBottom: 8, textTransform: 'capitalize' },
});
