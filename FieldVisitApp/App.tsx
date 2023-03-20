import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/appNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem('token');
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
      getToken().then(token => {
          if(token){
              setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
      });
  });
  return(
    <>
    {isLoggedIn != null ?
      <AppNavigator isLoggedIn={isLoggedIn} /> 
    : 
    <></>
    }
  </>
  );
};


export default App;