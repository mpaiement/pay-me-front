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
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const changeEmailaddress = (text) => {
        setEmailaddress(text);
    };

    //   const changeMobilenumber = (text) => {
    //     setMobilenumber(text);
    //   };
    const changeMobilenumber = (text) => {
        const inputNumber = e.target.value.replace(/\D/g, '');
        setPhoneNumber(inputNumber);
    
        if (inputNumber.length !== 10 || !validatePhoneNumber(inputNumber)) {
          setErrors({
            ...errors,
            phoneNumber: 'Please enter a valid phone number',
          });
        } else {
          setErrors({ ...errors, phoneNumber: '' });
        }
      };
    
      const validateMobilenumber = (number) => {
        const algerianNumberRegex = /^(0)(5|6|7)\d{8}$/;
        return algerianNumberRegex.test(number);
      };


    
      const changePassword = (text) => {
        setPassword(text);
      };
      const changeCVV = (text) => {
        setCVV(text);
      };
      const changeExpirationDate = (text) => {
        setExpirationDate(text);
      };
      const changeCardNumber = (text) => {
        setCardNumber(text);
      };
      const changeIdNumber = (text) => {
        setIdNumber(text);
      };
     
      const submit = async () => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                emailaddress,
                password
            );
        

            console.log("🚀 ~ submit ~ result:", result)

            // TODO Navigate to Home screen after successful signup

        }catch (err) {
            Alert.alert('Error', err.message);
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

                    {/* <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your friend today!</Text> */}
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
                </View>

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
                    onChangeText={setCardNumber}
                />
                </View>
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
                    onChangeText={setCVV}
                    keyboardType='numeric'
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />

                
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Expiration Date</Text>

                <TextInput
                    placeholder='Expiration Date'
                    value={expirationDate}
                    onChangeText={setExpirationDate}
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />
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
                    onChangeText={setIdNumber}
                    keyboardType='numeric'
                    style={{ marginBottom: 12, borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 48, paddingLeft: 22 }}
                />
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
                            placeholder='+91'
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