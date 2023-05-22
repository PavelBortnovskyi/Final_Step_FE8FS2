package app.service;

import app.enums.TweetActionType;
import app.exceptions.userError.NotFoundExceptionException;
import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TweetActionService extends GeneralService<TweetAction> {
    private final TweetActionRepository tweetActionRepository;
    private final TweetModelRepository tweetModelRepository;
    private final UserModelRepository userModelRepository;

    public void add(Long tweetId, Long userId, TweetActionType tweetActionType) {
        TweetAction tweetAction = new TweetAction();
        tweetAction.setTweet(tweetModelRepository.getById(tweetId));
        tweetAction.setUser(userModelRepository.getById(userId));
        tweetAction.setActionType(tweetActionType);
        tweetActionRepository.save(tweetAction);
    }

    public void addLikeToTweet(Long tweetId, Long userId) {
        add(tweetId, userId, TweetActionType.LIKE);
    }

    public void addBookmark(Long tweetId, Long userId) {
        add(tweetId, userId, TweetActionType.BOOKMARK);
    }

    public void addRetweet(Long tweetId, Long userId) {
        add(tweetId, userId, TweetActionType.BOOKMARK);
    }

    public Integer getCountLikes(Long tweetId) {
        return tweetActionRepository.getTweetByTweetAction(TweetActionType.LIKE, tweetId).size();
    }

    public Integer getCountBookmarks(Long tweetId){
        return tweetActionRepository.getTweetByTweetAction(TweetActionType.BOOKMARK, tweetId).size();
    }
}
