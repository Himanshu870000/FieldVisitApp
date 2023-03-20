import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View,Linking,Platform, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CountryPicker } from "react-native-country-codes-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginApi } from "../../API/AuthApi";

const OtpVerification = (props) => {
    const { navigation } = props;

    const [otp, setOtp] = useState('')


    const handlePhoneLogin = () => {
        setLoginWithEmail(false);
    }



    const handlePhoneSubmit = () => {
        // handle phone login
    }

    return (

        <ScrollView>
            <LinearGradient
                colors={['#FFA94254', '#FFA94200']}
                start={{
                    x: 1,
                    y: 1
                }}
                end={{
                    x: 1,
                    y: 0
                }}
                style={styles.box}>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image
                        style={{ height: 300, width: 226, marginTop: 110 }}
                        source={require('../../assets/images/VerificationImage.png')}
                    />
                </View>

                        <View style={styles.formContainer}>
                            <View style={styles.InputPassRow}>

                                <TextInput
                                    value={otp}
                                    style={styles.otp}
                                    placeholder="Enter verification code"
                                    placeholderTextColor="#4F555A"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    onChangeText={(text) => setOtp(text)}
                                />

                            </View>
                            <TouchableOpacity
                                style={styles.ReqstOtpButton}
                                onPress={() => {
                                    handleLogin();
                                }}>
                                <Text style={{ color: "#FFFFFF", fontWeight: '500' }}>Request OTP</Text>
                            </TouchableOpacity>
                            <View style={{ height: 160 }}></View>

                        </View>
        
                    <View style={{ height: 160 }}></View>
                


            </LinearGradient>
        </ScrollView>
    )
}





const styles = StyleSheet.create({


    loginText: {
        fontSize: 32,
        fontWeight: '400',
        marginLeft: 35,
        marginTop: 20,
        color: "#000000",
    },

    InputEmailRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
    },
    InputPassRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
    },

    inputEmail: {
        marginHorizontal: 12,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderStartWidth: 2,
        borderEndWidth: 200,
        fontSize: 14,
        fontWeight: '400',
    },

    inputPhone: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        marginLeft: 90,
        borderStartWidth: 2,
        borderEndWidth: 200,
        fontSize: 14,
        fontWeight: '400',
    },
    box: {
        width: '100%',
        height: '100%',
    },
    loginButton: {
        backgroundColor: "#F2890A",
        marginHorizontal: 32,
        marginTop: 34,
        height: 40,
        width: 330,
        marginTop: 15,
        marginLeft: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 2,
        borderRadius: 40,
        alignItems: 'center'
    },
    ReqstOtpButton: {
        backgroundColor: "#F2890A",
        marginHorizontal: 32,
        marginTop: 54,
        height: 40,
        width: 330,
        marginTop: 15,
        marginLeft: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 2,
        borderRadius: 40,
        alignItems: 'center'
    },

    CountryCodecontainer: {
        height: 20,
        width: 80,
        marginRight: 10,
    },


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        backgroundColor: '#EAEAEA',
        height: 32,
        width: 330,
        marginTop: 15,
        marginLeft: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    button: {
        backgroundColor: "#EAEAEA",
        padding: 2,
        borderRadius: 12,
        width: 160,
        alignItems: 'center'
    },
    activeButton: {
        backgroundColor: "#F2890A",
        padding: 2,
        borderRadius: 12,
        width: 160,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
    activeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    }
});

export default OtpVerification;