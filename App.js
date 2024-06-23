import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome } from './screens';
import HomeScreen from './screens/HomeScreen.js';
import PaymentForm from './screens/PaymentForm';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileScreen from './screens/profileScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import ScanScreen from './screens/ScanScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationScreen from './screens/ConfirmationScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function TabNavigator({ route }) {
  const { idUser } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#05c',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          width: '100%',
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          margin: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ idUser }} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ idUser }} />
      <Tab.Screen name="History" component={HistoryScreen} initialParams={{ idUser }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [authentificated, setAthentificated] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setAthentificated(true);

      } else {
        setAthentificated(false);
      }

      const subscriber = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setAthentificated(true);
        if (user) {
          AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          AsyncStorage.removeItem('user');
        }
        if (initializing) setInitializing(false);
      });
      return subscriber; // Unsubscribe on unmount
    };

    checkUser();
  }, []);

  if (initializing) return null; // Peut-être afficher un écran de chargement

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={user && authentificated ? 'TabNavigator' : 'Welcome'}>
        {user && authentificated ? (
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
              initialParams={{ idUser: user.uid }} // Passez l'ID utilisateur ici
            />
            <Stack.Screen
              name="ScanScreen"
              component={ScanScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ConfirmationScreen"
              component={ConfirmationScreen}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="PaymentForm"
              component={PaymentForm}
              options={{
                headerShown: false,
              }}
              {...props => (
                <PaymentForm
                    {...props}
                  setAthentificated={setAthentificated}
                />
            )}
             
            /> */}

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="PaymentForm" options={{ headerShown: false }}>
              {(props) => (
                <PaymentForm {...props} setAthentificated={setAthentificated} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="PaymentForm"
              component={PaymentForm}
              options={{
                headerShown: false,
              }}
            />  */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
});

