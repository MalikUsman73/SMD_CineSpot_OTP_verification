import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOVIES } from '../data/movies';

export default function MovieListScreen({ navigation }) {
  return (
    <FlatList
      data={MOVIES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          // Pass the selected movie to the details screen as a route param
          onPress={() => navigation.navigate('MovieDetails', { movie: item })}
        >
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.genre} • {item.duration}
            </Text>
          </View>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#666', marginTop: 4 },
  rating: { fontSize: 16, fontWeight: '600' },
});
