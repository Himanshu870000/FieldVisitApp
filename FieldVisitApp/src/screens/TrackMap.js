import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, ScrollView,alert, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = 'AIzaSyB4SPqkO0ZQbxT-EU4l886H9Y3ipf1NMW0';

const MapViewScreen = (props) => {
    
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
    const { pickupCords, droplocationCords} = state;
    
    return (
        <View style={styles.container}>

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                mapType={'hybrid'}
                style={{height:'90%',width:'100%'}}
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
                    onReady={result=> {
                        mapRef.current.fitToCoordinates(result.coordinates,{
                            edgePadding:{
                                right:30,
                                bottom:300,
                                left:30,
                                top:100,
                            }
                        })
                    }}
                />
             

            </MapView>
            <View style={{flex:1}}>
                    <TouchableOpacity style={{ height:40,width:'100%',backgroundColor:'blue',alignItems:'center'}} title="satellite" onPress={()=> setState({mapType:'satellite'})}><Text>Satellite View</Text></TouchableOpacity>
                    <TouchableOpacity style={{ height:40,width:'100%',backgroundColor:'orange',alignItems:'center'}} title="hybrid" onPress={()=> setState({mapType:'hybrid'})}><Text>Hybrid View</Text></TouchableOpacity>
                    <TouchableOpacity style={{ height:40,width:'100%',backgroundColor:'green',alignItems:'center'}} title="standard" onPress={()=> setState({mapType:'standard'})}><Text>Standard View</Text></TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
         flex:1,
    },
});

export default MapViewScreen;
