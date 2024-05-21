import React, { useState, useEffect } from "react";
import { Alert, TextInput, View, Button } from "react-native";
import axios from "axios";

function ProfileScreen() {
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
      // Remplacez "http://localhost:3000/user/" par l'URL correcte pour récupérer le profil de l'utilisateur actuellement connecté
      const response = await axios.get("http://localhost:3000/user");
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
