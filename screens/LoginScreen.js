import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import firebase from '../firebase.config'
import * as Google from 'expo-google-app-auth';

export default function App() {

    const { navigate } = useNavigation()

    const isUserEqual = (googleUser, firebaseUser) => {

        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    const onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                console.log(googleUser)
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(() => {
                    navigate('Home')
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
                navigate('Home')
            }
        });
    }

    const handleButtonPress = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                androidClientId: '1012193096980-8o95ci2mm32m03vbgjmm9gb1a05k46s2.apps.googleusercontent.com',
                iosClientId: '1012193096980-b5iopqc5si507rammjo424ke1iamhd00.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.accessToken)
                onSignIn(result)
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.container}></View>
            <Image source={require('../assets/logo.png')} />
            <View style={styles.container}></View>
            {false && <Button
                onPress={handleButtonPress}
                style={styles.loginButton}
                color='whitesmoke'
                title='login'
                font
            />}
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Image style={{ height: 40 }} source={require("../assets/google-sign-in.png")} />
            </TouchableOpacity>
            <View style={styles.container}></View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169e1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        paddingBottom: 10
    },
    button: {
        minHeight: 20,
    },
    loginButton: {
    }
});