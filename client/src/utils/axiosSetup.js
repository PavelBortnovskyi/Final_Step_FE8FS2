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
    const { refreshToken } = getTokens();
    const originalRequest = error.config;

    // if refresh token is empty
    // if (!refreshToken) return;

    if (originalRequest._retry) {
      setAuthToken();
      setRefreshToken();
    } else if (error.response.status === 401) {
      // if 401 error from /auth/refresh
      if (
        originalRequest.url === '/auth/refresh' &&
        error.response.status === 401
      )
        return;

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
