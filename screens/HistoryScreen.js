import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { idUser } = route.params;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://192.168.1.43:3000/transaction/historique/${idUser}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.item} >
        <Text style={styles.createdDate}>{dayjs(item.createdDate).format('DD/MM/YYYY   HH:mm')}</Text>
        <Text style={styles.amount}>{item.amount} DA</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginBottom: 10,
    // borderColor: '#007bff',
    // borderWidth: 1, // Ajout de la bordure
  },
  createdDate: {
    fontSize: 17,
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
