import React, { useState } from 'react';
import TweetPost from 'src/UI/tweet/TweetPost';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getTweetByID, getUserData } from 'src/redux/selectors/selectors';
import { useLocation, useNavigate } from 'react-router-dom';

function ModalCommentPage() {
  const tweet = useSelector(getTweetByID);
  console.log(tweet);
  const post = tweet.tweet;
  const user = useSelector(getUserData || '');
console.log(post);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal title="" isOpen={isOpen} setIsOpen={setIsOpen}>
      {post && (
        <TweetPost
          showIconList={false}
          id={post.id}
          displayName={post.user.fullName}
          text={post.body}
          username={post.user.userTag}
          logoUrl={post.user.avatarImgUrl}
          verified={post.user.isVerified}
          images={post.attachmentImages}
          likes={post.countLikes}
          reply={post.countReplays}
          retweet={post.countRetweets}
        />
      )}
      <TweetBox placeholder="Tweet your reply" id={post.id} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Modal>
  );
}

export default ModalCommentPage;
