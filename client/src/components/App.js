import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { useSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

export const App = () => {
  const dispatch = useDispatch();
  // get message from server after authorization
  const { isAuthenticated } = useSelector(getAuthorizationData);
  // get token
  const { accessToken } = getTokens();

  // set connect socket server
  const socket = useSocket(accessToken, isAuthenticated);

  // if the user has a token in localStorage, the user is authorized
  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
