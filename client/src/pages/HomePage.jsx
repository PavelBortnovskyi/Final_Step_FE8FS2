import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getAllTweetsThunk } from 'src/redux/thunk/tweets/getAllTweetsThunk';
import { getSubscriptionsTweets } from 'src/redux/thunk/tweets/getSubscriptionsTweets';
import {
  getAllTweets,
  subscriptionsTweets,
} from 'src/redux/selectors/selectors';
import TweetList from 'src/UI/TweetList';
import { getAllTweetsThunkNoAuth } from 'src/redux/thunk/tweets/getAllTweetsThunkNoAuth';
import LoaderSkeleton from 'src/UI/LoaderSkeleton';

export const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(1);

  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (tabIndex === 0) {
        dispatch(getAllTweetsThunk());
      } else {
        dispatch(getSubscriptionsTweets({ page: 0, pageSize: 10 }));
      }
    } else {
      // get tweets without auth
      dispatch(getAllTweetsThunkNoAuth({ page: 0, size: 20 }));
    }
  }, [dispatch, isAuthenticated, tabIndex]);

  let allTweets = useSelector(getAllTweets);
  let allTweetsLoading = allTweets.isLoading;
  let allTweetsArray = allTweets.allTweets;

  let subscriptions = useSelector(subscriptionsTweets);
  let subscriptionsLoading = subscriptions.isLoading;

  let subscriptionsArray = subscriptions.subscriptionsTweets;
  let tweetsNoAuthState = useSelector((state) => state.tweetsNoAuth);
  let tweetsNoAuthLoading = tweetsNoAuthState.isLoading;
  let tweetsNoAuthArray = tweetsNoAuthState.tweetsNoAuth;

  return (
    <Box
      sx={{
        borderTop: '0px',
      }}
    >
      <MainPage_header tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {!isScreenSmall && isAuthenticated ? <TweetBox /> : null}
      {isAuthenticated ? (
        <TweetList
          tweets={tabIndex === 0 ? allTweetsArray : subscriptionsArray}
        />
      ) : (
        <TweetList tweets={tweetsNoAuthArray} />
      )}
      {tweetsNoAuthLoading || (subscriptionsLoading && <LoaderSkeleton />)}
      {allTweetsLoading && <LoaderSkeleton />}
    </Box>
  );
};
