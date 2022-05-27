
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text } from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome5"

import { NavigationContainer, useNavigation, getParam } from '@react-navigation/native';

const SingleSOP = ({route}) => {

    const navigation = useNavigation();

    const sopName = route.params.SOPHeadline
    const sopText = route.params.SOPText

    const navBack = () => {
      navigation.goBack()
    }


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>{sopName.replace('.txt', '')}</Text>

        <TouchableOpacity style={styles.goBackIcon} onPress={navBack}>
          <Icon name="angle-left" size={30} color="#FEF5EF"/>
        </TouchableOpacity> 
      </View>
      <View style={styles.SOPsContainer}>
        <ScrollView style={styles.SOPScroll}>
          <Text style={styles.SOPText}>{sopText.replace(/\\n/g, "\n")}</Text>
        </ScrollView>
      </View>
    </View>
  )
}

export default SingleSOP

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: "wrap",
    flex: 1,
  },
  topBar: {
    width: "100%",
    flex: 0.05,
    alignItems: "center",

    borderBottomWidth: 2,
    borderBottomColor: "#984447",
    padding: 10,
  },
  SOPsContainer: {
    width: "100%",
    flex: 0.95,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  SOPScroll: {
    width: '100%',
    flex: 1,

  },
  SOPText: {
    color: "#FEF5EF",
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  goBackIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  headerText: {
    color: "#FEF5EF",
    fontSize: 24,
  },
})