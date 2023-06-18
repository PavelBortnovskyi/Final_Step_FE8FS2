// import { Box, Grid, Typography } from '@mui/material';
// import React, { useEffect } from 'react';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link } from 'react-router-dom';
// import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
// import TweetPost from 'src/UI/TweetPost';
// import CommentsList from 'src/components/Comments/CommentsList';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTweetByID, getTweetReplies } from 'src/redux/selectors/selectors';
// import { getTweetById } from 'src/redux/thunk/getTweetById';

// import Retweet from './Retweet';
// import { useMode } from 'src/styles/_materialTheme';
// import { getTweetReply } from 'src/redux/thunk/getTweetReply';

// function TweetPage() {
//   const { id } = useParams();
//   const user = useSelector((state) => state.user.user) || '';
//   const dispatch = useDispatch();

//   const theme = useMode();
//   //getting single tweet
//   useEffect(() => {
//     dispatch(getTweetById(id));
//   }, [id]);
//   const tweet = useSelector(getTweetByID);
//   const post = tweet.tweet;

//   useEffect(() => {
//     dispatch(getTweetReply({ id: id, page: 0, pageSize: 10 }));
//     console.log('get replies');
//   }, [id]);

//   let dataReplies = useSelector(getTweetReplies);
//   const tweetsReplies = dataReplies.tweetReplies.content || [];

//   console.log(dataReplies);
//   console.log(tweetsReplies);
//   return (
//     <Box
//       sx={{
//         borderLeft: {
//           xs: 'none',
//           sm: `1px solid ${theme.palette.border.main}`,
//         },
//         borderRight: {
//           xs: 'none',
//           sm: `1px solid ${theme.palette.border.main}`,
//         },
//       }}
//     >
//       {/* back to home page */}
//       <Link to="/">
//         <Box
//           sx={{
//             color: `${theme.palette.text.primary}`,
//             pt: '15px',
//             display: 'flex',
//             gap: '10px',
//             alignItems: 'center',
//           }}
//         >
//           <ArrowBackIcon />
//           <Typography variant="h6" fontWeight={800}>
//             Tweet
//           </Typography>
//         </Box>
//       </Link>

//       {post && (
//         <TweetPost
//           showIconList={false}
//           id={post.id}
//           displayName={post.user.fullName}
//           text={post.body}
//           username={post.user.userTag}
//           logoUrl={post.user.avatarImgUrl}
//           verified={post.user.isVerified}
//           images={post.attachmentImages}
//           likes={post.countLikes}
//           reply={post.countReplays}
//           retweet={post.countRetweets}
//         />
//       )}
//       <Grid
//         container
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           borderBottom: `1px solid ${theme.palette.border.main}`,
//           pb: '20px',
//         }}
//       >
//         {post && (
//           <PostIconList
//             likes={post.countLikes}
//             reply={post.countReply}
//             retweet={post.countRetweets}
//           />
//         )}
//       </Grid>
//       <Retweet />
//       {/* {tweetsReplies &&
//         tweetsReplies.map((post) => (
//           <TweetPost
//             showIconList={false}
//             id={post.id}
//             displayName={post.user.fullName}
//             text={post.body}
//             username={post.user.userTag}
//             logoUrl={post.user.avatarImgUrl}
//             verified={post.user.isVerified}
//             images={post.attachmentImages}
//             likes={post.countLikes}
//             reply={post.countReplays}
//             retweet={post.countRetweets}
//           />
//         ))} */}
//     </Box>
//   );
// }

// export default TweetPage;

import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import PostIconList from 'src/components/Post/PostIconGroup/PostIconList';
import TweetPost from 'src/UI/tweet/TweetPost';
import CommentsList from 'src/components/Comments/CommentsList';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetByID, getTweetReplies } from 'src/redux/selectors/selectors';
import { getTweetById } from 'src/redux/thunk/getTweetById';

import Retweet from './Retweet';
import { useMode } from 'src/styles/_materialTheme';
import { getTweetReply } from 'src/redux/thunk/getTweetReply';

function TweetPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const theme = useMode();
  // getting single tweet
  useEffect(() => {
    dispatch(getTweetById(id));
  }, [id]);
  const tweet = useSelector(getTweetByID);
  const post = tweet.tweet;

  const [a, setA] = useState([]);

  useEffect(() => {
    dispatch(getTweetReply({ id: id, page: 0, pageSize: 10 }));
    console.log('get replies');
  }, [id]);

  let dataReplies = useSelector(getTweetReplies);
  // const tweetsReplies = dataReplies.tweetReplies || [];

  // useEffect(() => {
  //   setA(dataReplies.tweetReplies.content);
  // }, [a]);
  // console.log(a);

  return (
    <Box
      sx={{
        borderLeft: {
          xs: 'none',
          sm: `1px solid ${theme.palette.border.main}`,
        },
        borderRight: {
          xs: 'none',
          sm: `1px solid ${theme.palette.border.main}`,
        },
      }}
    >
      {/* back to home page */}
      <Link to="/">
        <Box
          sx={{
            color: `${theme.palette.text.primary}`,
            pt: '15px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <ArrowBackIcon />
          <Typography variant="h6" fontWeight={800}>
            Tweet
          </Typography>
        </Box>
      </Link>

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
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
          pb: '20px',
        }}
      >
        {post && (
          <PostIconList
            likes={post.countLikes}
            reply={post.countReply}
            retweet={post.countRetweets}
          />
        )}
      </Grid>
      <Retweet />
      {/* {tweetsReplies &&
        tweetsReplies.content &&
        tweetsReplies.content.map((post) => (
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
        ))} */}
    </Box>
  );
}

export default TweetPage;
