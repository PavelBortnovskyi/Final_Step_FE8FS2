import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRetweet } from 'src/redux/thunk/tweets/addRetweet';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { deleteTweet } from 'src/redux/thunk/tweets/deleteTweet';
import {
  getAllTweets,
  subscriptionsTweets,
} from 'src/redux/selectors/selectors';

export const PostIconElementRetweet = ({
  icon,
  quantity,
  color,
  id,
  isRetweet,
}) => {
  const dispatch = useDispatch();
  const userTweets1 = useSelector(state => state.userTweets.userTweets)
  // console.log(userTweets1);
  let allTweets = useSelector(getAllTweets);
  let subscriptionUserTweets = useSelector(subscriptionsTweets)
// console.log(allTweets.allTweets);
// console.log(subscriptionUserTweets.subscriptionsTweets);
let tweetsInState = allTweets.allTweets.length ? allTweets.allTweets : subscriptionUserTweets.subscriptionsTweets

  const handleRetweet = () => {
    console.log(isRetweet);
    if (isRetweet) {
      tweetsInState.map((tweet) => {
        tweet.tweetType === 'RETWEET' && console.log(tweet);

        // tweet.parentTweet.id === id && dispatch(deleteTweet({ tweet.id }))
      });
      //
      console.log('delete');
      console.log(id);
    } else {
      dispatch(addRetweet({ id }));
      console.log(id);
      console.log('add');
    }
  };

  return (
    <Box
      onClick={handleRetweet}
      display="flex"
      color={isRetweet ? `${color}` : ''}
      sx={{
        gap: '10px',
        '&:hover': {
          color: { color },
          cursor: 'pointer',
          '.MuiSvgIcon-root': {
            fill: color,
          },
        },
      }}
    >
      {isRetweet ? <RepeatOutlinedIcon color={color} /> : icon}
      {quantity}
    </Box>
  );
};
