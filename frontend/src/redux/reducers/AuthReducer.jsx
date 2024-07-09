import { createSlice } from '@reduxjs/toolkit';
import { setCookie, getCookie, deleteCookie } from '../helpers/cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: getCookie('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      setCookie('token', action.payload.token, 1);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      deleteCookie('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      'https://api.example.com/login',
      credentials,
    );
    const { token } = response.data;
    const user = jwt_decode(token);
    dispatch(loginSuccess({ token, user }));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export default authSlice.reducer;
