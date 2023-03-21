import React, { FC, useState, useEffect,Component } from "react";
import { Button, StyleSheet, Text, TextInput, View, Linking, Platform, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CountryPicker } from "react-native-country-codes-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginApi } from "../../API/AuthApi";
import moment from "moment";
import { Icon } from "react-native-elements";
import { DropdownDate, DropdownComponent } from 'react-dropdown-date';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


const DashboardScreen = (props) => {
    const { navigation } = props;

    const [date, setDate] = useState(new Date());

    const handleArrowPress = (direction) => {
      const newDate = new Date(date);
      if (direction === 'left') {
        newDate.setDate(date.getDate() - 1);
            console.log('lett----------->')
      } else if(direction === 'right') {
        newDate.setDate(date.getDate() + 1);
        console.log('Right----------------->')
      }
      setDate(newDate);
    };


    // to display Current Day month and year
    const today = moment().format('Do');
    const today1 = moment().format('MMMM , YYYY');
    const today2 = moment().format('MMMM');


    return (

        <View style={styles.container}>
            <View style={styles.TopBar}>
                <Text style={{ color: '#ffffff', marginLeft: 10, marginTop: 15 }}>Dashboard</Text>
            </View>
            <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                <View style={styles.dashboardCont}>
                    <TouchableOpacity onPress={()=>{handleArrowPress('left')}}><Text style={{ color: '#000000', fontSize: 35 }}>{'<'}</Text></TouchableOpacity>
                    <Text style={styles.dateText}>{today}</Text>
                    <TouchableOpacity onPress={()=>handleArrowPress('right')}><Text style={{ color: '#000000', fontSize: 35 }}>{'>'}</Text></TouchableOpacity>
                </View>
                <Text style={{ fontSize: 14, color: '#000000' }}>{today1}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000', fontSize: 13, fontWeight: 500, marginTop: 30, marginLeft: 0 }}>Total distance</Text>
                <Text style={{ color: '#000000', fontSize: 13, fontWeight: 500, marginTop: 30 }}>Total Number of</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000', fontSize: 13, fontWeight: 500,  padding: 8 }}>Travelled Today</Text>
                <Text style={{ color: '#000000', fontSize: 13, fontWeight: 500, marginLeft: 20, padding: 8 }}>Visits Today</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <View style={{ height: 120, width: 120, borderRadius: 80,  borderWidth: 4, borderColor: '#42A6F9', alignItems: 'center', justifyContent: 'center', backgroundColor: '#DAEEFF' }}>
                    <Text style={{ color: '#073E5F', fontWeight: 400, fontSize: 12 }}>24 Km</Text>

                </View>
                <View style={{ height: 120, width: 120, borderRadius: 80, borderWidth: 4, borderColor: '#FCB45E', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE4C3' }}>
                    <Text style={{ color: 'orange', fontWeight: 400, fontSize: 12 }}>10 Visits</Text>
                </View>
            </View>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 400, marginTop: 60, marginLeft: 0 }}></View>
        

        <View style={{flexDirection:'row'}}>
        <Text style={{ color: '#000000', fontSize: 13, fontWeight: 500, marginLeft: 30, padding: 8, marginTop:40 }}>Time Spent on each Visit</Text>
        <View style={{height:40,width:100,borderWidth:1,marginTop:40,marginLeft:20,borderRadius:16, justifyContent:'space-around',alignItems:'center'}}>
        <Text style={{ fontSize: 10, color: '#000000',marginRight:4 }}> {today} {today2}
        <Image style={{marginLeft:2}} source={require('../../assets/images/dropDown.png')}></Image>

        </Text>
        </View>
        </View>

        <View style={{height:260,width:300,marginTop:30,borderBottomWidth:1,borderLeftWidth:1,marginLeft:40,}}>
        <View style={{height:40,width:120,backgroundColor:'#3356F6', marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:12}}>Arjun Singh</Text>
        </View>
        <View style={{height:40,width:250,backgroundColor:'#3356F6', marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:12}}>Arjun Singh</Text>
        </View>
        <View style={{height:40,width:90,backgroundColor:'#3356F6', marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:12}}>Arjun Singh</Text>
        </View>
        <View style={{height:40,width:180,backgroundColor:'#3356F6', marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:12}}>Arjun Singh</Text>
        </View>

        </View>

        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:40}}>
            <Text style={styles.Numbers}>30</Text>
            <Text style={styles.Numbers}>60</Text>

            <Text style={styles.Numbers}>90</Text>

            <Text style={styles.Numbers}>120</Text>

            <Text style={styles.Numbers}>150</Text>


        </View>
        </ScrollView>
        
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
       
        width: '100%',
        height: '100%',
    },
    TopBar: {
        height: 60,
        width: 400,
        backgroundColor: '#073E5F',
        flexDirection: 'row',
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
    Numbers:{
        color:'#000000',
        marginHorizontal:20,
    }
  

});

export default DashboardScreen;