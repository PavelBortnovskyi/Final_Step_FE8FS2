import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { Layout } from 'src/layout/Layout';
import { getUser } from 'src/redux/thunk/getUser';

export const App = () => {
  const dispatch = useDispatch();

  // if the user has a token in localStorage, the user is authorized
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return <Layout />;
};
