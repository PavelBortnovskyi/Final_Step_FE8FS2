import React from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getSingleTweet } from 'src/redux/selectors/selectors';
import Reply from './tweetPage/Reply';

function ModalCommentPage() {
  const tweet = useSelector(getSingleTweet);
  const post = tweet?.singleTweet || [];
  const user = useSelector((state) => state.user.user) || '';

  return (
    <Modal title="">
      {!Array.isArray(post) && <TweetPost tweet={post} />}
      <Reply />
    </Modal>
  );
}

export default ModalCommentPage;
