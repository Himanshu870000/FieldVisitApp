import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from "react-native";



const HomeScreen = (props) => {
    const { navigation } = props;

    const handleStartVisit = async () => {
        navigation.navigate('MapViewScreen')
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: 'black' }}>Home View</Text>

            <TouchableOpacity

                style={{ height: 40, width: 100, backgroundColor: '#084970', marginTop: 40 }}

                onPress={() => {
                    handleStartVisit();
                }}
            ><Text style={{ color: "#FFFFFF", fontWeight: '500', alignSelf: 'center', marginTop: 5 }}>Start Visit</Text></TouchableOpacity>
        </View>
    );
};





const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,

    },
    StartVisitButton: {
        color: 'blue',
        height: "59",
        width: 100,
        alignContent: 'center',
        borderRadius: 15,
        shadowOpacity: 19,
        elevation: 12,
    },
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default HomeScreen;
