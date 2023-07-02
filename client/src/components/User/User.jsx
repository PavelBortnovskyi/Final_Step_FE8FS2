import { Box, useTheme } from '@mui/material';
import { UserAction } from './UserAction';
import { UserHeder } from './UserHeder';
import { UserInfo } from './UserInfo';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';

export const User = ({
  idUser,
  userButton,
  lincToFollowers,
  lincToFollowings,
  fullName,
  tweetsCounter,
  hederImg,
  userAvatar,
  userTag,
  userBio,
  userLocation,
  createdAt,
  countUserFollowings,
  countUserFollowers,
}) => {
  const theme = useTheme();
  let containerRef = useRef(null);
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(1);

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPages = useSelector((state) => state.pagination.totalPages);
  const [page, setPage] = useState(currentPage);

  const userLikesIsLoading = useSelector((state) => state.userLikes.isLoading);
  const replyIsLoading = useSelector((state) => state.userReplise.isLoading);
  const userTweetsIsLoading = useSelector(
    (state) => state.userTweets.isLoading
  );

  ///Call different actions depends on tab
  useEffect(() => {
    if (tabIndex == 1) {
      dispatch(getUserTweetsThunk({ idUser: idUser, page: page, size: 10 }));
    } else if (tabIndex == 2) {
      dispatch(getUserReplise({ page: page, size: 10, id: idUser }));
    } else if (tabIndex == 3) {
      dispatch(getUserLikes({ page: page, size: 10, id: idUser }));
    }
  }, [dispatch, tabIndex, page, idUser]);

  ///when page has changed dispatch call new thunk
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
  }, [containerRef, userLikesIsLoading, replyIsLoading, userTweetsIsLoading]);
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.border.main}`,

        width: '100vw',
      }}
    >
      <UserHeder fullName={fullName} tweetsCounter={tweetsCounter} />
      <UserInfo
        userButton={userButton}
        lincToFollowers={lincToFollowers}
        lincToFollowings={lincToFollowings}
        hederImg={hederImg}
        userAvatar={userAvatar}
        fullName={fullName}
        userTag={userTag}
        userBio={userBio}
        userLocation={userLocation}
        createdAt={createdAt}
        countUserFollowings={countUserFollowings}
        countUserFollowers={countUserFollowers}
      />
      <UserAction idUser={idUser} setTabIndex={setTabIndex} />
      {userLikesIsLoading || userTweetsIsLoading || replyIsLoading ? (
        false
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
