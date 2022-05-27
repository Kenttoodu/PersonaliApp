import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, roledb } from '../fireBase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { NavigationRouteContext, useNavigation } from '@react-navigation/native'



const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [LoginError, setLoginError] = useState('');
    

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("NavScreen")
          
        }
      })

      return unsubscribe
    }, [])

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, username, password)
      .then((userCredentials)=> {
        const user = userCredentials.user;
        navigation.navigate("NavScreen")
      })
      .catch((error)=>{
        setLoginError(error.message)
      })
    }
    
    


    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        >
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={require('../assets/logo.png')}/>
        </View>
        <View style={styles.loginContainer}>
        <Text style= {styles.errorText}>{LoginError}</Text>
            <TextInput  
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input} 
            />
            <TextInput  
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input} 
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
      },
      loginContainer: {
        width: '80%',
      },
      errorText: {
        color: "red",
        marginBottom: 10,
      },
      input: {
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FEF5EF',
        borderRadius: 2,
      },

      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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

});