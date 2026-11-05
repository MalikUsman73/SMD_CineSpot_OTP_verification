import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function VerifiedScreen({ phone, onContinue }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.check}>✓</Text>
      </View>
      <Text style={styles.title}>Phone number verified</Text>
      <Text style={styles.phone}>{phone}</Text>
      <Text style={styles.info}>You are now signed in to CineSpot.</Text>
      <Pressable style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  check: { color: '#fff', fontSize: 52, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  phone: { fontSize: 18, marginTop: 8, color: '#333' },
  info: { color: '#555', marginTop: 8 },
  button: { backgroundColor: '#B71C1C', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8, marginTop: 28 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
