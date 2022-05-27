import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UsersStack = createNativeStackNavigator();

import CreateNewUser from './CreateNewUser'
import WorkersScreen from './WorkersScreen'

const Usersnav = () => {
  return (
    <UsersStack.Navigator>
        <UsersStack.Screen options={{ headerShown: false }} name="WorkersScreen" component={WorkersScreen} />
        <UsersStack.Screen options={{ headerShown: false }} name="CreateNewUser" component={CreateNewUser} />
    </UsersStack.Navigator>
  )
}

export default Usersnav

const styles = StyleSheet.create({})