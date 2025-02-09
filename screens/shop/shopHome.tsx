

import React from 'react';
import { View, Button, StyleSheet,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const tuitionHome = ({ navigation }) => {
    return (
        <>

        

      <View style={styles.container}>

      <View>
            <Text style ={styles.textM}>Shop Section</Text>
        </View>
        
        <View style = {styles.btn1}>
          <Button title="Income" onPress={() => navigation.navigate('Shop Income')} />
        </View>
        
        <View style = {styles.btn2}>
        <Button title="Expense" onPress={() => navigation.navigate('Shop Expense')} />
        </View>

        <View style = {styles.btn3}>
        <Button title="Investment" onPress={() => navigation.navigate('Shop Investment')} />
        </View>
        
      </View>

      </>
    );
  };

  export default tuitionHome;

  
const styles = StyleSheet.create({

    textM:{
        fontSize: 20,
        margin:20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    btn1: {
        width:300,
        height:100,
        
        
    },
  
    btn2: {
        width:300,
        height:100,
       
    },
    btn3: {
        width:300,
        height:100,
    }
  });