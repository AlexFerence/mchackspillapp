import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function App() {

    const { navigate } = useNavigation()

    const handleButtonPress = () => {
        navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Login Screen</Text>
            <Button
                onPress={handleButtonPress}
                style={styles.loginButton}
                color='green'
                title='login'
            />
        </View>
    )
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
    loginButton: {
    }
});