import { Box, Typography, useTheme } from '@mui/material';
import { UserPageAvatar } from '../User/UserPageAvatar';
import PostImages from 'src/UI/tweet/PostImages';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetByIdThunk';

export const QuoteTweet = ({
  linkTo,
  parentTweetId,
  userId,
  userAvatar,
  w,
  h,
  mt,
  fullName,
  useruserTag,
  createdAt,
  body,
  images,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const created = new Date(createdAt);
  const month = created.toLocaleString('default', { month: 'long' });
  const day = created.getDay();
  const date = `${month} ${day}`;
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.border.main}`,
        padding: '4px',
        borderRadius: '20px',
        marginRight: '16px',
      }}
    >
      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
        <Link
          to={`/user/${userId}`}
          onClick={() => {
            dispatch(getUserBiId(userId));
          }}
        >
          <UserPageAvatar userAvatar={userAvatar} w={w} h={h} mt={mt} />
        </Link>

        <Typography fontSize={'14px'}>{fullName}</Typography>
        <Typography color={'rgb(139, 152, 165)'}>{useruserTag}</Typography>
        <Typography color={'rgb(139, 152, 165)'}> {date}</Typography>
      </Box>

      <Link
        to={`/tweet/${linkTo}`}
        onClick={() => {
          dispatch(getTweetByIdThunk(parentTweetId));
        }}
      >
        <Box
          sx={{
            color: `${theme.palette.text.primary}`,
          }}
          //  display={'flex'}
        >
          <Box padding={'0 12px'}>
            <Typography color={'white'}>{body}</Typography>
          </Box>
          <PostImages images={images} quantity={images.length} />
        </Box>
      </Link>
    </Box>
  );
};
