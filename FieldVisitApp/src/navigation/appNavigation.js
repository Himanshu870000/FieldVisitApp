import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/loginScreens/loginScreen";
import MapViewScreen from "../MAP/NavigateMap/TrackMap";
import HomeScreen from "../screens/HomeScreen/homeScreen";
import MapDirectionsButton from "../MAP/StartVisitMap/startVisitMap";
import MapScreen from "../MAP/StartVisitMap/startVisitMap";
import OtpVerification from "../screens/loginScreens/otpVerification";
import RescheduleScreen from "../screens/Reschedule/reschedule";
import DashboardScreen from "../screens/Dashboard/dashboard";


const Stack = createNativeStackNavigator();

const AppNavigator = (props) => {
    const { isLoggedIn } = props;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'LoginScreen'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="MapDirectionsButton" component={MapDirectionsButton}/>
                <Stack.Screen name="MapScreen" component={MapScreen}/>
                <Stack.Screen name="OtpVerification" component={OtpVerification}/>
                <Stack.Screen name="RescheduleScreen" component={RescheduleScreen}/>
                <Stack.Screen name="DashboardScreen" component={DashboardScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator;