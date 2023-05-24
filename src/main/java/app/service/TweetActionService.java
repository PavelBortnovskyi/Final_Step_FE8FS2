package app.service;

import app.dto.rs.TweetActionResponse;
import app.enums.TweetActionType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TweetActionService extends GeneralService<TweetAction> {
    private final UserModelService userModelService;
    private final TweetModelRepository tweetModelRepository;
    private final TweetActionRepository tweetActionRepository;
    public TweetAction add(Long tweetId, HttpServletRequest request, TweetActionType tweetActionType){
        UserModel user = userModelService.getUser((Long) request.getAttribute("userId"));
        TweetAction tweetAction = new TweetAction();
        tweetAction.setActionType(tweetActionType);
        tweetAction.setTweet(tweetModelRepository.findById(tweetId).orElseThrow(() -> new TweetIsNotFoundException(tweetId)));
        tweetAction.setUser(user);
        TweetAction savedAction = tweetActionRepository.save(tweetAction);
        return savedAction;
    }
    public TweetActionResponse addLike(Long tweetId, HttpServletRequest request){
        TweetAction tweetAction = add(tweetId, request, TweetActionType.LIKE);
        TweetActionResponse response = new TweetActionResponse();


        response.setTweetId(tweetAction.getTweet().getId());
        response.setActionType(tweetAction.getActionType());
        response.setUserId(tweetAction.getUser().getId());
        return response;
    }

    public TweetAction addRetweet(Long tweetId, HttpServletRequest request){
        return add(tweetId, request, TweetActionType.RETWEET);
    }

    public TweetActionResponse addBookmark(Long tweetId, HttpServletRequest request){
        TweetAction tweetAction = add(tweetId, request, TweetActionType.BOOKMARK);
        TweetActionResponse response = new TweetActionResponse();


        response.setTweetId(tweetAction.getTweet().getId());
        response.setActionType(tweetAction.getActionType());
        response.setUserId(tweetAction.getUser().getId());
        return response;
    }

    public List<Tweet> getAllBookmarks(HttpServletRequest request){
        return tweetActionRepository.findTweetsByActionTypeAndUserId((Long) request.getAttribute("userId"));
    }

    public Integer getCount(Long tweetId, TweetActionType tweetActionType){
        return tweetActionRepository.countByTweetIdAndActionType(tweetId, tweetActionType.toString());
    }

    public Integer getCountLikes(Long tweetId){
        return getCount(tweetId, TweetActionType.LIKE);
    }

    public Integer getCountBookmarks(Long tweetId){
        return getCount(tweetId, TweetActionType.BOOKMARK);
    }

    public Integer getCountRetweet(Long tweetId){
        return getCount(tweetId, TweetActionType.RETWEET);
    }


    //deleteLike
    //deleteRetweet
    //deleteBookmarks


}
