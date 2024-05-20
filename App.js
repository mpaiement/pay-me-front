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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
        tabBarActiveTintColor: 'blue',
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
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // Unsubscribe on unmount
  },
   []);

  if (initializing) return null; // Peut-être afficher un écran de chargement

  // let devRoute = 'Main'
  // let authState = true
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'PaymentForm' : 'Welcome'}>
      {/* <Stack.Navigator initialRouteName={ devRoute}> */}
        {/* {authState ? ( */}
          {user? (
          <>
            <Stack.Screen
              name="PaymentForm"
              component={PaymentForm}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
           


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
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
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
            <Stack.Screen
              name="PaymentForm"
              component={PaymentForm}
              options={{
                headerShown: false,
              }}
            />
              
          </>
        )}
        {/* <Stack.Screen
          name="Marchand"
          component={Marchand}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="Client"
          component={Client}
          options={{
            headerShown: false,
          }}
        /> */}
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