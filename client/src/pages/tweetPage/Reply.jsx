import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createTweetReply } from 'src/redux/thunk/tweets/replyTweet';
import TweetBox from 'src/components/TweetBox/TweetBox';
import { addQuote } from 'src/redux/thunk/tweets/addQuote';

function Reply({ isOpen, setIsOpen, id, type}) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user) || '';
  const dispatch = useDispatch();

  const handleSubmit = (postInputText, postImages) => {
    if (type === "replay") {
      dispatch(createTweetReply({ id, postInputText, postImages }));
    } else if (type === "quoteModal") {
      dispatch(addQuote({ id, postInputText, postImages }));
      setIsOpen(false);
      !!location.state ? navigate(-1) : navigate('/');
    } else if (type === "replayModal") {
      dispatch(createTweetReply({ id, postInputText, postImages }));
      setIsOpen(false);
      !!location.state ? navigate(-1) : navigate('/');
    };
  }

  return (
    <TweetBox
      placeholder="Tweet your reply"
      fnc={handleSubmit}
      userAvatar={user.avatarImgUrl}
    />
  );
}

export default Reply;