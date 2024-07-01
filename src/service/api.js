import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken , getType} from '../utils/common-utils';

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.params){
            config.params =  config.TYPE.params;
        }else if(config.TYPE.query){
            config.url = config.url + '/'+ config.TYPE.query ;
        }
        return config;
    },
    function (error){
       return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response){
        return processResponse(response);
    },
    function (error){
        return Promise.reject( processError(error));
    }
)

//processResponseI() takes response object as param then return object 
//return {isSuccess: true, data: response.data} when success 
//return {isFailure, msg, status, code} when fail

function processResponse(response){
    if(response?.status === 200){
        return {
            isSuccess: true,
            data: response.data
        }
    }else{
        return{
            isFailure: true,
            msg: response.msg,
            status: response.status,
            code: response.code,
        }
    }
}

// This will help us handle error to debug and know where are going wrong
function processError(error){
    if(error.response){
        console.log('Error in RESPONSE :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure.msg,
            code: error.response.code,
        }
    }else if(error.request){
        console.log('Error in REQUEST :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.msg,
            code: '',
        }
    }else{
        console.log('Error in NETWORK :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure.msg,
            code: '',
        }
    }
}

//create a API 

const API = {};

for( const [key , value] of Object.entries(SERVICE_URLS)){
    API[key] = (body , showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            responseType: value.responseType,
            onUploadProgress: function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total );
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
            
        })
}

export {API};