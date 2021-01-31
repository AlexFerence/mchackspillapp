import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, Platform, Image, Text } from 'react-native'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { gcpKey } from '../fbconfig';
import * as Calendar from 'expo-calendar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { extractInfo } from '../extractInfo'
import { Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import moment from 'moment'
import ConfirmModal from './ConfirmModal';

function HomeScreen() {

    const [DD, setDD] = useState(0)
    const [REF, setREF] = useState(false)

    const getDefaultCalendarSource = async () => {
        await Calendar.getCalendarsAsync().then((id) => console.log(id))
    }

    const obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            return
        }
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.REMINDERS)
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to calendar')
            }
            return
        }
        return permission
    }

    const addReservationToCalendar = async () => {
        await obtainCalendarPermission()
        var startDate = Date.now()
        var endDate = Date.now()
        console.log('ADDING TO CALENDAR')
        getDefaultCalendarSource()
        const newCalendar = await Calendar.createCalendarAsync({
            title: 'Take pills',
            color: '#512DA8',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: getDefaultCalendarSource.id,
            source: getDefaultCalendarSource,
            name: 'Restauran Reservation',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })
            .then((id) => {
                Calendar.createEventAsync(id, {
                    title: 'Perscription Reminder',
                    startDate: moment().add(20, 'h').toDate(),
                    endDate: moment().add(21, 'h').toDate(),
                    location: '',
                }).catch((err) => console.log(err))
                // console.log(`calendar ID is: ${id}`)
            })
            .catch((err) => console.log(err))
    }


    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                console.log('Here are all your calendars:');
                console.log({ calendars });
            }
        })();
    }, []);


    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [image, setImage] = useState(null);

    const navigation = useNavigation()

    const [status, setStatus] = React.useState(null);


    const [data, setData] = useState(undefined)
    const [modalVisible, setModalVisible] = useState(false)
    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const takePictureAsync = async () => {
        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
            base64: true,
        });
        setModalVisible(true)
        if (!cancelled) {
            setImage(uri);
            setStatus('Loading...');
            try {
                const result = await callGoogleVisionAsync(base64);
                if (result) {

                    setModalVisible(true)

                }
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
        }
    };

    const openLibraryAsync = async () => {
        const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
            base64: true,
        });

        if (!cancelled) {
            setImage(uri);
            setStatus('Loading...');
            try {
                const result = await callGoogleVisionAsync(base64);
                if (result) {


                }
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
        }
    };

    async function callGoogleVisionAsync(image) {
        try {
            setModalVisible(true)
            const body = {
                requests: [
                    {
                        image: {
                            content: image,
                        },
                        features: [
                            //{ type: 'LABEL_DETECTION', maxResults: 1 },
                            { type: "TEXT_DETECTION", maxResults: 10 },
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
            setModalVisible(true)
            const result = await response.json();
            //console.log('callGoogleVisionAsync -> result', result);
            console.log('words')
            if (result && result.responses[0] && result.responses[0].textAnnotations) {
                let words = []
                result.responses[0].textAnnotations.forEach((wordObj) => {
                    words.push(wordObj.description.toLowerCase())
                })
                console.log(words)

                const data = extractInfo(words)
                setData(data)

                setModalVisible(true)
                console.log('data')
                console.log(data)

                if (data && data.dailyDosage) {
                    setDD(data.dailyDosage)

                }

                if (data.refills) {
                    setREF(data.refills)
                }

                addReservationToCalendar()
                return words
            }
            else {
                console.error('error in result')
            }

            return false;
        } catch (e) {
            console.log(e)
        }
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
            <ConfirmModal REF={REF} modalVisible={modalVisible} DD={DD} handleCloseModal={handleCloseModal} />
            <Entypo name="camera" size={50} color="white" />
            <View style={{ height: 10 }} />
            <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 24, textAlign: 'center' }}>
                Upload a photo of your perscription, our software will add reminders to your calendar automatically
            </Text>

            <View style={{ height: 20 }} />
            <TouchableOpacity onPress={takePictureAsync} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Camera</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <View style={styles.seperator} />
            <TouchableOpacity onPress={openLibraryAsync} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Library</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169e1',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "whitesmoke",
        // borderWidth: 10,
        // borderRadius: 10
    },
    loginText: {
        fontSize: 40,
        paddingBottom: 10,
        color: "whitesmoke"

    },

    separator: {
        marginVertical: 8,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    backButton: {

    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#32c2e3',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 100
    },

    appButtonText: {
        fontSize: 20,
        color: 'whitesmoke',
        alignSelf: "center"
    },
    space: {
        width: 20,
        height: 20
    }
});

export default HomeScreen