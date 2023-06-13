import axios from 'axios';
import { getTokens, setAuthToken, setRefreshToken } from 'src/utils/tokens';

// TODO: myAxios нужно импортировать вместо - axios из библиотеки
// Server default URL
export const myAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL_AXIOS,
  baseURL: 'https://final-step-fe2fs8tw.herokuapp.com/api/v1/',
});

myAxios.interceptors.response.use(
  (r) => r,
  async function (error) {
    // console.log('1', localStorage.getItem('accessToken'));

    const { refreshToken } = getTokens();

    // console.log('2', localStorage.getItem('accessToken'));

    const originalRequest = error.config;

    // console.log(originalRequest);

    if (originalRequest._retry) {
      // console.log('3', localStorage.getItem('accessToken'));

      setAuthToken();
      setRefreshToken();
    } else if (error.response.status === 401) {
      // console.log('4', localStorage.getItem('accessToken'));

      originalRequest._retry = true;

      return await axios
        .get('/api/v1/auth/refresh', {
          headers: {
            'Refresh-token': refreshToken,
          },
        })
        .then(({ data }) => {
          setAuthToken(data.token);
          setRefreshToken(data.refreshToken);
          originalRequest.headers.Authorization = data.token;
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
