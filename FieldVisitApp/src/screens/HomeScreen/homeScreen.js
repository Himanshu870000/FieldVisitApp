import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Image, Linking, ToastAndroid, ScrollView, Alert } from "react-native";
import moment from 'moment';
import { Card } from "react-native-elements";

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
    const { navigation } = props;
    const [startDay, setStartDay] = useState(false);
    const [endDay, setEndDay] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


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


    const today = moment().format('Do');
    const today1 = moment().format('MMMM  YYYY');


    const handleNavigate = async () => {
        if (!startDay) {
            Alert.alert('Please start your day first');
            return;
        }

        navigation.navigate('MapViewScreen')
    }

    const handleGetDirections = () => {
        const origin = "bengaluru, india";
        const destination = "bengaluru, india";
        const path = "12.972442,77.580643|12.9083,77.6051"; // path in the format of latitude,longitude
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&waypoints=${path}`;
        Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <View style={styles.TopBar}>
                <TouchableOpacity style={{ color: '#ffffff', justifyContent: 'center', marginLeft: 20 }}><Text>User</Text></TouchableOpacity>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 8 }}>Ajeet Kumar</Text>
                <Text style={{ color: 'orange', marginLeft: 150, marginTop: 8 }}>Logout</Text>

            </View>

            <View style={styles.dashboardCont}>
                <TouchableOpacity><Text style={{ color: '#000000', fontSize: 35 }}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.dateText}>{today}</Text>
                <TouchableOpacity><Text style={{ color: '#000000', fontSize: 35 }}>{'>'}</Text></TouchableOpacity>

                <Text style={{ color: '#084970', fontWeight: 700, marginLeft: 160, marginTop: 30, fontSize: 16, textDecorationLine: 'underline' }}>Dashboard</Text>
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
                <View><Text style={{ color: '#000000' }}>Customer to visit</Text>
                    <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: '#DEDEDE', width: 300, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
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
                                <TouchableOpacity style={styles.rescheduleButton}>
                                    <Text style={styles.rescheduleText}>Reschedule</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                </View>
            ) : (
                <View><Text style={{ color: '#000000' }}>Visited Customers</Text>
                    <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: '#DEDEDE', width: 300, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
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
                        ))}
                    </ScrollView>
                </View>

            )}
            <View>

            </View>



            <TouchableOpacity
                style={{ height: 40, width: 100, backgroundColor: '#084970', marginTop: 40 }}

                onPress={() => {
                    handleGetDirections();
                }}
            ><Text style={{ color: "#FFFFFF", fontWeight: '500', alignSelf: 'center', marginTop: 5 }}>Start Visit</Text></TouchableOpacity>
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
