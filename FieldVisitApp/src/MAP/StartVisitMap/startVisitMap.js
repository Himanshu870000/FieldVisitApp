import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,PermissionsAndroid, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation(position.coords);
      },
      error => {
        console.log(error);
      }
    );
  }, []);

    // navigate user by thier inbuilt g_Map app
    const handleGetDirections = () => {
      // Check if we have permission to access the user's location
      let hasLocationPermission = false;
      if (Platform.OS === 'android') {
        hasLocationPermission =  PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (!hasLocationPermission) {
          try {
            const granted = PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            hasLocationPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return;
          }
        }
      } else {
        hasLocationPermission = true; 
      }
    
      if (hasLocationPermission) {
        // Get the user's current location
        try {
          Geolocation.getCurrentPosition(
            position => {
              if (position && position.coords) {
                const origin = `${position.coords.latitude},${position.coords.longitude}`;
                const destination = "bengaluru, india";
                const path = `${origin}|12.9083,77.6051`; // Add the user's location to the path
                const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&waypoints=${path}`;
                Linking.openURL(url);
              }
            },
            error => {
              console.warn(error);
              switch (error.code) {
                case 1:
                  console.log('Permission Denied');
                  break;
                case 2:
                  console.log('Position Unavailable');
                  break;
                case 3:
                  console.log('Timeout');
                  break;
                default:
                  console.log('Activity Null');
                  break;
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 30000,
              maximumAge: 1000,
            }
          );
        } catch (error) {
          console.warn(error);
        }
      } else {
        console.log('Location permission denied');
      }
    };
    
    
    useEffect(()=>{
      handleGetDirections();
    })

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} />
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;