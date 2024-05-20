import React, { useState, useEffect, useRef } from "react";
import { Alert, TextInput, View, Button, Image ,TouchableOpacity} from "react-native";
import axios from "axios";
// import { useRoute } from '@react-navigation/native';

function ProfileScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    idNumber: ""
  });
// Fonction de gestion de changement de formulaire
const handleChange = (name, value) => {
  setFormData({
    ...formData,
    [name]: value,
    [email]: value, 
    [cardNumber]: value,  
    [expiryDate]: value,
    [idNumber]: value,
  });
};
const getProfile = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user");
    setFormData(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données du profil :", error);
  }
};
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
    getProfile();
  }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '80%', padding: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Name"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Email"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.cardNumber}
          onChangeText={(text) => handleChange('cardNumber', text)}
          placeholder="Card Number"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.cvv}
          onChangeText={(text) => handleChange('cvv', text)}
          placeholder="CVV"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.expiryDate}
          onChangeText={(text) => handleChange('expiryDate', text)}
          placeholder="Expiration Date"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={formData.idNumber}
          onChangeText={(text) => handleChange('idNumber', text)}
          placeholder="ID Card Number"
        />
        <Button title="Update Profile" onPress={updateProfile} />
      </View>
    </View>
  );
}
export default ProfileScreen;