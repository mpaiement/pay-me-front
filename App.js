
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, Welcome} from "./screens";
// import Marchand from "./screens/Marchand"; // Assurez-vous d'importer la composante Marchand
// import Client from './screens/client';
import Choix from './screens/choix';

const Stack = createNativeStackNavigator();
import PaymentForm from './screens/PaymentForm';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
           <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />

         
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="PaymentForm"
          component={PaymentForm}
          options={{
            headerShown: false
          }}
        />
        
         <Stack.Screen
          name="choix"
          component={Choix}
          options={{
            headerShown: false
          }}
        />
     
        {/* <Stack.Screen
          name="Marchand"
          component={Marchand}
          options={{
            headerShown: false
          }}
        /> */}
        {/* <Stack.Screen
          name="Client"
          component={Client}
          options={{
            headerShown: false
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

