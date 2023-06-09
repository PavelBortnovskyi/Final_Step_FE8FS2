import axios from 'axios';
import { getTokens, setAuthToken, setRefreshToken } from 'src/utils/tokens';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL_AXIOS,
  baseURL: 'https://final-step-fe2fs8tw.herokuapp.com/api/v1/',
});

const { accessToken } = getTokens();
if (accessToken) setAuthToken(accessToken);

myAxios.interceptors.response.use(
  (r) => r,
  async function (error) {
    // TODO: need delete
    return;

    const { refreshToken } = getTokens();
    const originalRequest = error.config;

    if (originalRequest._retry) {
      setAuthToken();
      setRefreshToken();
    } else if (error.response.status === 401) {
      console.log('else');
      originalRequest._retry = true;

      return await myAxios
        .get('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then(({ data }) => {
          console.log('data', data);
          setAuthToken(data.ACCESS_TOKEN);
          setRefreshToken(data.REFRESH_TOKEN);
          originalRequest.headers.Authorization = data.ACCESS_TOKEN;
          return myAxios(originalRequest);
        })
        .catch((err) => {
          console.log('error', err);
          setAuthToken();
          setRefreshToken();
        });
    }
    console.log('last', error);
    return Promise.reject(error);
  }
);
