import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { idUser } = route.params;
  console.log("🚀 ~ HomeScreen ~ idUser:", idUser)

  const handleScanPress = () => {
    
    // navigation.navigate('ScanScreen');
    navigation.navigate('ScanScreen', { idUser })
 

  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      {/* <View style={{ width:500}}> */}
      <Image source={require('../assets/back3.jpg')} style={styles.photo} />
      <TouchableOpacity style={styles.button} onPress={handleScanPress}>
        <Text style={styles.buttonText}>Scanner</Text>
      </TouchableOpacity>
      </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 80,
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
