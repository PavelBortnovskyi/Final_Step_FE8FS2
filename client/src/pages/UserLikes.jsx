// UserLikes

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonSubscribe } from 'src/components/User/ButtonSubscribe';
import { User } from 'src/components/User/User';
import { getUserBiId } from 'src/redux/thunk/getUserBiId';
import { Link, useParams } from 'react-router-dom';
import PostList from 'src/components/Post/PostList';
import { LinkToEditProfile } from 'src/components/User/LinkToEditProfile';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';
import Post from 'src/components/Post/Post';
import TweetPost from 'src/UI/tweet/TweetPost';
import { useMode } from 'src/styles/_materialTheme';
import TweetList from 'src/UI/TweetList';

export const UserLikes = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = id;
  useEffect(() => {
    dispatch(getUserLikes(userId));
  }, [dispatch, userId]);
  const userLikes = useSelector((state) => state.userLikes.userLikes) || [];

  const likes = userLikes.content;
  const theme = useMode();

  return (
    likes && <TweetList tweets={likes} />
    // us &&
    // us.map((likeTweet) => {
    //   return (
    //     <Box
    //       key={likeTweet.tweet.id}
    //       sx={{
    //         borderBottom: `1px solid ${theme.palette.border.main}`,
    //         transition: 'background-color 0.3s ease',
    //         '&:hover': {
    //           backgroundColor: `${theme.palette.background.hover}`,
    //           cursor: 'pointer',
    //         },
    //       }}
    //     >
    //       <Link to={`/tweet/${likeTweet.tweet.id}`}>
    //         <TweetPost
    //           showIconList={true}
    //           id={likeTweet.tweet.id}
    //           displayName={likeTweet.tweet.user.fullName}
    //           text={likeTweet.tweet.body}
    //           username={likeTweet.tweet.user.userTag}
    //           logoUrl={likeTweet.tweet.user.avatarImgUrl}
    //           verified={likeTweet.tweet.user.isVerified}
    //           images={likeTweet.tweet.attachmentImages}
    //           likes={likeTweet.tweet.countLikes}
    //           reply={likeTweet.tweet.countReplays}
    //           retweet={likeTweet.tweet.countRetweets}
    //           isLiked={likeTweet.tweet.currUserLiked}
    //           isRetweet={likeTweet.tweet.countRetweets}
    //           isComment={likeTweet.tweet.countReplays}
    //         />
    //       </Link>
    //     </Box>
    //   );
    // })
  );
};
// <>
// asd
{
  /* <Box
        sx={{
          display: 'flex',

          direction: 'column',
        }}
      >
        <User
          lincToFollowers={lincToFollowers}
          lincToFollowings={lincToFollowings}
          userButton={subscribe}
          fullName={user.fullName}
          tweetsCounter={user.countUserTweets}
          hederImg={user.headerImgUrl}
          userAvatar={user.avatarImgUrl}
          userTag={user.userTag}
          userBio={user.bio}
          userLocation={user.location}
          createdAt={user.createdAt}
          countUserFollowings={user.countUserFollowings}
          countUserFollowers={user.countUserFollowers}
        />
      </Box> */
}

{
  /* <Post
        showIconList={false}
        id={userLikes.id}
        displayName={userLikes.user.fullName}
        text={userLikes.body}
        username={userLikes.user.userTag}
        logoUrl={userLikes.user.avatarImgUrl}
        verified={userLikes.user.isVerified}
        images={userLikes.attachmentImages}
        likes={userLikes.countLikes}
        reply={userLikes.countReplays}
        retweet={userLikes.countRetweets}
        isLiked={userLikes.currUserLiked}
        isRetweet={userLikes.countRetweets}
        isComment={userLikes.countReplays}
      /> */
}
{
  /* </> */
}
// );
