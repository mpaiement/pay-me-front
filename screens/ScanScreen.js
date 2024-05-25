
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

function ScaneScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { idUser } = route.params;

  console.log("🚀 ~ ScaneScreen ~ idUser:", idUser)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
//   };
const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    // Parse the scanned data (assuming it's in JSON format)
    let transactionData;
    try {
      transactionData = JSON.parse(data);
    } catch (error) {
      Alert.alert('Invalid QR Code', 'The scanned QR code is not in the correct format.');
      setScanned(false);
      return;
    }

    const { amount, idMarchand } = transactionData;

    // Create the transaction
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.8:3000/transaction/create', {
        idMarchand,
        amount,
        idUser
      });
      Alert.alert('Transaction Success', 'The transaction was created successfully.');
    } catch (error) {
      Alert.alert('Transaction Failed', 'There was an error creating the transaction.');
      console.error('Error creating transaction:', error);
    } finally {
      setLoading(false);
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        // <View style={styles.buttonContainer}>
        //   <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        //   <Button title={'Go Back'} onPress={() => navigation.goBack()} />
        // </View>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          )}
          <Button title={'Go Back'} onPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ScaneScreen;