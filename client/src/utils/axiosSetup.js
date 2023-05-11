import axios from 'axios';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// add authorization token from localStorage to request header
myAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});
