import axios from 'axios';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL_AXIOS,
  baseURL: 'https://final-step-fe2fs8tw.herokuapp.com/api/v1',
});

// add authorization token from localStorage to request header
myAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;

  return config;
});
