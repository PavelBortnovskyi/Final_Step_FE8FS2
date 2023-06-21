import React, { useState } from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getSingleTweet } from 'src/redux/selectors/selectors';
import Reply from './tweetPage/Reply';

function ModalCommentPage() {
  const tweet = useSelector(getSingleTweet);
  const post = tweet?.singleTweet || [];
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal title="" isOpen={isOpen} setIsOpen={setIsOpen}>
      {!Array.isArray(post) && <TweetPost tweet={post} />}
      <Reply
        id={post.id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="replayModal"
      />
    </Modal>
  );
}

export default ModalCommentPage;
