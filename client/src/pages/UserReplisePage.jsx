import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserReplise } from 'src/components/Replise/UserReplise';
import { getUserReplise } from 'src/redux/thunk/getUserReplise';

export const UserReplisePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userReplise =
    useSelector((state) => state.userReplise.userReplise) || [];
  const replise = userReplise.content;
  useEffect(() => {
    dispatch(getUserReplise(id));
  }, [dispatch, id]);

  return (
    replise && (
      <Box>
        <UserReplise replise={replise} />
      </Box>
    )
  );
};
