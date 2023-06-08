import { myAxios } from './axiosSetup.js';

export const getTokens = () => {
  // console.log('getTokens');
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
    myAxios.defaults.headers.common.RefreshToken = `Bearer ${token}`;
    localStorage.setItem('refreshToken', token);
  } else {
    delete myAxios.defaults.headers.common.RefreshToken;
    localStorage.removeItem('refreshToken');
  }
};
