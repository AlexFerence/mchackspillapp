import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, Platform, Image } from 'react-native'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { gcpKey } from '../fbconfig';
import axios from 'axios'
import firebase from '../firebase.config'

function HomeScreen() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [image, setImage] = useState(null);

    const navigation = useNavigation()

    const [status, setStatus] = React.useState(null);

    const takePictureAsync = async () => {
        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
            base64: true,
        });

        if (!cancelled) {
            setImage(uri);
            setStatus('Loading...');
            try {
                const result = await callGoogleVisionAsync(base64);
                console.log
                setStatus(result);
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
        }
    };

    async function callGoogleVisionAsync(image) {
        const body = {
            requests: [
                {
                    image: {
                        content: image,
                    },
                    features: [
                        //{ type: 'LABEL_DETECTION', maxResults: 1 },
                        { type: "TEXT_DETECTION", maxResults: 1 },
                        //{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 1 }
                    ],
                },
            ],
        };

        const response = await fetch("https://vision.googleapis.com/v1/images:annotate?key=" + gcpKey, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        //console.log('callGoogleVisionAsync -> result', result);
        console.log('RESULT')
        console.log(result.responses[0].fullTextAnnotation.pages[0].blocks[0])
        // result.responses[0].fullTextAnnotation.pages.forEach((page) => {
        //     page.blocks.forEach((block) => {
        //         console.log(block)
        //     })
        // })

        return result.responses[0].labelAnnotations[0].description;
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    return (
        <View style={styles.container}>
            { image && <Image source={{ uri: image }} resizeMode='contain' style={styles.imagePreview} />}
            <Button title='Take Photo' onPress={takePictureAsync} />
            <Button title='Upload Image' />
            { image && <Button title='Submit' color='blue' />}
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
    imagePreview: {
        width: '100%',
        height: '40%',
    }
});

export default HomeScreen