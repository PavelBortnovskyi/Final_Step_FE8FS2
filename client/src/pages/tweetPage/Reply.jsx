import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import TweetBox from 'src/components/TweetBox/TweetBox';

function Reply() {
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

export default Reply;
