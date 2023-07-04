import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { setAuthenticated } from 'src/redux/reducers/authSlice';
import { setAuthToken, setRefreshToken } from 'src/utils/tokens';
import { useDispatch } from 'react-redux';
import { getUser } from 'src/redux/thunk/getUser';

export const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    // get accessToken from url
    const accessToken = queryParams.get('accessToken');

    // get refreshToken from url
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken && refreshToken) {
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(getUser());
      // dispatch(setAuthenticated(true));
      navigate('/');
    }
  }, [dispatch, navigate, queryParams]);

  return;
};
