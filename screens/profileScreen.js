import React, { useState, useEffect } from "react";
import { Alert, TextInput, View, Button, TouchableOpacity, Text, ScrollView } from "react-native";
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
    cni: ""
  });

  const [clickedField, setClickedField] = useState(null); // State pour stocker le champ TextInput cliqué

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInputClick = (fieldName) => {
    setClickedField(fieldName);
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`http://192.168.137.1:3000/user/${idUser}`);
      const profileData = response.data[0];
      console.log("🚀 ~ getProfile ~ profileData:", profileData);

      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        cardNumber: profileData.cardNumber || "",
        cvv: profileData.cvv || "",
        expiryDate: profileData.expiryDate || "",
        cni: profileData.cni || ""
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données du profil :", error);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.patch(`http://192.168.137.1:3000/user/${idUser}`, formData); // Utilisez axios.patch au lieu de axios.put
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

  const inputStyles = (fieldName) => ({
    height: 40,
    borderColor: clickedField === fieldName ? '#007bff' : 'gray', // Change la couleur de la bordure en bleu foncé lorsque le champ est cliqué
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6'
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <View style={{ width: '80%', padding: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 20, shadowColor: 'blue', backgroundColor: '#fff', marginTop: -80 }}>
          <ScrollView>
            <View style={{ marginBottom: 10 }}>
              <Text>User Name</Text>
              <TextInput
                style={inputStyles('name')}
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Name"
                onFocus={() => handleInputClick('name')}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>Email</Text>
              <TextInput
                style={inputStyles('email')}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Email"
                onFocus={() => handleInputClick('email')}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>Card Number</Text>
              <TextInput
                style={inputStyles('cardNumber')}
                value={formData.cardNumber}
                onChangeText={(text) => handleChange('cardNumber', text)}
                placeholder="Card Number"
                onFocus={() => handleInputClick('cardNumber')}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>CVV</Text>
              <TextInput
                style={inputStyles('cvv')}
                value={formData.cvv}
                onChangeText={(text) => handleChange('cvv', text)}
                placeholder="CVV"
                onFocus={() => handleInputClick('cvv')}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>Expiration Date</Text>
              <TextInput
                style={inputStyles('expiryDate')}
                value={formData.expiryDate}
                onChangeText={(text) => handleChange('expiryDate', text)}
                placeholder="Expiration Date"
                onFocus={() => handleInputClick('expiryDate')}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>ID Card Number</Text>
              <TextInput
                style={inputStyles('cni')}
                value={formData.cni}
                onChangeText={(text) => handleChange('cni', text)}
                placeholder="ID Card Number"
                onFocus={() => handleInputClick('cni')}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={updateProfile} style={{ borderRadius: 20, overflow: 'hidden', width: 150, height: 40, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
