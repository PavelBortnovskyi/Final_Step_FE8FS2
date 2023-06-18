import { useDispatch } from 'react-redux';

import { myAxios } from './axiosSetup.js';
import { notAuthenticated } from 'src/redux/reducers/authSlice.js';

export const getTokens = () => {
  // console.log('token ******************' + localStorage.getItem('accessToken'));
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

export const setAuthToken = (token) => {
  if (token) {
    myAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  } else {
    delete myAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('accessToken');
  }
};

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem('refreshToken', token);
  } else {
    localStorage.removeItem('refreshToken');
  }
};
