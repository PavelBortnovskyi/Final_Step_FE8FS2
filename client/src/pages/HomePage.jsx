import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import PostList from 'src/components/Post/PostList';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getAllTweetsThunk } from 'src/redux/thunk/tweets/getAllTweetsThunk';
import { getSubscriptionsTweets } from 'src/redux/thunk/tweets/getSubscriptionsTweets';
import {
  getAllTweets,
  subscriptionsTweets,
} from 'src/redux/selectors/selectors';
import TweetList from 'src/UI/TweetList';

export const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(1);

  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tabIndex === 0) {
      dispatch(getAllTweetsThunk());
      console.log('all');
    } else {
      dispatch(getSubscriptionsTweets({ page: 0, pageSize: 10 }));
      console.log('sub');
    }
  }, [tabIndex]);

  let allTweets = useSelector(getAllTweets);
  let allTweetsArray = allTweets.allTweets;

  let subscriptions = useSelector(subscriptionsTweets);
  let subscriptionsArray = subscriptions.subscriptionsTweets;
  console.log(subscriptionsArray);

  return (
    <Box
      sx={{
        borderTop: '0px',
      }}
    >
      <MainPage_header tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {!isScreenSmall && isAuthenticated ? <TweetBox /> : null}
      <TweetList
        tweets={tabIndex === 0 ? allTweetsArray : subscriptionsArray}
      />
    </Box>
  );
};
