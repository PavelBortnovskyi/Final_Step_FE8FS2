import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken, setRefreshToken } from 'src/utils/tokens';

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  console.log('queryParams', queryParams);

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
      // navigate('/');
    }
  }, [navigate, queryParams]);

  return <>test</>;
};
