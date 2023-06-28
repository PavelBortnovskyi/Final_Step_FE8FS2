import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { addQuote } from 'src/redux/thunk/tweets/addQuote';
import { createTweet } from 'src/redux/thunk/tweets/createTweet';
import { Box } from '@mui/material';
import { useState } from 'react';

function Reply({ isOpen, setIsOpen, id, type }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const handleSubmit = (postInputText, postImages) => {
    if (type === 'reply') {
      dispatch(createTweetReply({ id, postInputText, postImages }));
    } else if (type === 'quoteModal') {
      dispatch(addQuote({ id, postInputText, postImages }));
      setIsOpen(false);
      !!location.state ? navigate(-1) : navigate('/');
    } else if (type === 'replayModal') {
      dispatch(createTweetReply({ id, postInputText, postImages }));
      setIsOpen(false);
      !!location.state ? navigate(-1) : navigate('/');
    } else if (type === 'createTweet') {
      dispatch(createTweet({ postInputText, postImages }));
      setIsOpen(false);
      !!location.state ? navigate(-1) : navigate('/');
    }
  };

  return (
    <Box sx={{ mt: '100px' }}>
      <TweetBox
        placeholder="Tweet your reply"
        fnc={handleSubmit}
        userAvatar={user.avatarImgUrl}
        isPicker={true}
      />
    </Box>
  );
}

export default Reply;
