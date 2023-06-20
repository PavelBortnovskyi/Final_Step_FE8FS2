import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'src/layout/Layout';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getUser } from 'src/redux/thunk/getUser';
import { clientSocket } from 'src/utils/socketSetup';
import { getTokens } from 'src/utils/tokens';

import { setSocketChat } from 'src/redux/reducers/chatSlice';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const { accessToken } = getTokens();

  const stompClientRef = useRef(null);

  //****************** CONNECT TO SOCKET *********************/
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      try {
        // create connect to socket
        stompClientRef.current = clientSocket();
        dispatch(setSocketChat(stompClientRef.current));
        //
      } catch (error) {
        console.error('Error activating STOMP connection:', error);
      }

      return () => {
        try {
          stompClientRef.current.deactivate();
          //
        } catch (error) {
          console.error('Error deactivating STOMP connection:', error);

          // TODO: work ??? If there is a connection error, try to reconnect.
          if (error.message === 'Lost connection to server') {
            console.log('Attempting to reconnect...');
            stompClientRef.current.activate();
          }
        }
      };
    }
  }, [dispatch, accessToken, isAuthenticated]);
  //*********************************************************/

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  return <Layout />;
};
