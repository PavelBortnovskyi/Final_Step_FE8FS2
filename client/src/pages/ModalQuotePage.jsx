import React, { useState } from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import Reply from './tweetPage/Reply';
import { getSingleTweet } from 'src/redux/selectors/selectors';

export const ModalQuotePage = () => {
  
  const tweet = useSelector(getSingleTweet);
    console.log(tweet);
    const post = tweet?.singleTweet || [];
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal title="" isOpen={isOpen} setIsOpen={setIsOpen}>
        {!Array.isArray(post) && <TweetPost tweet={post} />}
        <Reply id={post.id} isOpen={isOpen} setIsOpen={setIsOpen} type="quoteModal"/>
      </Modal>
    );
}


export default ModalQuotePage;