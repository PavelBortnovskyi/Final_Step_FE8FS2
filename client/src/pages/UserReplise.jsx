// UserReplise

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Followers } from 'src/components/Followers/Followers';
import { NotificationsReplying } from 'src/components/NotificationsUser/NotificationsReplying';
import { getFollowers } from 'src/redux/thunk/getFollowers';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';

export const UserReplise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userReplise =
    useSelector((state) => state.userReplise.userReplise) || [];
  const replise = userReplise.content;
  console.log(userReplise);
  // const name = useSelector((state) => state.userBiId.userId.fullName) || '';
  useEffect(() => {
    dispatch(getUserReplise(id));
  }, [dispatch]);

  return (
    replise &&
    replise.map((replise) => {
      <Box>
        <>asd</>
        <NotificationsReplying notification={replise} />
      </Box>;
    })
  );
};
