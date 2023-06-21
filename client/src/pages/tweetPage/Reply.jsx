import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import TweetBox from 'src/components/TweetBox/TweetBox';

function Reply({ isOpen, setIsOpen, id }) {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const handleSubmitRetweet = (postInputText, postImages) => {
    dispatch(createTweetReply({ id, postInputText, postImages }));
    setIsOpen(false);
    !!location.state ? navigate(-1) : navigate('/');
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
