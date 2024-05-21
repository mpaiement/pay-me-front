import React, { useState, useEffect } from "react";
import { Alert, TextInput, View, Button } from "react-native";
import axios from "axios";
import { useRoute } from '@react-navigation/native';

function ProfileScreen() {
  const route = useRoute();
  const { idUser } = route.params;
  console.log("🚀 ~ ProfileScreen ~ idUser:", idUser)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    idNumber: ""
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getProfile = async () => {
    try {
      // const userId = idUser;
      const response = await axios.get(`http://localhost:3000/user/${idUser}`);
      const profileData = response.data;

      // Vérifiez et assignez des valeurs par défaut si des champs sont indéfinis
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        cardNumber: profileData.cardNumber || "",
        cvv: profileData.cvv || "",
        expiryDate: profileData.expiryDate || "",
        idNumber: profileData.idNumber || ""
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données du profil :", error);
    }
  };
  // console.log("🚀 ~ getProfile ~ error:",  idUser)
  const updateProfile = async () => {
    try {
      await axios.put("http://localhost:3000/user/putUser", formData);
      Alert.alert("Succès", "Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      Alert.alert("Erreur", "Échec de la mise à jour du profil");
    }
  };

  useEffect(() => {
    if (idUser) {
      getProfile();
    } else {
      console.error("idUser est indéfini");
    }
  }, [idUser]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#a2c5f3', }}>
      <View style={{ width: '80%',height: '60%', padding: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 20 , shadowColor:'blue',  backgroundColor: '#f3f4f6', marginTop:-100, paddingHorizontal: 32, marginVertical: 50,  paddingBottom: 32,paddingTop: 40}}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 20 }}   //  celui de name 
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Name"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 ,borderRadius: 20 }}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Email"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10,borderRadius: 20  }}
          value={formData.cardNumber}
          onChangeText={(text) => handleChange('cardNumber', text)}
          placeholder="Card Number"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 ,borderRadius: 20 }}
          value={formData.cvv}
          onChangeText={(text) => handleChange('cvv', text)}
          placeholder="CVV"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10,borderRadius: 20  }}
          value={formData.expiryDate}
          onChangeText={(text) => handleChange('expiryDate', text)}
          placeholder="Expiration Date"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10,borderRadius: 20  }}
          value={formData.idNumber}
          onChangeText={(text) => handleChange('idNumber', text)}
          placeholder="ID Card Number"
        /> 
        <Button title="Update Profile" onPress={updateProfile} style={{ margintop:100, marginBottom:0,backgroundColor: '#a2c5f3',}}/>
      </View>
    </View>
  );
}

export default ProfileScreen;
