import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleTakePhoto = async () => {
        console.log('taking photo')
        let photo = await Camera.takePictureAsync();
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Ionicons name="camera-reverse-sharp" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleTakePhoto}
                    >
                        <View style={styles.outerCircle}>
                            <View style={styles.innerCircle}>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Ionicons name="camera-reverse-sharp" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 30,
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    innerCircle: {
        backgroundColor: 'white',
        height: 65,
        width: 65,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'grey'
    }
});

