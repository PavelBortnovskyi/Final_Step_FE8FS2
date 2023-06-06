import axios from 'axios';
import {getTokens, setAuthToken, setRefreshToken} from "src/utils/tokens";

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL_AXIOS,
  baseURL: 'https://final-step-fe2fs8tw.herokuapp.com/api/v1',
});

myAxios.interceptors.response.use((r) => r,
    async function (error) {
      const {refreshToken} = getTokens();
      const originalRequest = error.config;

      if (originalRequest._retry) {
        setAuthToken();
        setRefreshToken();
      } else if (error.response.status === 401) {
        originalRequest._retry = true;

        return await axios
            .get('/api/v1/auth/refresh', {
              headers: {
                'Refresh-token': refreshToken
              }
            })
            .then(({data}) => {
              setAuthToken(data.token);
              setRefreshToken(data.refreshToken);
              originalRequest.headers.Authorization = data.token;
              return myAxios(originalRequest);
            })
            .catch(err => {
              setAuthToken();
              setRefreshToken();
            });

      }

      return Promise.reject(error);
    });