import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

function HomeScreen() {

    const handleOpenCamera = () => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Hi Charlotte :)</Text>
            <Button title='Open Camera' onPress={handleOpenCamera} />
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