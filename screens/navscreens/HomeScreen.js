import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, roledb } from '../../fireBase'
import { doc, getDoc} from "firebase/firestore"

import { useNavigation} from '@react-navigation/native'


export const HomeScreen = () => {

  const [CurrentUserNumber, setCurrentUserNumber] = useState('');
  const [CurrentUserRole, setCurrentUserRole] = useState('');
  const [CurrentUserDisplayName, setCurrentUserDisplayName] = useState('');
  const [CurrentUserWorkplace, setCurrentUserWorkplace] = useState('');

  const navigation = useNavigation();

  const currentUserID = auth.currentUser.uid;



  //Get current User data from Firestore
  useEffect(() => {


    getDoc(doc(roledb, "usersCollection", currentUserID))
    .then((snapshot) => {

      const userData = snapshot.data()
      setCurrentUserDisplayName(userData.DisplayName)
      setCurrentUserNumber(userData.Number)
      setCurrentUserWorkplace(userData.Workplace)
      setCurrentUserRole(userData.Role)
      
    }).catch(error => {error.message})

    }, [])

    //Logout button
    const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
      .catch(error => alert(error.message))
  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoImage} source={require('../../assets/logo.png')}/>
      </View>
      <Text style={styles.headerText}>Tere {CurrentUserDisplayName}</Text>
      <Text style={styles.headerText}>Number: {CurrentUserNumber}</Text>
      <Text style={styles.headerText}>Workplace: {CurrentUserWorkplace}</Text>
      <Text style={styles.headerText}>Roll: {CurrentUserRole}</Text>
      <TouchableOpacity style={styles.signoutButton} onPress={handleSignout}>
        <Text style={styles.signoutButtonText}>Logi välja</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headlineText: {
    color: '#984447',
    fontSize: 32,
    marginBottom: 50
    
  },
  headerText: {
    color: '#FEF5EF',
    fontSize: 24,
    marginBottom: 20
  },
  signoutButton: {
    backgroundColor: '#984447',
    width: '100%',
    maxWidth: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    width: '60%',
    marginTop: 50,
  },
  signoutButtonText: {
    color: '#FEF5EF',
    fontWeight: '500',
    fontSize: 16,
  },
  logoContainer: {
    width: "100%",
    height: 200,
    marginBottom: 100,
    alignContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: "100%",
    width: "50%",
    maxWidth: 200

  },
})