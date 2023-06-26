import { Box, Typography, useTheme } from '@mui/material';

import PostImages from 'src/UI/tweet/PostImages';
import { UserPageAvatar } from '../User/UserPageAvatar';
import PostIconList from '../Post/PostIconGroup/PostIconList';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetByIdThunk';

export const TweetReplise = ({
  paren,
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
  const theme = useTheme();

  const dispatch = useDispatch();
  const created = new Date(createdAt);
  const month = created.toLocaleString('default', { month: 'long' });
  const day = created.getDay();
  const date = `${month} ${day}`;
  const userId = paren.user.id;
  const tweetId = paren.id;
  return (
    <Box
      paddingTop={'16px'}
      paddingBottom={'16px'}
      display={'flex'}
      gap={'8px'}
      sx={{
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: ` ${theme.palette.background.hover}`,
          cursor: 'pointer',
        },
      }}
    >
      <Link
        to={`/user/${userId}`}
        onClick={() => {
          dispatch(getUserBiId(userId));
        }}
      >
        <UserPageAvatar userAvatar={userAvatar} w={w} h={h} mt={mt} />
      </Link>

      <Box width={'100%'}>
        <Link
          to={`/tweet/${tweetId}`}
          onClick={() => {
            dispatch(getTweetByIdThunk(tweetId));
          }}
        >
          <Box sx={{ color: `${theme.palette.text.primary}`, width: '95%' }}>
            <Box display={'flex'} gap={'4px'} alignItems={'center'}>
              <Typography fontSize={'18px'}>{fullName}</Typography>
              <Typography color={'rgb(139, 152, 165)'}>
                {useruserTag}
              </Typography>
              <Typography color={'rgb(139, 152, 165)'}> {date}</Typography>
            </Box>

            <Typography>{body}</Typography>
            <PostImages images={images} quantity={images.length} />
          </Box>
        </Link>
        <Box display={'flex'} justifyContent={'center'} width={'100%'}>
          <PostIconList
            likes={paren.countLikes}
            reply={paren.countReply}
            retweet={paren.countRetweets}
            id={paren.id}
            isLiked={paren.currUserLiked}
            isRetweet={paren.countRetweets}
            isComment={paren.countReplays}
            isBookmark={paren.countBookmarks}
          />
        </Box>
      </Box>
    </Box>
  );
};
