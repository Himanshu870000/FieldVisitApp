import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Linking, Platform, TouchableOpacity,ActivityIndicator, Image, ToastAndroid, ScrollView, Alert } from "react-native";
import { Calendar } from 'react-native-calendars';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Icon } from 'react-native-elements';


const RescheduleScreen = (props) => {
    const {navigation} = props;
    const [selectedDate, setSelectedDate] = useState(null);


    const[showAlert,setShowAlert] = useState()
    
    const showAlert1 = () => {
        setShowAlert(true);
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        // Call your event function here with the selected date
    };

    const markedDates = {
        [selectedDate]: { selected: true },
    };

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    const disabledDates = {};
    for (let i = 0; i < today.getDay(); i++) {
        const d = new Date();
        d.setDate(today.getDate() - i - 1);
        disabledDates[d.toISOString().split('T')[0]] = { disabled: true };
    }

    return (
        <View>
            <View style={styles.TopBar}>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 15 }}>Dashboard</Text>
            </View>


            <View style={{justifyContent:'center', padding:20,marginTop:30}}>
                <Text style={{fontWeight:700,color:'blue',fontSize:18}}>Please Select An Date</Text>
            </View>

            <Text style={{fontWeight:700,color:'black',padding:18}}>Current Date: {dateString}</Text>

            <Text style={{fontWeight:700,color:'black', padding:18}}>New Date :-</Text>

            
            <Calendar
                onDayPress={onDayPress}
                markedDates={markedDates}
                disableAllTouchEventsForDisabledDays={true}
                hideExtraDays={true}
                minDate={dateString}
                markingType="simple"
                markedDates={{
                    markedDates,
                    disabledDates,
                }}
                theme={{
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontSize: 16,
                    height:200,
                    width:300,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    'stylesheet.calendar.header': {
                        week: {
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        },
                    },
                }}
            />
            {selectedDate && (
                <Text style={{ textAlign: 'center', marginTop: 10, color:'#000000', padding:22 }}>
                    Selected date: {selectedDate}
                </Text>

                
            )}
                <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.activeButton} onPress={() => {
                        showAlert1();
                    }}>
                        <Text style={styles.StartButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Reschedule Task"
                        message="Are You sure you want to reschedule your task for date "
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No"
                        confirmText="Yes"
                        confirmButtonColor="blue"
                        onCancelPressed={() => {
                            hideAlert();
                        }}
                        onConfirmPressed={() => {
                            navigation.replace('HomeScreen')
                        }}
                    />
                    </View>
        </View>
    );
};

export default RescheduleScreen;

const styles = StyleSheet.create({
    TopBar: {
        height: 60,
        width: 400,
        backgroundColor: '#073E5F',
        flexDirection: 'row',
    },
    dateContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    selectedDate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    activeButton: {
        width: 240,
        height: 40,
        padding: 6,
        borderRadius: 7,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        marginTop: 10,
    },
    StartButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 700,
    },
})