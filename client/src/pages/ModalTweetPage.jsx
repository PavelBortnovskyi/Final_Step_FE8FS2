import React from 'react'
import { Modal } from 'src/components/Modal/Modal'
import TweetBox from 'src/components/TweetBox/TweetBox'

export const ModalTweetPage = () => {
  return (
    <Modal title="X">
        <TweetBox/>
    </Modal>
  )
}
