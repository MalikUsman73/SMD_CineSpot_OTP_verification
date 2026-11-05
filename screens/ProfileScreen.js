import { Button, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {auth.currentUser?.email || auth.currentUser?.phoneNumber}
      </Text>
      <Text style={styles.info}>CineSpot Member</Text>
      <Text style={styles.info}>Favourite Genre: Sci-Fi</Text>
      <View style={styles.button}>
        <Button title="Sign Out" color="#B71C1C" onPress={() => signOut(auth)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, color: '#555', marginBottom: 4 },
  button: { marginTop: 24 },
});
