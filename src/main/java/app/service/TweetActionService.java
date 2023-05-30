package app.service;

import app.enums.TweetActionType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.TweetAction;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;


@Service
@RequiredArgsConstructor
public class TweetActionService extends GeneralService<TweetAction> {
  private final UserModelService userModelService;
  private final TweetModelRepository tweetModelRepository;
  private final TweetActionRepository tweetActionRepository;

  public TweetAction add(Long tweetId, HttpServletRequest request, TweetActionType tweetActionType) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId"));
    TweetAction tweetAction = new TweetAction();
    tweetAction.setActionType(tweetActionType);
    tweetAction.setTweet(tweetModelRepository.findById(tweetId).orElseThrow(() -> new TweetIsNotFoundException(tweetId)));
    tweetAction.setUser(user);
    TweetAction savedAction = tweetActionRepository.save(tweetAction);
    return savedAction;
  }

  public Boolean addLike(Long tweetId, HttpServletRequest request) {
    if (!statusLike(tweetId, request)){
      add(tweetId, request, TweetActionType.LIKE);
      return true;
    }else{
      delete(tweetActionRepository.findByTweetIdAndUserIdAndActionType(tweetId,
          userModelService.getUser((Long) request.getAttribute("userId")).getId(), TweetActionType.LIKE));
    }
    return false;

  }

  public TweetAction addRetweet(Long tweetId, HttpServletRequest request) {
    return add(tweetId, request, TweetActionType.RETWEET);
  }

  public Boolean addBookmark(Long tweetId, HttpServletRequest request) {
    if (!statusBookmark(tweetId, request)){
      add(tweetId, request, TweetActionType.BOOKMARK);
      return true;
    }else{
      delete(tweetActionRepository.findByTweetIdAndUserIdAndActionType(tweetId,
          userModelService.getUser((Long) request.getAttribute("userId")).getId(), TweetActionType.BOOKMARK));
    }
    return false;
  }

  public Integer getCount(Long tweetId, TweetActionType tweetActionType) {
    return tweetActionRepository.getCountByTweetIdAndActionType(tweetId, tweetActionType);
  }

  public Integer getCountLikes(Long tweetId) {
    return getCount(tweetId, TweetActionType.LIKE);
  }

  public Integer getCountBookmarks(Long tweetId) {
    return getCount(tweetId, TweetActionType.BOOKMARK);
  }

  public Integer getCountRetweet(Long tweetId) {
    return getCount(tweetId, TweetActionType.RETWEET);
  }

  public void deleteLike(Long tweetId, HttpServletRequest request) {
    delete(tweetActionRepository.findByTweetIdAndUserIdAndActionType(tweetId,
      userModelService.getUser((Long) request.getAttribute("userId")).getId(),
      TweetActionType.LIKE));
  }

  public void deleteRetweet(Long tweetId, HttpServletRequest request) {
    delete(tweetActionRepository.findByTweetIdAndUserIdAndActionType(tweetId,
      userModelService.getUser((Long) request.getAttribute("userId")).getId(),
      TweetActionType.RETWEET));
  }

  public void deleteBookmark(Long tweetId, HttpServletRequest request) {
    delete(tweetActionRepository.findByTweetIdAndUserIdAndActionType(tweetId,
      userModelService.getUser((Long) request.getAttribute("userId")).getId(),
      TweetActionType.BOOKMARK));
  }

  public boolean statusLike(Long tweetId, HttpServletRequest request){
    if (tweetActionRepository.countByActionTypeAndUserIdAndTweetId(TweetActionType.LIKE,
            userModelService.getUser((Long) request.getAttribute("userId")).getId(),
            tweetId) == 0) return false;
    else return true;

  }

  public boolean statusBookmark(Long tweetId, HttpServletRequest request){
    if (tweetActionRepository.countByActionTypeAndUserIdAndTweetId(TweetActionType.BOOKMARK,
            userModelService.getUser((Long) request.getAttribute("userId")).getId(),
            tweetId) == 0) return false;
    else return true;

  }
}
