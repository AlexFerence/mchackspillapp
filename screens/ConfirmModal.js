import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import moment from 'moment'

const ConfirmModal = ({ handleCloseModal, modalVisible, DD = 0, REF = false }) => {

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
        var dateMs = moment()
        var startDate = moment().add(1, 'd').toDate()
        var endDate = moment().add(1, 'd').toDate()
        console.log('ADDING TO CALENDAR')
        getDefaultCalendarSource()
        const newCalendar = await Calendar.createCalendarAsync({
            title: 'Take pills',
            color: '#512DA8',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: getDefaultCalendarSource.id,
            source: getDefaultCalendarSource,
            name: 'Perscription Reminder',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,

        })
            .then((id) => {
                Calendar.createEventAsync(id, {
                    title: 'Pill Reminder, take ' + DD + ' doses',
                    startDate: startDate,
                    endDate: endDate,
                    timeZone: 'America/Halifax',
                    location: '845 Sherbrooke St W, Montreal, Quebec',
                }).catch((err) => console.log(err))
                // console.log(`calendar ID is: ${id}`)
            })
            .catch((err) => console.log(err))
    }

    const handleButtonPress = () => {
        // logic

        addReservationToCalendar()

        handleCloseModal()
    }

    return (
        <Modal
            animationIn='slideInUp'
            animationInTiming={200}
            isVisible={modalVisible}
            onBackButtonPress={handleCloseModal}
            backdropColor='black'
            onBackdropPress={handleCloseModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add to Calendar?</Text>
                    <View style={{ height: 5 }} />
                    <Text>{'Daily Dosage: ' + DD}</Text>
                    <View style={{ height: 5 }} />
                    <Text>{'Refils: ' + REF}</Text>
                    <View style={{ height: 5 }} />
                    <Text>{'Use Before: ' + '02/05/2021'}</Text>
                    <View style={{ height: 10 }} />
                    <Button title='Confirm' onPress={handleButtonPress} />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'transparent'
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        zIndex: 20
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 20
    }
});

export default ConfirmModal