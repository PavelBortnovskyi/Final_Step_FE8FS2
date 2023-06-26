import { Box, Pagination, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPages = useSelector((state) => state.pagination.totalPages);
  const containerRef = useRef(null);

  const [tabIndex, setTabIndex] = useState(1);
  const [page, setPage] = useState(currentPage);
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (tabIndex === 0) {
        dispatch(getAllTweetsThunk());
      } else {
        dispatch(getSubscriptionsTweets({ page: page, pageSize: 1 }));
      }
    } else {
      dispatch(getAllTweetsThunkNoAuth({ page: 0, size: 20 }));
    }
  }, [dispatch, isAuthenticated, tabIndex, page]);

  let allTweets = useSelector(getAllTweets);
  let allTweetsLoading = allTweets.isLoading;
  let allTweetsArray = allTweets.allTweets;

  let subscriptions = useSelector(subscriptionsTweets);
  let subscriptionsLoading = subscriptions.isLoading;

  let subscriptionsArray = subscriptions.subscriptionsTweets;
  let tweetsNoAuthState = useSelector((state) => state.tweetsNoAuth);
  let tweetsNoAuthLoading = tweetsNoAuthState.isLoading;
  let tweetsNoAuthArray = tweetsNoAuthState.tweetsNoAuth;

  // const handleScroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
  //   console.log('working');
  //   if (scrollTop + clientHeight >= scrollHeight - 20) {
  //     dispatch(
  //       getSubscriptionsTweets({
  //         page: currentPage + 1,
  //         pageSize: 10,
  //         loadMore: true,
  //       })
  //     );
  //   }
  // };

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        borderTop: '0px',
        overflowY: 'scroll',
        pb: '10px',
      }}
      ref={containerRef}
    >
      <MainPage_header
        id="header"
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
      {!isScreenSmall && isAuthenticated ? <TweetBox /> : null}

      {isAuthenticated ? (
        subscriptionsLoading ? (
          <LoaderSkeleton />
        ) : (
          <TweetList
            tweets={tabIndex === 0 ? allTweetsArray : subscriptionsArray}
          />
        )
      ) : (
        <TweetList tweets={tweetsNoAuthArray} />
      )}
      {tweetsNoAuthLoading || (subscriptionsLoading && <LoaderSkeleton />)}
      {allTweetsLoading && <LoaderSkeleton />}
      <Link to="#top" onClick={scrollUp}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            color="primary"
            onChange={(e) => setPage(e.target.textContent - 1)}
          />
        </Box>
      </Link>
    </Box>
  );
};
