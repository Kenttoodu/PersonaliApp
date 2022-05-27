import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { roledb } from '../../../fireBase'
import { getDocs, collection } from "firebase/firestore"

import { useNavigation } from '@react-navigation/native'

export const SOPScreen = () => {

  const [allSOPs, setAllSOPs] = useState('')

  const navigation = useNavigation();

  //GET ALL SOPS
  useEffect(() => {

    const getAllSOPCollection = collection(roledb, "SOPs")


      getDocs(getAllSOPCollection)
      .then((snapshot) => {
        setAllSOPs(snapshot.docs.map(rel => rel.data()))

        navigateSOPText()
      }).catch(error => {error.message}) 
  }, [])


  const navigateSOPText = key => {
    const SOPHeadline = allSOPs[key].headline
    const SOPText = allSOPs[key].text

    navigation.push("SingleSOP", {
      SOPHeadline,
      SOPText
    });
  }

  const renderSOPs = () => {
    return (
      
      Object.keys(allSOPs).map((key) => 
      <TouchableOpacity key={key} onPress={() => navigateSOPText(key)}>
        <View  style={styles.sopInfoContainer}>

          <Text style={styles.SOPheadline}>{allSOPs[key].headline}</Text>
        </View>
      </TouchableOpacity>
      )
    )
      
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Sisekorraeeskirjad</Text>
      </View>
      <View style={styles.SOPsContainer}>
        <ScrollView style={styles.SOPScroll}>
          {renderSOPs()}
          
        </ScrollView>
      </View>
    </View>
  )
}

export default SOPScreen

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
    height: 65,
    alignItems: "center",

    borderBottomWidth: 2,
    borderBottomColor: "#984447",
    padding: 10,
    marginBottom: 25,
  },
  SOPsContainer: {
    width: "100%",
    height: 710,
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  sopInfoContainer: {
    backgroundColor: "#984447",
    width: "95%",
    height: 40,
    marginBottom: 10,
    flexDirection:'column',
    justifyContent: "center",
  },
  headerText: {
    color: "#FEF5EF",
    fontSize: 24,
  },
  addUserIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  SOPheadline: {
    color: "#FEF5EF",
    marginBottom: 10,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  SOPText: {
    color: "#FEF5EF",
    marginBottom: 10,
    whiteSpace: 'pre-line',
    paddingLeft: 15,
    paddingRight: 15,
  },
  SOPScroll: {
    width: '100%',
    flex: 1,

  },
})