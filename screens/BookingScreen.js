import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';

export default function BookingScreen({ route, navigation }) {
  // Movie passed from the "Book" header button on MovieDetailsScreen
  const { movie } = route.params;

  const confirmBooking = () => {
    const message = `Your ticket for ${movie.title} at ${movie.showtime} is booked.`;
    if (Platform.OS === 'web') {
      window.alert(`Booking Confirmed\n${message}`);
      navigation.popToTop();
      return;
    }
    Alert.alert('Booking Confirmed', message, [
      { text: 'OK', onPress: () => navigation.popToTop() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Movie</Text>
      <Text style={styles.value}>{movie.title}</Text>

      <Text style={styles.label}>Showtime</Text>
      <Text style={styles.value}>{movie.showtime}</Text>

      <Text style={styles.label}>Price</Text>
      <Text style={styles.value}>Rs. {movie.price}</Text>

      <View style={styles.button}>
        <Button title="Confirm Booking" color="#1B5E20" onPress={confirmBooking} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#888', marginTop: 12 },
  value: { fontSize: 20, fontWeight: 'bold' },
  button: { marginTop: 32 },
});
