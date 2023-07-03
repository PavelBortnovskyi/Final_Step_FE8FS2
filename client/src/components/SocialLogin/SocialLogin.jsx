import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken, setRefreshToken } from 'src/utils/tokens';

export const SocialLogin = () => {
  console.log('test');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  console.log('queryParams', queryParams);
  // // Получение значения accessToken
  // const accessToken = queryParams.get('accessToken');

  // // Получение значения refreshToken
  // const refreshToken = queryParams.get('refreshToken');

  // console.log('access', accessToken);
  // console.log('refresh', refreshToken);

  useEffect(() => {
    // Получение значения accessToken
    const accessToken = queryParams.get('accessToken');

    // Получение значения refreshToken
    const refreshToken = queryParams.get('refreshToken');

    console.log('access', accessToken);
    console.log('refresh', refreshToken);

    if (accessToken && refreshToken) {
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      navigate('/');
    }
  }, [navigate, queryParams]);

  return;
};

// /social-login?accessToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0MCIsInVzZXJuYW1lIjoiQNCU0LzQuNGC0YDQuNC5INCf0L7RgNGC0L3QvtCyIiwiZW1haWwiOiJwb3J0bm92LmRtaXRyeTFAZ21haWwuY29tIiwiaWF0IjoxNjg4MzkyMjY1LCJleHAiOjE2ODg0MDY2NjV9.nPL1KaTq16xz-fK_4Sdz6R3-dmdRE9tzdjAb6e0OjgWpu3hp-Q4q2758SDOyJazpAu8s7J1ts8gGXwIrEdFR8A&refreshToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0MCIsImlhdCI6MTY4ODM5MjI2NSwiZXhwIjoxNjg4OTk3MDY1fQ.6HR1IBggr1c-_odsbYi6WtKXymKThGeHKvZV8zyTtXAWKzllV0LEDnZzPYekdbmWG5qQtHLQdQz42arDy_CqoA
