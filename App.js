import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import MovieListScreen from './screens/MovieListScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import VerifiedScreen from './screens/VerifiedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator: Movie List -> Movie Details -> Booking
function MoviesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#B71C1C' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: 'Now Showing' }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        // Header title comes from the route params + a header button
        options={({ route, navigation }) => ({
          title: route.params.movie.title,
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate('Booking', { movie: route.params.movie })
              }
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Book
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: 'Confirm Booking',
          headerStyle: { backgroundColor: '#1B5E20' },
        }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator: Movies tab (contains the stack) + Profile tab
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      }),
    []
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#B71C1C" />
      </View>
    );
  }

  if (!user) {
    return (
      <LoginScreen
        onVerifyStart={() => setVerifying(true)}
        onVerifyFail={() => setVerifying(false)}
      />
    );
  }

  if (verifying) {
    return <VerifiedScreen phone={user.phoneNumber} onContinue={() => setVerifying(false)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#B71C1C',
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>
              {route.name === 'Movies' ? '🎬' : '👤'}
            </Text>
          ),
        })}
      >
        <Tab.Screen
          name="Movies"
          component={MoviesStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'My Profile',
            headerStyle: { backgroundColor: '#263238' },
            headerTintColor: '#fff',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
