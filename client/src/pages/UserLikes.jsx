// UserLikes

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserLikes } from 'src/redux/thunk/getUserLikes';

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
