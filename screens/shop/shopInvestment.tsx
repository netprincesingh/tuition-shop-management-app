import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const shopInvestment = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async (data) => {
    await AsyncStorage.setItem('shopDataInvestment', JSON.stringify(data));
  };

  const loadData = async () => {
    const storedData = await AsyncStorage.getItem('shopDataInvestment');
    if (storedData) setProducts(JSON.parse(storedData));
  };

  const addProduct = () => {
    if (product && cost) {
      const currentDate = new Date().toLocaleDateString(); // Get current date
      const updatedList = [...products, { product, cost: parseFloat(cost), date: currentDate }];
      setProducts(updatedList);
      saveData(updatedList);
      setProduct('');
      setCost('');
    }
  };

  const deleteProduct = (index) => {
    const updatedList = products.filter((_, i) => i !== index);
    setProducts(updatedList);
    saveData(updatedList);
  };

  const totalCost = products.reduce((acc, item) => acc + item.cost, 0);

  return (
    <View style={styles.container}>
      <Text>Total Shop Investment: ₹{totalCost}</Text>
      <TextInput placeholder="Product Name" value={product} onChangeText={setProduct} style={styles.input} />
      <TextInput placeholder="Cost" value={cost} onChangeText={setCost} keyboardType="numeric" style={styles.input} />
      <Button title="Add Product" onPress={addProduct} />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text>{item.product}: ₹{item.cost}</Text>
              <Text style={styles.dateText}>Date: {item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteProduct(index)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
    },

  input: { 
    borderWidth: 1, 
    padding: 8, 
    marginVertical: 5 
    },
  itemContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10 },

  deleteButton: { 
    fontSize: 18 
    },
  dateText: { 
    fontSize: 12, 
    color: 'gray' 
}, 
});

export default shopInvestment;