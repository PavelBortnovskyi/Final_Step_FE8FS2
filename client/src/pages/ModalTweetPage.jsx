import React, { useState } from 'react'
import { Modal } from 'src/components/Modal/Modal'
import TweetBox from 'src/components/TweetBox/TweetBox'

export const ModalTweetPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal title="Enter your tweet:" isOpen={isOpen} setIsOpen={setIsOpen}>
        <TweetBox isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Modal>
  )
}
