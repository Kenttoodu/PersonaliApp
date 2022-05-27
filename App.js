import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import NavScreen from './screens/NavScreen';

const LoginStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator>
        <LoginStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <LoginStack.Screen options={{ headerShown: false }} name="NavScreen" component={NavScreen} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}