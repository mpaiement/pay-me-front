import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import COLORS from '../constants/colors';

function ConfirmationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idUser, idMarchand, amount } = route.params || {};
  const [merchantName, setMerchantName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchantDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.43:3000/marchand/${idMarchand}`);
        const { name } = response.data[0];
        setMerchantName(name);
      } catch (error) {
        alert('Une erreur est survenue lors de la récupération des informations du marchand.');
      } finally {
        setLoading(false);
      }
    };

    if (idMarchand) {
      fetchMerchantDetails();
    }
  }, [idMarchand]);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://192.168.1.43:3000/transaction/transfertMoney', {
        idMarchand,
        amount: parseFloat(amount),
        idUser
      });
      const { idTransaction } = response.data;
      if (idTransaction) {
        navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
      } else {
        alert("Une erreur est survenue lors du transfert d'argent");
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la création de la transaction.');
    }
  };

  const handleCancel = () => {
    alert('Paiement annulé !');
    navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        merchantName ? (
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Paiement pour</Text>
              <Text style={styles.value}>{merchantName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Total à payer</Text>
              <Text style={styles.value}>{amount} DA</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Confirmer le paiement" onPress={handleConfirm} color={COLORS.blue} />
              </View>
              <View style={styles.button}>
                <Button title="Annuler le paiement" onPress={handleCancel} color="#ff5c5c" />
              </View>
            </View>
          </View>
        ) : (
          <Text>Chargement des informations du marchand...</Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  infoContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  value: {
    color: '#05c',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
});

export default ConfirmationScreen;
