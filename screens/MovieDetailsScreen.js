import { StyleSheet, Text, View } from 'react-native';

export default function MovieDetailsScreen({ route }) {
  // Read the movie that was passed from MovieListScreen
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.row}>Genre: {movie.genre}</Text>
      <Text style={styles.row}>Duration: {movie.duration}</Text>
      <Text style={styles.row}>Rating: ⭐ {movie.rating}</Text>
      <Text style={styles.row}>Showtime: {movie.showtime}</Text>
      <Text style={styles.row}>Ticket Price: Rs. {movie.price}</Text>
      <Text style={styles.description}>{movie.description}</Text>
      <Text style={styles.hint}>Tap "Book" in the header to book tickets.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  row: { fontSize: 16, marginBottom: 6 },
  description: { fontSize: 15, color: '#444', marginTop: 12, lineHeight: 22 },
  hint: { marginTop: 24, color: '#B71C1C', fontStyle: 'italic' },
});
