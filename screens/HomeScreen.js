import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { idUser } = route.params;
  console.log("🚀 ~ HomeScreen ~ idUser:", idUser)

  const handleScanPress = () => {

    // navigation.navigate('ScanScreen');
    navigation.navigate('ScanScreen', { idUser })


  };
  const handleLogout = () => {
    signOut(auth) // Utilisez la fonction de déconnexion de Firebase
      .then(() => {
        navigation.navigate('Login'); // Redirigez l'utilisateur vers l'écran de connexion
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View>

      </View>
      <Image source={require('../assets/back3.jpg')} style={styles.photo} />
      <TouchableOpacity style={styles.button} onPress={handleScanPress}>
        <Text style={styles.buttonText}>Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#05c',
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5
  },
  logoutButtonText: {
    color: '#05c',
    fontSize: 16,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 0,
    marginLeft: 0,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  photo: {
    width: 800,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -40,

  },
  button: {
    backgroundColor: '#05c',
    padding: 10,
    borderRadius: 5,
    marginTop: 80,
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;
