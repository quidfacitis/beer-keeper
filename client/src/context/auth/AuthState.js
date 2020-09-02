import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // this is the user's json web token
      });
      // loadUser(); -- pending
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg // this is the error message
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
