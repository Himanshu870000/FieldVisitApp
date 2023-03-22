import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HOST = "http://192.168.0.157:8000/api/";

export const getToken = async () => {
    return await AsyncStorage.getItem('token');
}

export const AxiosRequest = axios.create({
    baseURL: HOST,
    headers: {
        'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})