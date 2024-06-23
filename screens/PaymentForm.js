import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import COLORS from '../constants/colors';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

const PaymentForm = ({ setAthentificated }) => {

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [displayExpiryDate, setDisplayExpiryDate] = useState('');
    const [cni, setcni] = useState('');
    const [nameError, setNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [cniError, setcniError] = useState('');
    const navigation = useNavigation();

    const route = useRoute();
    const user = getAuth();
    const id = user?.currentUser?.uid;
    const email1 = user?.currentUser?.email;

    const navigatehomeScreen = async () => {
        const isNameValid = validateName(name);
        const isCardNumberValid = validateCardNumber(cardNumber);
        const isCVVValid = validateCVV(cvv);
        const isExpiryDateValid = validateexpiryDate(expiryDate);
        const isCniValid = validatecni(cni);

        if (isNameValid && isCardNumberValid && isCVVValid && isExpiryDateValid && isCniValid) {
            try {
                const response = await axios.post(`http://192.168.1.43:3000/user/create`, {
                    idUser: id,
                    name,
                    cardNumber,
                    cvv,
                    expiryDate,
                    cni,
                    email: email1,
                    phone: '+213555555555'
                });

                if (response.status === 201) {
                    setAthentificated(true);
                    navigation.navigate('TabNavigator', { screen: 'HomeScreen' });
                } else {
                    alert('Erreur lors de la soumission du formulaire');
                }
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la soumission du formulaire1', error);
            }
        }
    };

    const validateName = (name) => {
        if (name.trim() !== '') {
            setNameError('');
            return true;
        } else {
            setNameError('Please enter a valid name');
            return false;
        }
    };

    const validateCardNumber = (number) => {
        if (/^\d{16}$/.test(number)) {
            setCardNumberError('');
            return true;
        } else {
            setCardNumberError('Please enter a valid 16-digit card number');
            return false;
        }
    };

    const validateCVV = (cvvNumber) => {
        if (/^\d{3,4}$/.test(cvvNumber)) {
            setCVVError('');
            return true;
        } else {
            setCVVError('Please enter a valid CVV number');
            return false;
        }
    };

    const validatecni = (id) => {
        if (/^[0-9]{9}$/.test(id)) {
            setcniError('');
            return true;
        } else {
            setcniError('Please enter a valid ID card number (9 digits)');
            return false;
        }
    };

    const validateexpiryDate = (date) => {
        if (moment(date, 'YYYY-MM', true).isValid() && moment(date, 'YYYY-MM').isAfter(moment(), 'month')) {
            setExpiryDateError('');
            const newExpiryDate = moment(date, 'YYYY-MM').add(30, 'days');
            setDisplayExpiryDate(newExpiryDate.format('MM-YYYY'));
            return true;
        } else {
            setExpiryDateError('Please enter a valid expiration date (YYYY-MM)');
            return false;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Payment page
                        </Text>
                        <View style={{ marginBottom: 1 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 8
                            }}>Name</Text>
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
                                    placeholder='Name'
                                    placeholderTextColor={COLORS.black}
                                    value={name}
                                    style={{ width: "100%" }}
                                    onChangeText={(text) => {
                                        setName(text);
                                        validateName(text);
                                    }}
                                />
                            </View>
                            <Text style={{ color: 'red', marginBottom: 1 }}>{nameError}</Text>
                        </View>

                        <View style={{ marginBottom: 1 }}>
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
                                    style={{
                                        width: "100%"
                                    }}
                                    onChangeText={(text) => {
                                        setCardNumber(text);
                                        validateCardNumber(text);
                                    }}
                                />
                            </View>
                            <Text style={{ color: 'red', marginBottom: 1 }}>{cardNumberError}</Text>
                        </View>

                        <View style={{ marginBottom: 1 }}>
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
                                style={{ marginBottom: 1, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                            />

                            <Text style={{ color: 'red', marginBottom: 1 }}>{cvvError}</Text>
                        </View>
                        <View style={{ marginBottom: 1 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 8
                            }}>Expiration Date</Text>

                            <TextInput
                                placeholder='Expiration Date (YYYY-MM)'
                                value={expiryDate}
                                onChangeText={(text) => {
                                    setExpiryDate(text);
                                    validateexpiryDate(text);
                                }}
                                style={{ marginBottom: 1, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                            />
                            <Text style={{ color: 'red', marginBottom: 1 }}>{expiryDateError}</Text>
                            <Text style={{ color: COLORS.black, marginBottom: 1 }}>Expiry Date (YYYY-MM): {displayExpiryDate}</Text>
                        </View>

                        <View style={{ marginBottom: 1 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 8
                            }}>ID card number</Text>

                            <TextInput
                                placeholder='ID card number'
                                value={cni}
                                onChangeText={(text) => {
                                    setcni(text);
                                    validatecni(text);
                                }}
                                keyboardType='numeric'
                                style={{ marginBottom: 1, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                            />
                            <Text style={{ color: 'red', marginBottom: 1 }}>{cniError}</Text>

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

                        onPress={navigatehomeScreen}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 18 }}>Sign Up</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentForm;
