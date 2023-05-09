import axios from 'axios';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  baseURL: process.env.SERVER_URL_AXIOS,
});

// add authorization token from localStorage to request header
myAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
