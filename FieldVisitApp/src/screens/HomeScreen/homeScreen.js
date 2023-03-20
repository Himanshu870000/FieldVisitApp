import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity,PermissionsAndroid, FlatList, Image, Linking, ToastAndroid, ScrollView, Alert } from "react-native";
import moment from 'moment';
import { Card } from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
// import AwesomeAlert from "react-native-awesome-alerts";

const VisitList = [
    {
        id: '',
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    },
    {
        id: 5,
    },
    {
        id: 6,
    },
    {
        id: 7,
    },
]


const HomeScreen = (props) => {

    // navigate or replace screen 
    const { navigation } = props;

    const [currentLocation, setCurrentLocation] = useState(null);


    // start and end day state
    const [startDay, setStartDay] = useState(false);
    const [endDay, setEndDay] = useState(false);

    // search query state
    const [searchQuery, setSearchQuery] = useState('');


    // searching user VisitList state and method
    const [filteredItems, setFilteredItems] = useState(VisitList);
    const filterItems = query => {
        const filtered = VisitList.filter(item => {
            const { name, address, status } = getTextValues(item);
            return (
                name.toLowerCase().includes(query.toLowerCase()) ||
                address.toLowerCase().includes(query.toLowerCase()) ||
                status.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredItems(filtered);
    };
    
    const getTextValues = item => {
        const name = 'Amar Singh'; // replace with the actual name value in the item object
        const address = 'JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068'; // replace with the actual address value in the item object
        const status = 'Pending'; // replace with the actual status value in the item object
        return { name, address, status };
    };



    // 2nd Method of searching users visitList --------------->

    // const getTextValues1 = item => {
    //     const name = 'Ajeet Singh'; // replace with the actual name value in the item object
    //     const address = 'JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068'; // replace with the actual address value in the item object
    //     const status = 'Pending'; // replace with the actual status value in the item object
    //     return { name, address, status };
    // };
    
    // const [searchQuery, setSearchQuery] = useState('');
    // const [filteredItems, setFilteredItems] = useState([]);
    // const items = ['apple', 'banana', 'orange', 'grape', 'pineapple', 'mango', 'apple', 'banana', 'pear', 'grape', 'orange', 'pineapple', 'mango', 'watermelon', 'kiwi', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'peach', 'plum', 'cherry', 'lemon', 'lime', 'coconut', 'papaya'];
    // const filterItems = (query) => {
    //     const filtered = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    //     setFilteredItems(filtered);
    // }

    // const [searchQuery1, setSearchQuery1] = useState('');
    // const [filteredItems1, setFilteredItems1] = useState([]);
    // const items1 = ['watermelon', 'kiwi', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'peach', 'plum', 'cherry', 'lemon', 'lime', 'coconut', 'papaya'];
    // const filterItems1 = (query1) => {
    //     const filtered1 = items1.filter(item1 => item1.toLowerCase().includes(query1.toLowerCase()));
    //     setFilteredItems1(filtered1);
    // }



    // const renderRowItem = ({ item }) => {
    //     return (
    //         <View style={styles.cardContainer}>

    //             <Text style={{ color: '#ffffff', fontWeight: '500', marginLeft: 30, marginTop: 20 }}>Amar Singh</Text>
    //             <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Address : JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068</Text>
    //             <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Phone Number</Text>
    //             <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Status : Pending</Text>
    //             <View style={{ flexDirection: 'row', marginTop: 20 }}>
    //                 <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={startVisitHandle}>
    //                     <Text style={styles.StartButtonText}>Start Visit</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={handleNavigate}>
    //                     <Text style={styles.StartButtonText}>Navigate</Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <TouchableOpacity style={styles.rescheduleButton}>
    //                 <Text style={styles.rescheduleText}>Reschedule</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }



    // Toggle button state
    const [customerToVisit, setCustomerToVisit] = useState(true);


    const handlecustomerToVisit = () => {
        setCustomerToVisit(true);
    }

    const handleVisitedCustomers = () => {
        setCustomerToVisit(false);
    }

    const [phoneNumber, setPhoneNumber] = useState('')

    const handleStartDayPress = () => {
        setStartDay(true);
    }

    const handleEndDayPress = () => {
        setStartDay(false);
    }

    const startVisitHandle = () => {
        if (!startDay) {
            Alert.alert('Please start your day first');
            return;
        }
        handleGetDirections();
    }


    // to display Current Day month and year
    const today = moment().format('Do');
    const today1 = moment().format('MMMM  YYYY');




    // Navigate g-MAp by google Api key
    const handleNavigate = async () => {
        if (!startDay) {
          Alert.alert('Please start your day first');
          return;
        }
       navigation.navigate('MapViewScreen')
      };



    // navigate user by thier inbuilt g_Map app
    
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
                  timeout: 20000,
                }
              );
            } catch (error) {
              console.warn(error);
            }
          } else {
            console.log('Location permission denied');
          }
        };
        

    // Here our Screen Content Starts--------------------->

    return (
        <View style={styles.container}>

            <View style={styles.TopBar}>
                <TouchableOpacity style={{ color: '#ffffff', justifyContent: 'center', marginLeft: 20,marginTop:8 }}><Text>User</Text></TouchableOpacity>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 15 }}>Ajeet Kumar</Text>
                <Text style={{ color: 'orange', marginLeft: 150, marginTop:15 }}>Logout</Text>
            </View>


            <View style={styles.dashboardCont}>
                <TouchableOpacity><Text style={{ color: '#000000', fontSize: 35 }}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.dateText}>{today}</Text>
                <TouchableOpacity><Text style={{ color: '#000000', fontSize: 35 }}>{'>'}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('DashboardScreen')
            }}>
                <Text style={{ color: '#084970', fontWeight: 700, marginLeft: 160, marginTop: 30, fontSize: 16, textDecorationLine: 'underline' }}>Dashboard</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, marginRight: 250, color: '#000000' }}>{today1}</Text>


            <View style={styles.UpperButtonRow}>
                <TouchableOpacity style={styles.startDayButton} onPress={handleStartDayPress}>
                    <Text style={styles.startDayButtonText}>Start Day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startDayButton} onPress={handleEndDayPress}>
                    <Text style={styles.startDayButtonText}>End Day</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handlecustomerToVisit}>
                    <Text style={customerToVisit ? styles.activeButtonText : styles.buttonText}>Customer to Visit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleVisitedCustomers}>
                    <Text style={!customerToVisit ? styles.activeButtonText : styles.buttonText}>Visited Customer</Text>
                </TouchableOpacity>
            </View>


            {customerToVisit ? (
                <View>


                    <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: '#DEDEDE', width: 300, height: 40,marginTop:20, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
                        onChangeText={query => {
                            setSearchQuery(query);
                            filterItems(query);
                        }}
                        value={searchQuery}
                    />


                    {/* <View style={styles.row}>
                        <FlatList
                            data={VisitList}
                            renderItem={renderRowItem}
                            keyExtractor={(item) => item.id}
                            horizontal={false}
                        />
                    </View> */}


                    <ScrollView>
                    {filteredItems.map(item => (
                        <View style={styles.cardContainer} key={item.id}>
                            <Text style={{ color: '#ffffff', fontWeight: '500', marginLeft: 30, marginTop: 20 }}>Amar Singh</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Address : JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Phone Number</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Status : Pending</Text>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={startVisitHandle}>
                                    <Text style={styles.StartButtonText}>Start Visit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={handleNavigate}>
                                    <Text style={styles.StartButtonText}>Navigate</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.rescheduleButton}  onPress={() => {
                                    navigation.navigate('RescheduleScreen')
                                }}>
                                <Text style={styles.rescheduleText}>Reschedule</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    </ScrollView>


                </View>
            ) : (


                <View>


                <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: '#DEDEDE', width: 300, height: 40,marginTop:20, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
                        onChangeText={query => {
                            setSearchQuery(query);
                            filterItems(query);
                        }}
                        value={searchQuery}
                    />


                    {/* <View style={styles.row}>
                        <FlatList
                            data={VisitList}
                            renderItem={renderRowItem}
                            keyExtractor={(item) => item.id}
                            horizontal={false}
                        />
                    </View> */}


                    <ScrollView>
                    {/* {filteredItems.map(item => (
                        <View style={styles.secondcardContainer} key={item.id}>
                            <Text style={{ color: '#ffffff', fontWeight: '500', marginLeft: 30, marginTop: 20 }}>Ajeet Singh</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Address : JP Nagar 7th Phase, Bangalore, Karnataka, India, 560068</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Phone Number</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '300', marginLeft: 30, marginTop: 10, fontSize: 10 }}>Status : Pending</Text>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={startVisitHandle}>
                                    <Text style={styles.StartButtonText}>Start Visit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={startDay ? styles.activeButton : styles.inactiveButton} onPress={handleNavigate}>
                                    <Text style={styles.StartButtonText}>Navigate</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.rescheduleButton}>
                                <Text style={styles.rescheduleText}>Reschedule</Text>
                            </TouchableOpacity>
                        </View>
                    ))} */}
                    <View style={{height:240,width:'80%',backgroundColor:'#fff',borderWidth:1,borderColor:'grey',justifyContent:'center',alignItems:'center',marginHorizontal:40,marginVertical:30}}>
                            <Image
                                source={require('../../assets/images/workNotDoneYet.png')}
                            />
                                                <Text style={{ color: '#000000', fontWeight: '300', marginTop: 10, fontSize: 10 }}>No Visit completed yet.</Text>

                            </View>
                    </ScrollView>


                </View>

            )}

        </View>
    );
};





const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
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
    ButtonContain: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopBar: {
        height: 60,
        width: '100%',
        backgroundColor: '#073E5F',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dashboardCont: {
        flexDirection: 'row'
    },

    dateText: {
        fontSize: 14,
        marginTop: 10,
        padding: 10,
        color: '#000000',
        alignItems: 'center'
    },
    UpperButtonRow: {
        flexDirection: 'row',

    },
    row: {
        flexWrap: 'wrap',
        marginTop: 14,
        marginLeft: 5,

    },
    startDayButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        justifyContent: 'center'

    },
    startDayButton: {
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 20,
        width: 150,
        backgroundColor: '#F2890A',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonsContainer: {
        backgroundColor: '#ffffff',
        height: 52,
        marginHorizontal: 10,
        width: '100%',
        marginTop: 15,
        marginLeft: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },



    buttonText: {
        color: '#B1B1B1',
        fontSize: 14,
        marginHorizontal: 30,
    },
    activeButtonText: {
        color: '#084970',
        fontSize: 14,
        marginHorizontal: 30,
        textDecorationLine: 'underline',
        fontWeight: 800,

    },
    cardContainer: {
        marginTop: 40,
        height: 280,
        width: 300,
        backgroundColor: 'blue',
        borderRadius: 12,
    },
    secondcardContainer: {
        marginTop: 40,
        height: 280,
        width: 300,
        backgroundColor: 'orange',
        borderRadius: 12,
    },
    activeButton: {

        width: 120,
        height: 40,
        padding: 6,
        borderRadius: 14,
        marginLeft: 18,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        backgroundColor: 'orange',
        marginTop: 10,
    },

    inactiveButton: {
        width: 120,
        height: 40,
        padding: 6,
        borderRadius: 14,
        marginLeft: 18,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
    StartButtonText: {
        color: 'blue',
        fontSize: 12,
        fontWeight: 700,
    },
    rescheduleButton: {
        width: 230,
        height: 40,
        padding: 6,
        borderRadius: 14,
        marginLeft: 34,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        backgroundColor: 'skyblue',
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    rescheduleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 700,
    },


});

export default HomeScreen;
