import axios from 'axios';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User in App.js
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: AUTH_ERROR })
    }
}

// Register User
export const register = (name, email, password ) => async dispatch => {
    const config = {
        header : {
            'Content-Type': 'application/json'
        }
    };

    const body = { name, email, password };
    
    try {
        const res =  await axios.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({ type: REGISTER_FAILED });
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        header : {
            'Content-Type': 'application/json'
        }
    };

    const body = { email, password };

    try {
        const res =  await axios.post('/api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({ type: LOGIN_FAILED });
    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}
