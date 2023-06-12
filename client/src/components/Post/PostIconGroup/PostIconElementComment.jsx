import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TweetPost from 'src/UI/TweetPost';
import { Modal } from 'src/components/Modal/Modal';
import { getTweetByID } from 'src/redux/selectors/selectors';
import { getTweetById } from 'src/redux/thunk/getTweetById';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import TweetBox from 'src/components/TweetBox/TweetBox';

function PostIconElementComment({ quantity, color, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log(id);
      dispatch(getTweetById(id));
    }
  }, [isModalOpen]);

  const tweet = useSelector(getTweetByID);
  const post = tweet.tweet;

  return (
    <Box
      onClick={(e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
      }}
      display="flex"
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
      <ChatBubbleOutlineOutlinedIcon fontSize="small" />
      {quantity}
      {isModalOpen && (
        <Modal title="">
          {post && (
            <TweetPost
              id={post.tweetId}
              displayName={user.fullName}
              text={post.body}
              username={post.userTag}
              logoUrl={post.userAvatarImage}
              verified={user.isVerified}
              image={post.attachmentsImages[0]}
              likes={post.countLikes}
              reply={post.countReply}
              retweet={post.countRetweets}
            />
          )}
          <TweetBox />
        </Modal>
      )}
    </Box>
  );
}

export default PostIconElementComment;
