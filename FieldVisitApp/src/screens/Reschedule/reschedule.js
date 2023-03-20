import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, Linking, Platform, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CountryPicker } from "react-native-country-codes-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginApi } from "../../API/AuthApi";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const RescheduleScreen = (props) => {
    const { navigation } = props;

    return (

        <View style={styles.container}>
            <View style={styles.TopBar}>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 15 }}>Reschedule</Text>
            </View>
            <ScrollView>
                <View style={{ height: 200, width: 200 }}></View>
                <Calendar
                style={[styles.calendar, { height: 300, marginBottom: 200 }]}
                dayComponent={({ date, state }) => {
                    return (
                        <View>
                            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                        </View>
                    );
                }}
            />

                
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        width: '90%',
        height: '90%',
    },
    TopBar: {
        height: 60,
        width: 400,
        backgroundColor: '#073E5F',
        flexDirection: 'row',
    },
    calendar:{
        marginLeft:30,
    }

});

export default RescheduleScreen;