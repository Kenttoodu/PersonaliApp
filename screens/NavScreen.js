import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons }  from "@expo/vector-icons"

import HomeScreen from './navscreens/HomeScreen'
import ScheduleScreen from './navscreens/ScheduleScreen'
import SOPNav from './navscreens/SOPs/SOPNav'
import VacationScreen from './navscreens/VacationScreen'
import UsersNav from './navscreens/users/UsersNav'


const Homescreen = () => {

  const bottomNav = createBottomTabNavigator()


  return (
    <bottomNav.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        //Return Tab icons based on name.
        if (route.name === 'Kodu') {
          iconName = focused
            ? 'ios-home'
            : 'md-home';
        } else if (route.name === 'SOP') {
          iconName = focused ? 'ios-book' : 'md-book';
        } else if (route.name === 'Graafikud') {
          iconName = focused ? 'ios-time' : 'md-time';
        } else if (route.name === 'Vacation') {
          iconName = focused ? 'ios-calendar' : 'md-calendar';
        } else if (route.name === 'Töötajad') {
          iconName = focused ? 'ios-people' : 'md-people';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#984447',
      tabBarInactiveTintColor: '#151515',
    })}
  >
      <bottomNav.Screen options={{ headerShown: false }} name="Kodu" component={HomeScreen}/>
      <bottomNav.Screen options={{ headerShown: false }} name="SOP" component={SOPNav}/>
      <bottomNav.Screen options={{ headerShown: false }} name="Graafikud" component={ScheduleScreen}/>
      <bottomNav.Screen options={{ headerShown: false }} name="Töötajad" component={UsersNav}/>
    </bottomNav.Navigator>

  )
}

export default Homescreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#153243',
  },
  welcomeText: {
    color: '#FEF5EF',
  },
  button: {
    backgroundColor: '#9D5C63',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
    marginTop: 40,
  },
  buttonText: {
    color: '#FEF5EF',
  },
})