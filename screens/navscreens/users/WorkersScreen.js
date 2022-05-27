import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { roledb, auth } from '../../../fireBase'
import { getDocs, collection, getDoc, doc, where, query } from "firebase/firestore"
import { useNavigation, useIsFocused} from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'

import Icon  from "react-native-vector-icons/FontAwesome5"


const WorkersScreen = () => {

  const currentUserID = auth.currentUser.uid;

  const [AllUsers, setAllUsers] = useState('');
  const [CurrentUserRole, setCurrentUserRole] = useState('');

  const [SelectFilterWorkplace, setSelectFilterWorkplace] = useState('all');
  const [filterWorkplaces, setFilterWorkplaces] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const currentUserInfo = collection(roledb, "usersCollection")

  useEffect(() => {

    //Get Current logged in user Role

    const GetCurrentUserRole = async() => {
      getDoc(doc(roledb, "usersCollection", currentUserID))
      .then((snapshot) => {
  
        const userData = snapshot.data()
        setCurrentUserRole(userData.Role)

        
      }).catch(error => {error.message})
    }

    const GetAllWorkplacesList = async() => {

      const myWorkplaceDB = doc(roledb, "Workplaces", "workplace");


        getDoc(myWorkplaceDB).then((snapshot) => {
          if(snapshot.exists) {
            const workplaceListData = snapshot.data();
            const workplaceList = workplaceListData.workplace;
            
            setFilterWorkplaces(workplaceList);
  
            return snapshot.data();
          }
          else {
            console.log("Rolle ei leitud.")
          }
        }).catch((error) => {
          console.log(error.message)
        })


    }

    GetCurrentUserRole();
    GetAllWorkplacesList();


    }, [])


    //Reset search filter
    useEffect(() => {
      setSelectFilterWorkplace("all")
    }, [isFocused])



  //If filter all get all users, if filter changed get all workers of place.
  useEffect(() => {

    if(isFocused) {

      if(SelectFilterWorkplace === "all") {

        if(isFocused) {
    
          getDocs(currentUserInfo)
          .then((snapshot) => {
            setAllUsers(snapshot.docs.map(rel => rel.data()))
    
          }).catch(error => {error.message}) 
        }
        
      } 
      else {
        const queryAllUsersbyWorkplace = query(collection(roledb, "usersCollection"), where("Workplace", "==", SelectFilterWorkplace))

        getDocs(queryAllUsersbyWorkplace)
        .then((WorkplaceSnapshot) => {
          setAllUsers(WorkplaceSnapshot.docs.map(a => a.data()))
  
          console.log(WorkplaceSnapshot.docs.map(a => a.data()))
        }).catch(error => {error.message}) 
  
      }

      
    }
  }, [isFocused, SelectFilterWorkplace])



  //Admin navigate to "Create New User" Screen.
  const navigateCreateUser = () => {
    navigation.navigate("CreateNewUser");
  }


  return (
    
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Töötajad</Text>
        {CurrentUserRole === 'admin' ?
        <TouchableOpacity style={styles.addUserIcon} onPress={navigateCreateUser}>
          <Icon name="plus" size={30} color="#FEF5EF"/>
        </TouchableOpacity> 
        : null
      }
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter:</Text>
        <Picker
            selectedValue={SelectFilterWorkplace}
            style={styles.pickerStyle}
            onValueChange={(WorkplaceValue) => setSelectFilterWorkplace(WorkplaceValue)}
          >
            <Picker.Item label='All' value='all'></Picker.Item>
            {filterWorkplaces.map(workplace => <Picker.Item style={styles.pickerText} label={workplace} key={workplace} value={workplace}></Picker.Item>)}
        </Picker>
      </View>
      <View style={styles.usersContainer}>

        <ScrollView style={styles.scrollStyle}>
          {Object.keys(AllUsers)?.map((key) => 
            <View key={key} style={styles.userInfoContainer}>
              
              <Text style={styles.userTextName}>{AllUsers[key].DisplayName}</Text>
              <Text style={styles.userTextRole}>Role: {AllUsers[key].Role}</Text>
              <Text style={styles.userTextRole}>Email: {AllUsers[key].Email}</Text>
              <Text style={styles.userTextNumber}>Phone Nr: {AllUsers[key].Number}</Text>
              <Text style={styles.userTextWorkplace}>Workplace: {AllUsers[key].Workplace}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}


export default WorkersScreen

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
  addUserIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  filterContainer: {
    width: "100%",
    flex: 0.1,
    borderBottomWidth: 2,
    borderBottomColor: "#984447",
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterText: {
    color: "#FEF5EF",
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  usersContainer: {
    width: "100%",
    height: 710,
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
    
  },
  headerText: {
    color: "#FEF5EF",
    fontSize: 24,
  },
  scrollStyle: {
    width: '100%',
    flex: 1,
  },
  userInfoContainer: {
    width: '95%',
    backgroundColor: '#404040',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 10,
    padding: 15
  },

  userTextName: {
    color: "#FEF5EF",
    marginBottom: 10,
    fontSize: 24,
  },
  userTextRole: {
    color: "#FEF5EF",
    marginBottom: 10,
  },
  userTextNumber: {
    color: "#FEF5EF",
    marginBottom: 10,
  },
  userTextWorkplace: {
    color: "#FEF5EF",
    marginBottom: 10,
  },
  headerText: {
    color: "#FEF5EF",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 24,
  },
  pickerStyle: {
    width: "50%",
    height: 30,
    backgroundColor: "#984447",
    margin: 5,

  },
  pickerText: {
    color: '#FEF5EF'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#9D5C63',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FEF5EF',
    fontWeight: '500',
    fontSize: 16,
  },
})