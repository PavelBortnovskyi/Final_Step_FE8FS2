import axios from 'axios';
import { getTokens, setAuthToken, setRefreshToken } from 'src/utils/tokens';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL_AXIOS,
  baseURL: 'http://localhost:8080/api/v1/',
});

const { accessToken } = getTokens();
if (accessToken) setAuthToken(accessToken);

myAxios.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;

    // *** ERROR ***
    if (
      originalRequest.url === '/auth/login' ||
      originalRequest.url === '/auth/refresh'
    ) {
      return Promise.reject(error);
    }
    // *** *** *** ***

    const { refreshToken } = getTokens();

    // if refresh token is empty
    // if (!refreshToken) return error;

    if (originalRequest._retry) {
      setAuthToken();
      setRefreshToken();
    } else if (error.response.status === 401) {
      originalRequest._retry = true;

      return await myAxios
        .get('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then(({ data }) => {
          setAuthToken(data.ACCESS_TOKEN);
          setRefreshToken(data.REFRESH_TOKEN);
          originalRequest.headers.Authorization = `Bearer ${data.ACCESS_TOKEN}`;
          return myAxios(originalRequest);
        })
        .catch((err) => {
          setAuthToken();
          setRefreshToken();
        });
    }
    return Promise.reject(error);
  }
);
