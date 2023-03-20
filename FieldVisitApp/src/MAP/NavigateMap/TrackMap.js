import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, ScrollView, PermissionsAndroid, Linking, alert, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = ' AIzaSyB4SPqkO0ZQbxT-EU4l886H9Y3ipf1NMW0';
import Geolocation from "@react-native-community/geolocation";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const MapViewScreen = (props) => {

    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (!response.didCancel && !response.error) {
                    setSelectedImage(response.uri);
                }
            }
        );
    };

    const takePicture = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (!response.didCancel && !response.error) {
                    setSelectedImage(response.uri);
                }
            }
        );
    };

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
    const startVisitHandle = () => {
        // Check if we have permission to access the user's location
        let hasLocationPermission = false;
        if (Platform.OS === 'android') {
            hasLocationPermission = PermissionsAndroid.check(
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


    const [state, setState] = useState({
        pickupCords: {
            latitude: 12.8986,
            longitude: 77.5709,
            latitudeDelta: 12.9431,
            longitudeDelta: 77.6179,
        },
        droplocationCords: {
            latitude: 12.972996,
            longitude: 77.616706,
            latitudeDelta: 12.9755,
            longitudeDelta: 77.6052,
        },
        mapType: 'standard',
    })
    const mapRef = useRef();
    const { pickupCords, droplocationCords } = state;

    return (

        <View style={styles.container}>
            <View style={styles.TopBar}>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 15 }}>Tracking Analyst</Text>
            </View>
            <ScrollView style={{ flexGrow: 1 }}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    mapType={'standard'}
                    style={{ height: 460, width: '100%', marginTop: 20 }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    initialRegion={pickupCords}>

                    <Marker
                        coordinate={pickupCords}
                    //image={images.isCurLoc}
                    />
                    <Marker
                        coordinate={droplocationCords}
                    //image={images.isDestLoc}
                    />

                    <MapViewDirections
                        origin={pickupCords}
                        destination={droplocationCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onReady={result => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 150,
                                    left: 30,
                                    top: 60,
                                }
                            })
                        }}
                    />


                </MapView>
                <View style={{ alignContent: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 30, marginBottom: 20, }}>
                    <TouchableOpacity style={styles.activeButton} onPress={() => {
                        startVisitHandle();
                    }}>
                        <Text style={styles.StartButtonText}>Start Visit</Text>
                    </TouchableOpacity>

                    <Text style={{ color: '#073E5F', fontWeight: '700', marginTop: 20, fontSize: 20 }}>Amar Singh</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Address : JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Phone Number</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Status : Pending</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Industry:-</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Website:-</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Distance : 10 km away</Text>
                    <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>Visit number : VISIT-0062</Text>

                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.bottomButton}>
                        <TouchableOpacity>
                            {/* {selectedImage && ( */}
                                <Image
                                    source={require('../../assets/images/uploadImageIcon.png')}
                                />

                            {/* )} */}
                            {/* <View style={{flexDirection:"row"}}>
                            <Button title="P" onPress={pickImage} />
                            <Button title="T" onPress={takePicture} />
                            </View> */}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButton}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/images/convert.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButton}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/images/uploadImageIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButton}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/images/uploadImageIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomButton}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/images/uploadImageIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <Text style={{ color: '#073E5F', fontWeight: '700', marginTop: 20, marginLeft:30,fontSize: 16}}>Uploads</Text>

                            <View style={{height:240,width:'80%',backgroundColor:'#fff',borderWidth:1,borderColor:'grey',justifyContent:'center',alignItems:'center',marginHorizontal:40,marginVertical:30}}>
                            <Image
                                source={require('../../assets/images/workNotDoneYet.png')}
                            />
                                                <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>No Uploads yet.</Text>

                            </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    activeButton: {
        width: 240,
        height: 40,
        padding: 6,
        borderRadius: 7,
        marginLeft: 45,
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
    TopBar: {
        height: 60,
        width: '100%',
        backgroundColor: '#073E5F',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bottomButton: {
        width: 40,
        height: 40,
        padding: 6,
        borderRadius: 7,
        marginLeft: 25,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        backgroundColor: 'orange',
        marginTop: 10,
    }

});

export default MapViewScreen;