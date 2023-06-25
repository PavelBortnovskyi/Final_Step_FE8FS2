import React, { useState } from 'react'
import { Modal } from 'src/components/Modal/Modal'
import Reply from './tweetPage/Reply';
import TweetBox from 'src/components/TweetBox/TweetBox'

export const ModalTweetPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal title="Enter your tweet:" isOpen={isOpen} setIsOpen={setIsOpen}>
    <Reply
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="createTweet"
      />
        {/* <TweetBox isOpen={isOpen} setIsOpen={setIsOpen}/> */}
    </Modal>
  )
}
