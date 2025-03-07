import { jwtDecode } from 'jwt-decode';
import { CLEAR_USER, SET_USER } from '../actions/userStatus';
import { login } from '../../services/auth';
import { getCookie, setCookie } from '../../helpers/cookie';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const loginUser = (credentials) => async (dispatch) => {
    const response = await login(credentials);
    console.log('response', response);
    const { token } = response.accessToken;
    setCookie('token', token, 1);
    const user = jwtDecode(token);
    dispatch(setUser(user));
};

export const fetchUserFromToken = () => (dispatch) => {
  const token = getCookie('token');
  if (token) {
    const user = jwtDecode(token);
    console.log('user login page', user);
    dispatch(setUser(user));
  }
};
