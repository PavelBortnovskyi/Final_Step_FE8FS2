import React from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getSingleTweet } from 'src/redux/selectors/selectors';

function ModalCommentPage() {
  const tweet = useSelector(getSingleTweet);
  const post = tweet?.singleTweet || [];
  const user = useSelector((state) => state.user.user) || '';

  return (
    <Modal title="">
      {post && <TweetPost tweet={post} />}
      <TweetBox placeholder="Tweet your reply" />
    </Modal>
  );
}

export default ModalCommentPage;
