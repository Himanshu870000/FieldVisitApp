import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/loginScreens/loginScreen";


const Stack = createNativeStackNavigator();


const AppNavigator = (props) => {
    const { isLoggedIn } = props;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'DrawerNavigator' : 'LoginScreen'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 



export default AppNavigator;