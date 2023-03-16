import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/loginScreens/loginScreen";
import MapViewScreen from "../screens/TrackMap";
import HomeScreen from "../screens/HomeScreen/homeScreen";

const Stack = createNativeStackNavigator();


const AppNavigator = (props) => {
    const { isLoggedIn } = props;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'LoginScreen'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MapViewScreen" component={MapViewScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
} 



export default AppNavigator;