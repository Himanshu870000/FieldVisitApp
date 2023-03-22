import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, Linking, Platform, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CountryPicker } from "react-native-country-codes-picker";
import { LoginApi } from "../../API/AuthApi";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVisit } from "../../API/AuthApi/getVisitApi";

const LoginScreen = (props) => {
    const { navigation } = props;
    const [loginWithEmail, setLoginWithEmail] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('')

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [countryFlag, setCountryFlag] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailLogin = () => {
        setLoginWithEmail(true);
    }

    const handlePhoneLogin = () => {
        setLoginWithEmail(false);
    }



    const requestOtp = () => {
        navigation.navigate('OtpVerification')
    }

    const handleLogin = async () => {
            try {

                if (email.length <= 2) {
                    ToastAndroid.showWithGravity(
                        "Please Enter Correct Email",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                } else if (password.length < 6) {
                    ToastAndroid.showWithGravity(
                        "Please Enter Correct Password",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                } else {

                    const payload = {
                        email,
                        password
                    }
                    LoginApi(payload).then(async (response) => {
                        if (response.status > 0 && response.status < 400) {
                            const token = response.data.token;
                            await AsyncStorage.setItem('token', token);
                            ToastAndroid.showWithGravity(
                                "Succesfully Logged in",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                           console.log('token---------->',token)
                            props.navigation.replace('HomeScreen',{token:token},{email:email})

                        } else {
                            console.log(response.status, 'Login Error');
                        }
                    });
                }
            } catch (error) {

                console.error(error);
            }
    };

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
                        style={{ height: 211, width: 286, marginTop: 80 }}
                        source={require('../../assets/images/loginBackground.png')}
                    />
                </View>

                <Text style={styles.loginText}>Login</Text>
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={loginWithEmail ? styles.activeButton : styles.button} onPress={handleEmailLogin}>
                            <Text style={loginWithEmail ? styles.activeButtonText : styles.buttonText}>Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={!loginWithEmail ? styles.activeButton : styles.button} onPress={handlePhoneLogin}>
                            <Text style={!loginWithEmail ? styles.activeButtonText : styles.buttonText}>Phone</Text>
                        </TouchableOpacity>
                    </View>
                    {loginWithEmail ? (
                        <View style={styles.formContainer}>

                            <View style={styles.InputEmailRow}>
                                <Image style={{ marginLeft: 20, marginTop: 6 }} source={require('../../assets/images/EnterEmailIcon.png')}></Image>

                                <TextInput
                                    value={email}
                                    style={styles.inputEmail}
                                    placeholder="Enter Email                                                 "
                                    placeholderTextColor="#4F555A"
                                    keyboardType="email-address"
                                    onChangeText={(text) => setEmail(text)}
                                />
                                {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 260,}}></View> */}


                            </View>
                            <View style={styles.InputPassRow}>
                                <Image style={{ marginLeft: 24, marginTop: 6 }} source={require('../../assets/images/EnterPassIcon.png')}></Image>

                                <TextInput
                                    value={password}
                                    style={styles.inputEmail}
                                    placeholder="Password                      "
                                    placeholderTextColor="#4F555A"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    onChangeText={(text) => setPassword(text)}
                                />

                            </View>
                            <View style={{ marginTop: 18, alignItems: 'flex-end', marginHorizontal: 32 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('ForgotPassword');
                                    }}>
                                    <Text style={{ color: "#084970", fontSize: 14 }}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                    handleLogin();
                                }}>
                                <Text style={{ color: "#FFFFFF", fontWeight: '500' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.formContainer}>
                            <View style={styles.InputPassRow}>

                                <View style={styles.CountryCodecontainer}>
                                    <TouchableOpacity
                                        onPress={() => setShow(true)}
                                        style={{
                                            height: 40,
                                            marginTop: 20,
                                            marginLeft: 10,
                                            backgroundColor: 'white',
                                            padding: 10,
                                            borderRadius: 15,

                                        }}
                                    >
                                        <Text style={{
                                            color: 'black',
                                            fontSize: 14,
                                        }}>
                                            {countryCode}
                                            {countryFlag}
                                        </Text>
                                    </TouchableOpacity>

                                    <CountryPicker
                                        show={show}
                                        // when picker button press you will get the country object with dial code
                                        style={{ width: 150 }}
                                        pickerButtonOnPress={(item) => {
                                            console.log(item);
                                            setCountryCode(item.dial_code);
                                            setCountryFlag(item.flag)
                                            setShow(false);
                                        }}
                                    />
                                </View>

                                <TextInput
                                    value={password}
                                    style={styles.inputPhone}
                                    placeholder="Phone Number"
                                    placeholderTextColor="#4F555A"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    onChangeText={(text) => setPassword(text)}
                                />

                            </View>
                            <TouchableOpacity
                                style={styles.ReqstOtpButton}
                                onPress={() => {
                                    requestOtp();
                                }}>
                                <Text style={{ color: "#FFFFFF", fontWeight: '500' }}>Request OTP</Text>
                            </TouchableOpacity>
                            <View style={{ height: 160 }}></View>

                        </View>
                    )}
                    <View style={{ height: 150 }}></View>

                </View>

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
        borderBottomWidth:1,
        fontSize: 12,
        fontWeight: '400',
        color:'#000000'
    },

    inputPhone: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        marginLeft: 90,
        borderStartWidth: 2,
        borderEndWidth: 200,
        fontSize: 12,
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

export default LoginScreen;