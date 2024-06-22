import React from 'react';
// import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

function ConfirmationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idUser, idMarchand, amount } = route.params || {};

  console.log("🚀 ~ ConfirmationScreen ~ route.params:", route.params);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/transaction/create', {
        idMarchand,
        amount: parseFloat(amount),
        idUser
      });
      console.log(response.data);
      // alert('Transaction créée avec succès!');
      // ToastAndroid.show('Transaction créée avec succès!',ToastAndroid.SHORT);
      const { idTransaction } = response.data;
      console.log("🚀 ~ handleConfirm ~ idTransaction:", idTransaction);
      
      // navigation.navigate('HomeScreen'); 
      navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Une erreur est survenue lors de la création de la transaction.');
    }
  };

  const handleCancel = () => {
    alert('Paiement annulé !');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
