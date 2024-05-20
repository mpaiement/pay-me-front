import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome } from './screens';
import Home from './screens/home';
import PaymentForm from './screens/PaymentForm';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'PaymentForm' : 'Welcome'}>
        {user ? (
          <>
            <Stack.Screen
              name="PaymentForm"
              component={PaymentForm}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
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
