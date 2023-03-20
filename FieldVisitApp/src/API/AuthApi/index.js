import { AxiosRequest, getToken, HOST } from "../";


export const LoginApi = async (payload) => {
    const url = `${HOST}/login`;
	try {
        // const token = await getToken();
        // AxiosRequest.defaults.headers.Authorization = `Token ${token}`;
        const response = await AxiosRequest.post(url, payload);
        console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            return { status: 400, message: error.message };
        }
    }
};