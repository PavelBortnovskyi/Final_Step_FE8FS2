import React, { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPageHeader from 'src/components/MainPage_header/MainPage_header';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { getAllTweetsThunk } from 'src/redux/thunk/tweets/getAllTweetsThunk';
import { getSubscriptionsTweets } from 'src/redux/thunk/tweets/getSubscriptionsTweets';
import {
  getAllTweets,
  subscriptionsTweets,
} from 'src/redux/selectors/selectors';
import { getAllTweetsThunkNoAuth } from 'src/redux/thunk/tweets/getAllTweetsThunkNoAuth';
import LoaderSkeleton from 'src/UI/LoaderSkeleton';
import { UserAllTypeTweets } from 'src/components/User/UserAllTypeTweets/UserAllTypeTweets';
import TweetPost from 'src/UI/tweet/TweetPost';

export const HomePage = () => {
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPages = useSelector((state) => state.pagination.totalPages);
  let containerRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(currentPage);
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();

  const createPost = useSelector((state) => state.createPost);
  const isCreatingPost = createPost.isLoading;

  const subscriptions = useSelector(subscriptionsTweets);
  const subscriptionsLoading = subscriptions.isLoading;
  const subscriptionsArray = subscriptions.subscriptionsTweets;

  const allTweetsState = useSelector(getAllTweets);
  const allTweetsLoading = allTweetsState.isLoading;
  const allTweetsArray = allTweetsState.allTweets;

  useEffect(() => {
    if (isAuthenticated) {
      if (tabIndex === 0) {
        dispatch(getAllTweetsThunk({ page: page, size: 10 }));
      } else {
        dispatch(getSubscriptionsTweets({ page: page, size: 10 }));
      }
    } else {
      dispatch(getAllTweetsThunkNoAuth({ page: 0, size: 20 }));
    }
  }, [dispatch, isAuthenticated, tabIndex, page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && page < totalPages) {
        loadMore();
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, subscriptionsLoading, allTweetsLoading]);

  const tweetsNoAuthState = useSelector((state) => state.tweetsNoAuth);
  const tweetsNoAuthLoading = tweetsNoAuthState.isLoading;
  const tweetsNoAuthArray = tweetsNoAuthState.tweetsNoAuth;

  return (
    <Box
      sx={{
        borderTop: '0px',
        pb: '10px',
      }}
    >
      <MainPageHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {!isScreenSmall && isAuthenticated ? <TweetBox /> : null}{' '}
      {isCreatingPost && <LinearProgress />}
      {isAuthenticated ? (
        <UserAllTypeTweets
          tweets={tabIndex === 0 ? allTweetsArray : subscriptionsArray}
        />
      ) : (
        <>
          {tweetsNoAuthArray.map((post) => (
            <TweetPost key={post.id} tweet={post} />
          ))}
        </>
      )}
      {subscriptionsLoading || tweetsNoAuthLoading || allTweetsLoading ? (
        <LoaderSkeleton quantity={10} />
      ) : (
        <Box
          ref={containerRef}
          sx={{
            height: '100px',
          }}
        ></Box>
      )}
    </Box>
  );
};
