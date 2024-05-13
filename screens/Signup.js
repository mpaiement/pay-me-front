import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [emailaddress, setEmailaddress] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState();
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const changeEmailaddress = (text) => {
        setEmailaddress(text);
    };

    const changeMobilenumber = (text) => {
        setMobilenumber(text);
        setPhoneError(''); // Réinitialise l'erreur en cas de saisie de nouveau numéro
    };    
    
    
    const changePassword = (text) => {
        setPassword(text);
        setPasswordError(''); // Réinitialise l'erreur lorsque l'utilisateur commence à saisir un nouveau mot de passe
    };
    
      const submit = async () => {
        const errors = {};
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                emailaddress,
                password
            );

            const userID = result.user.uid
            console.log("🚀 ~ Login ~ userID:", userID)

            // Passez à la nouvelle page
            navigation.navigate('PaymentForm', { userID });    
            // console.log("🚀 ~ submit ~ result:", result)

            // TODO Navigate to Home screen after successful signup

        // }catch (err) {
        //     Alert.alert('Error', err.message);
        // }

    } catch (err) {
        console.log(err); // Ajoutez cette ligne pour vérifier la structure de l'erreur
        // Vérifier si l'erreur est due à une adresse e-mail déjà utilisée
        if (err.code === 'auth/email-already-in-use') {
            // Alert.alert('Error', "This email address is already in use. Please use a different email address.");
            setEmailError('This email address is already in use. Please use a different email address.')
        // } else if (err.code === 'auth/internal-error') {
        //     // Display the custom error message for internal errors
        //     setErrors('Internal error occurred. Please try again later.');
        } else if (err.code === 'auth/invalid-phone-number') {
            // Afficher le message d'erreur personnalisé pour un numéro de téléphone invalide
            setPhoneError('Invalid phone number. Please enter a valid phone number.');
        }else if (err.code === 'auth/phone-number-already-exists') {
            // Afficher le message d'erreur personnalisé pour un numéro de téléphone déjà utilisé
            setPhoneError('This phone number is already in use. Please use a different phone number.');
        } else if (err.code === 'auth/weak-password' || err.code === 'auth/invalid-password') {
            // Afficher le message d'erreur personnalisé pour un mot de passe invalide
            setPasswordError('Invalid password. Please enter a valid password.');
        }
        else {
            // Gérer les autres erreurs ici
            Alert.alert('Error', err.message);
        }
    }
}

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
                        Create Account
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

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
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            value={emailaddress}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={changeEmailaddress}
                        />
                    </View>
                    <View>
                        {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
                    </View>
                </View>
              
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+213'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            value={mobilenumber}
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                            onChangeText={changeMobilenumber}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                        />
                    </View>
                    <View>
                        {phoneError && <Text style={{ color: 'red' }}>{phoneError}</Text>}
                    </View>

                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

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
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            value={password}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={changePassword}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        {errors && <Text style={{ color: 'red' }}>{errors}</Text>}
                    </View> */}
                    <View>
                        {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 0,
                        marginBottom: 4,
                    }}
                    onPress={submit}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    {/* <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                 </View>

                 <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                 }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                 </View>

                 <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                 }}> */}
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                 </View>
                </View>
        </SafeAreaView>
    )
}

export default Signup