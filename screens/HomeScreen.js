import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

function HomeScreen() {

    const { navigate } = useNavigation()

    const handleButtonPress = () => {
        navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Home Screen :)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        paddingBottom: 10
    },
    backButton: {

    }
});

export default HomeScreen