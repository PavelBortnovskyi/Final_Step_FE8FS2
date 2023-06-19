import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import TweetBox from 'src/components/TweetBox/TweetBox';

function Retweet() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const handleSubmitRetweet = (postInputText, postImages) => {
    console.log('is working');
    dispatch(createTweetReply({ id, postInputText, postImages }));
  };

  return (
    <TweetBox
      placeholder="Tweet your reply"
      fnc={handleSubmitRetweet}
      userAvatar={user.avatarImgUrl}
    />
  );
}

export default Retweet;

// <Box>
//   <Box
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     }}
//   >
//     <InputAvatar
//       value={postInputText}
//       avatarUrl={user.avatarImgUrl}
//       placeholder="Tweet your reply"
//       feature={handleInput}
//     />
//     <Box mr="10px">
//       <TweetButton
//         isDisabled={
//           postInputText.length === 0 && postImages.length === 0
//             ? true
//             : false
//         }
//         text="Reply"
//         fnc={handleSubmit}
//       />
//     </Box>
//   </Box>
//   <CreatePostBar
//     handleFileSelect={handleFileSelect}
//     handleEmojiSelect={handleEmojiSelect}
//   />
// </Box>
