import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Platform, Image } from 'react-native'
import { Camera } from 'expo-camera';

import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ImageType } from 'expo-camera/build/Camera.types';

function HomeScreen() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [image, setImage] = useState(null);

    const navigation = useNavigation()

    const handleOpenCamera = async () => {
        console.log('opening camera')
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        //console.log(result)
        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
        }
    }

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });

        //console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);

        }
    };

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
            <Button title='Take Photo' onPress={handleOpenCamera} />
            <Button title='Upload Image' onPress={handlePickImage} />
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