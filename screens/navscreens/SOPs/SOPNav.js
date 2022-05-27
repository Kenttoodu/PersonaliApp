import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SOPStack = createNativeStackNavigator();

import SOPScreen from './SOPScreen'
import SingleSOP from './SingleSOP'

const SOPNav = () => {
  return (
    <SOPStack.Navigator>
        <SOPStack.Screen options={{ headerShown: false }} name="SOPScreen" component={SOPScreen} />
        <SOPStack.Screen options={{ headerShown: false }} name="SingleSOP" component={SingleSOP} />
    </SOPStack.Navigator>
  )
}

export default SOPNav

const styles = StyleSheet.create({})