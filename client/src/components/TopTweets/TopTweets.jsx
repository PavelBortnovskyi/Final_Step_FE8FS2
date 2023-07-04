import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserAllTypeTweets } from '../User/UserAllTypeTweets/UserAllTypeTweets';
import { getAllTweetsThunkNoAuth } from 'src/redux/thunk/tweets/getAllTweetsThunkNoAuth';
import { getAuthorizationData } from 'src/redux/selectors/selectors';
import { Box, Typography, useTheme } from '@mui/material';
import { ArrowBack } from 'src/UI/ArrowBack';
import LoaderSkeleton from 'src/UI/LoaderSkeleton';

export const TopTweets = () => {
  const tweetsNoAuthState = useSelector((state) => state.tweetsNoAuth);
  const tweetsNoAuthLoading = tweetsNoAuthState.isLoading;
  const tweetsNoAuthArray = tweetsNoAuthState.tweetsNoAuth;
  const { isAuthenticated } = useSelector(getAuthorizationData);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllTweetsThunkNoAuth({ page: 0, size: 20 }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(15px)',
        width: '100%',
        pb: '2px',
        position: 'sticky',
        top: '0',
        zIndex: 13,
        borderBottom: `1px solid ${theme.palette.border.main}`,
      }}>
        <ArrowBack />
        <Typography variant='h4'>
          Top tweets
        </Typography>
      </Box>

      {tweetsNoAuthLoading && <LoaderSkeleton />}
      <UserAllTypeTweets tweets={tweetsNoAuthArray} />
    </Box>

  )
}
