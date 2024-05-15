// Dans PaymentForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import COLORS from '../constants/colors';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const PaymentForm = ({ route }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [idNumberError, setIdNumberError] = useState('');
    const navigation = useNavigation();

    const idUser = route.params.idUser; // Récupérez l'UID passé depuis Signup.js

    // const navigatechoix = () => {
    //     // Vérifiez si tous les champs sont valides
    //     if (cardNumber && cvv && expiryDate && idNumber) {
    //         navigation.navigate('choix');
    //     } else {
    //         // Affichez des messages d'erreur pour les champs manquants
    //         if (!cardNumber) setCardNumberError('Please enter card number');
    //         if (!cvv) setCVVError('Please enter CVV');
    //         if (!expiryDate) setExpiryDateError('Please enter expiration date');
    //         if (!idNumber) setIdNumberError('Please enter ID card number');
    //     }
    // };

    const navigatechoix = async () => {
        // Vérifiez si tous les champs sont valides
        if (cardNumber && cvv && expiryDate && idNumber) {
            try {
                // Envoyer les données au back-end
                const response = await axios.post('http://localhost:3000/user/create', {
                    idUser,
                    cardNumber,
                    cvv,
                    expiryDate,
                    idNumber
                });

                // Vérifiez la réponse du serveur
                if (response.status === 200) {
                    navigation.navigate('choix');
                } else {
                    // Gérez les erreurs du serveur ici
                    alert('Erreur lors de la soumission du formulaire');
                }
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la soumission du formulaire');
            }
        } else {
            // Affichez des messages d'erreur pour les champs manquants
            if (!cardNumber) setCardNumberError('Please enter card number');
            if (!cvv) setCVVError('Please enter CVV');
            if (!expiryDate) setExpiryDateError('Please enter expiration date');
            if (!idNumber) setIdNumberError('Please enter ID card number');
        }
    };

    // Valider le format du numéro de carte bancaire
    const validateCardNumber = (number) => {
        if (/^\d{16}$/.test(number)) {
            setCardNumberError('');
            return true;
        } else {
            setCardNumberError('Please enter a valid 16-digit card number');
            return false;
        }
    };
      // Valider le format du CVV
      const validateCVV = (cvvNumber) => {
        if (/^\d{3,4}$/.test(cvvNumber)) {
            setCVVError('');
            return true;
        } else {
            setCVVError('Please enter a valid CVV number');
            return false;
        }
    };

   // Fonction de validation du numéro de carte d'identité
const validateIDNumber = (id) => {
    if (/^[0-9]{6}$/.test(id)) {
        setIdNumberError('');
        return true;
    } else {
        setIdNumberError('Please enter a valid ID card number (6 digits)');
        return false;
    }
};
// Fonction de validation de la date d'expiration
const validateexpiryDate = (date) => {
    // Vérifier si la date est au bon format (YYYY-MM-DD) et qu'elle est supérieure à la date actuelle
    if (moment(date, 'YYYY-MM-DD', true).isValid() && moment(date, 'YYYY-MM-DD').isAfter(moment(), 'day')) {
        setExpiryDateError('');
        return true;
    } else {
        setExpiryDateError('Please enter a valid expiration date (YYYY-MM-DD)');
        return false;
    }
};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
             <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 5}}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Payment page
                    </Text>

                     <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Card Number</Text>

                <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                <TextInput
                    placeholder='Card Number'
                    placeholderTextColor={COLORS.black}
                    keyboardType='numeric'
                    value={cardNumber}
                    // style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                    style={{
                        width: "100%"
                    }}
                    onChangeText={(text) => {
                        setCardNumber(text);
                        validateCardNumber(text);
                    }}
                />
                </View>
                <Text style={{ color: 'red', marginBottom: 5 }}>{cardNumberError}</Text>
                </View> 

                <View style={{ marginBottom: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>CVV</Text>


                    
                <TextInput
                    placeholder='CVV'
                    value={cvv}
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setCVV(text);
                        validateCVV(text);
                    }}
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />

<Text style={{ color: 'red', marginBottom: 5 }}>{cvvError}</Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Expiration Date</Text>

                <TextInput
                    placeholder='Expiration Date'
                    value={expiryDate}
                    // onChangeText={setExpiryDate}
                    onChangeText={(text) => {
                        setExpiryDate(text);
                        validateexpiryDate(text);
                    }}
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />
                 <Text style={{ color: 'red', marginBottom: 5 }}>{expiryDateError}</Text>
                 </View>


                 <View style={{ marginBottom: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>ID card number</Text>

                <TextInput
                    placeholder='ID card number'
                    value={idNumber}
                    onChangeText={(text) => {
                        setIdNumber(text);
                        validateIDNumber(text);
                    }}
                    keyboardType='numeric'
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />
                <Text style={{ color: 'red', marginBottom: 5 }}>{idNumberError}</Text>

                </View>
                    </View>
                    <Pressable
                        style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 8,
                            height: 48,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0
                        }}
                        // onPress={() => navigation.navigate('choix')}
                        onPress={navigatechoix}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 18 }}>Aller à la nouvelle page</Text>
                    </Pressable>
                    </View>
        </SafeAreaView>
    );
};

export default PaymentForm;

