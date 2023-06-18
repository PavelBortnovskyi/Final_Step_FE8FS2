import React from 'react';
import TweetPost from 'src/UI/TweetPost';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { Modal } from 'src/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getTweetByID } from 'src/redux/selectors/selectors';

function ModalCommentPage() {
  const tweet = useSelector(getTweetByID);
  const post = tweet.tweet;
  const user = useSelector((state) => state.user.user) || '';

  return (
    <Modal title="">
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
      <TweetBox placeholder="Tweet your reply" />
    </Modal>
  );
}

export default ModalCommentPage;
