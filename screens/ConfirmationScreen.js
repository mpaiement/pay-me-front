import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

function ConfirmationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idUser, idMarchand, amount } = route.params || {};
  const [merchantName, setMerchantName] = useState('');

  console.log("🚀 ~ ConfirmationScreen ~ route.params:", route.params);

  useEffect(() => {
    // Fetch merchant details
    const fetchMerchantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/marchand/${idMarchand}`);
        const { name } = response.data[0];
        setMerchantName(name);
      } catch (error) {
        console.error('Failed to fetch merchant details:', error);
        alert('Une erreur est survenue lors de la récupération des informations du marchand.');
      }
    };

    if (idMarchand) {
      fetchMerchantDetails();
    }
  }, [idMarchand]);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/transaction/create', {
        idMarchand,
        amount: parseFloat(amount),
        idUser
      });
      console.log(response.data);
      const { idTransaction } = response.data;
      console.log("🚀 ~ handleConfirm ~ idTransaction:", idTransaction);
      
      navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Une erreur est survenue lors de la création de la transaction.');
    }
  };

  const handleCancel = () => {
    alert('Paiement annulé !');
    // navigation.goBack();
    navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
  };

  return (
    <View style={styles.container}>
      {merchantName ? (
        <Text>Vous avez fait un achat chez {merchantName}</Text>
      ) : (
        <Text>Chargement des informations du marchand...</Text>
      )}
      <Text>ID du marchand: {idMarchand}</Text>
      <Text>Montant: {amount}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Confirmer le paiement" onPress={handleConfirm} />
        <Button title="Annuler le paiement" onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ConfirmationScreen;
