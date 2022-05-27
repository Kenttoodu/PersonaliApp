import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createUserAuth, roledb } from '../../../fireBase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, Firestore, getDoc, setDoc } from "firebase/firestore"
import { useNavigation, PopToTop } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'

import Icon  from "react-native-vector-icons/FontAwesome5"

const WorkersScreen = ({navigation: { goBack }}) => {

  const [SignupEmail, setSignupEmail] = useState('');
  const [SignupPassword, setSignupPassword] = useState('');
  const [SignupDisplayName, setSignupDisplayName] = useState('');
  const [SelectSignupRole, setSelectSignupRole] = useState('');
  const [SignupNumber, setSignupNumber] = useState('');
  const [SelectSignupWorkplace, setSelectSignupWorkplace] = useState('');

  const [SignupError, setSignupError] = useState(' ');

  const [SignupRoles, setSignupRoles] = useState([]);
  const [SignupWorkplaces, setSignupWorkplaces] = useState([]);

  useEffect(() =>{
    //Get all roles for dropdown menu
    const rolesLists = async() => {

      const myRoleDB = doc(roledb, "UserRoles", "roles");


      getDoc(myRoleDB).then((snapshot) => {
        if(snapshot.exists) {
          const rolesListData = snapshot.data();
          const rolesList = rolesListData.role;
          
          setSignupRoles(rolesList);
          return snapshot.data();
        }
        else {
          console.log("No Roles Found.")
        }
      }).catch((error) => {
        console.log(error.message)
      })
    

    }

    //Get all Workplaces for dropdown menu
    const workplaceLists = async() => {

      const myWorkplaceDB = doc(roledb, "Workplaces", "workplace");


      getDoc(myWorkplaceDB).then((snapshot) => {
        if(snapshot.exists) {
          const workplaceListData = snapshot.data();
          const workplaceList = workplaceListData.workplace;
          
          setSignupWorkplaces(workplaceList);

          console.log(SignupWorkplaces[1])
          return snapshot.data();
        }
        else {
          console.log("Rolle ei leitud.")
        }
      }).catch((error) => {
        console.log(error.message)
      })
    

    }

    rolesLists();
    workplaceLists();
  }, [])

  //Make new user in Database
  const createNewUser = () => {

    if(SelectSignupWorkplace === "" && SelectSignupRole === "") {
      setSignupError("Palun vali töökoht ja roll")
    } else {
      createUserWithEmailAndPassword(createUserAuth, SignupEmail, SignupPassword)
      .then(registeredUser => {
        setDoc(doc(roledb, "usersCollection", registeredUser.user.uid), {
          uid: registeredUser.user.uid,
          DisplayName: SignupDisplayName,
          Role: SelectSignupRole,
          Number: SignupNumber,
          Workplace: SelectSignupWorkplace,
          Email: SignupEmail,
        })
  
        console.log(SignupDisplayName, SelectSignupRole, SignupNumber, SelectSignupWorkplace, SignupEmail)
        setSignupError("Kasutaja tekitatud!")
        setSignupEmail("")
        setSignupPassword("")
        setSignupDisplayName("")
        setSignupNumber("")
        setSelectSignupWorkplace("")
  
        goBack();
  
      }).catch((error)=>{
        setSignupError(error.message)
      })
    }
    
    
  }

  return (
    
    <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        >

      <View style={styles.topBar}>
        <Text style={styles.headerText}>Lisa uus kasutaja</Text>
        <TouchableOpacity style={styles.addUserIcon} onPress={() => goBack()}>
          <Icon name="angle-left" size={30} color="#FEF5EF"/>
        </TouchableOpacity>
      </View>
        <View style={styles.signupContainer}>
          <Text style= {styles.errorText}>{SignupError}</Text>
            <TextInput  
                placeholder="Email"
                value={SignupEmail}
                onChangeText={text => setSignupEmail(text)}
                style={styles.input} 
            />
            <TextInput  
                placeholder="Password"
                value={SignupPassword}
                onChangeText={text => setSignupPassword(text)}
                style={styles.input} 
                secureTextEntry
            />
            <TextInput  
                placeholder="DisplayName"
                value={SignupDisplayName}
                onChangeText={text => setSignupDisplayName(text)}
                style={styles.input} 
            />
            <TextInput  
                placeholder="Number"
                value={SignupNumber}
                onChangeText={text => setSignupNumber(text)}
                style={styles.input} 
            />

            <Picker
              selectedValue={SelectSignupWorkplace}
              style={styles.pickerStyle}
              onValueChange={(WorkplaceValue) => setSelectSignupWorkplace(WorkplaceValue)}
            >
              <Picker.Item label="Vali Üksus" value=""></Picker.Item>
              {SignupWorkplaces.map(workplace => <Picker.Item label={workplace} key={workplace} value={workplace}></Picker.Item>)}
            </Picker>

            <Picker
              selectedValue={SelectSignupRole}
              style={styles.pickerStyle}
              onValueChange={(itemValue) => setSelectSignupRole(itemValue)}
            >
              <Picker.Item label="Vali Roll" value=""></Picker.Item>
              {SignupRoles.map(r => <Picker.Item label={r} key={r} value={r}></Picker.Item>)}
            </Picker>
          
            
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={createNewUser}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Valmista uus kasutaja</Text>
            </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
  )
}


export default WorkersScreen

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    flexDirection: "column",
    justifyContent: 'flex-start',
  },
  topBar: {
    width: "100%",
    height: 65,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#9D5C63",
    padding: 10,
  },
  addUserIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  headerText: {
    color: "#FEF5EF",
    textAlign: "center",
    marginBottom: 80,
    fontSize: 24,
  },
  signupContainer: {
    width: '80%',
    justifyContent: 'center',
    paddingTop: 150,
    alignItems: 'center',
  },
  input: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FEF5EF',
    borderRadius: 2,
    width: '80%'
  },

  pickerStyle: {
    width: "50%",
    height: 30,
    backgroundColor: "#FEF5EF",
    margin: 10,

  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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