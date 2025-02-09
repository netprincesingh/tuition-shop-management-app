import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tuitionIncome = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async (data) => {
    await AsyncStorage.setItem('tuitionDataIncome', JSON.stringify(data));
  };

  const loadData = async () => {
    const storedData = await AsyncStorage.getItem('tuitionDataIncome');
    if (storedData) setStudents(JSON.parse(storedData));
  };

  const addStudent = () => {
    if (name && fees) {
      const currentDate = new Date().toLocaleDateString(); // Get current date
      const updatedList = [...students, { name, fees: parseFloat(fees), date: currentDate }];
      setStudents(updatedList);
      saveData(updatedList);
      setName('');
      setFees('');
    }
  };

  const deleteStudent = (index) => {
    const updatedList = students.filter((_, i) => i !== index);
    setStudents(updatedList);
    saveData(updatedList);
  };

  const totalFees = students.reduce((acc, item) => acc + item.fees, 0);

  return (
    <View style={styles.container}>
      <Text>Total Fees: ₹{totalFees}</Text>
      <TextInput placeholder="Student Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Fees" value={fees} onChangeText={setFees} keyboardType="numeric" style={styles.input} />
      <Button title="Add Student" onPress={addStudent} />
      <FlatList
        data={students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text>{item.name}: ₹{item.fees}</Text>
              <Text style={styles.dateText}>Date: {item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteStudent(index)}>
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
  }
});

export default tuitionIncome;