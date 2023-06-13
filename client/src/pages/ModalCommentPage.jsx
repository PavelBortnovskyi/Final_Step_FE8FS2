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

  console.log(post);

  return (
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
  );
}

export default ModalCommentPage;
