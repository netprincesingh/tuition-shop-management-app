import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';

import tuitionHome from './screens/tuition/tuitionHome';
import tuitionIncome from './screens/tuition/tuitionIncome';
import tuitionExpense from './screens/tuition/tuitionExpense';


import shopHome from './screens/shop/shopHome';
import shopIncome from './screens/shop/shopIncome';
import shopExpense from './screens/shop/shopExpense';
import shopInvestment from './screens/shop/shopInvestment';






const Stack = createStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tuition" component={tuitionHome} />
        <Stack.Screen name="Shop" component={shopHome} />
        <Stack.Screen name="Shop Income" component={shopIncome} />
        <Stack.Screen name="Tuition Income" component={tuitionIncome} />
        <Stack.Screen name="Tuition Expense" component={tuitionExpense} />
        <Stack.Screen name="Shop Expense" component={shopExpense} />
        <Stack.Screen name="Shop Investment" component ={shopInvestment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

