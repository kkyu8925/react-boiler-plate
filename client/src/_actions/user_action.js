import Axios from 'axios';
import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER 
} from './types';

export function loginUser(dataToSubmit) {

    // 서버로 요청
    const request = Axios.post('/api/user/login', dataToSubmit)
        .then(response => response.data )

    // 서버에서 처리 후 
    return {
        type: LOGIN_USER,
        payload: request
    }    
}

export function registerUser(dataToSubmit) {

    // 서버로 요청
    const request = Axios.post('/api/user/register', dataToSubmit)
        .then(response => response.data )

    // 서버에서 처리 후 
    return {
        type: REGISTER_USER,
        payload: request
    }    
}

export function auth() {

    // 서버로 요청
    const request = Axios.get('/api/user/auth')
        .then(response => response.data )

    // 서버에서 처리 후 
    return {
        type: AUTH_USER,
        payload: request
    }    
}