package app.facade;

import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.model.Tweet;
import app.model.UserModel;
import app.service.CurrUserService;
import app.service.TweetActionService;
import app.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TweetFacade extends GeneralFacade<Tweet, Void, TweetResponseDTO> {

  private final TweetService tweetService;
  private final TweetActionService tweetActionService;
  private final CurrUserService currUserService;


  private TweetResponseDTO setCustomFields(TweetResponseDTO tweetResponseDTO, UserModel currUser) {
    if (tweetResponseDTO == null) return null;
    Tweet tweet = tweetService.getTweet(tweetResponseDTO.getId());
    tweetResponseDTO
      .setCountReplies(tweetService.getCountReplies(tweet))
      .setCountQuoteTweets(tweetService.getCountQuoteTweets(tweet))
      .setCountRetweets(tweetService.getCountRetweetTweets(tweet))
      .setCountLikes(tweetActionService.getCountLikes(tweet))
      .setCountBookmarks(tweetActionService.getCountBookmarks(tweet))
      .setCurrUserLiked(tweetActionService.isUserActionTweet(currUser, tweet, TweetActionType.LIKE))
      .setCurrUserBookmarked(tweetActionService.isUserActionTweet(currUser, tweet, TweetActionType.BOOKMARK))
      .setCurrUserRetweeted(tweetService.isUserTweetedTweet(currUser, tweet, TweetType.RETWEET))
      .setCurrUserCommented(tweetService.isUserTweetedTweet(currUser, tweet, TweetType.REPLY))
      .setCurrUserQuoted(tweetService.isUserTweetedTweet(currUser, tweet, TweetType.QUOTE_TWEET));
    setCustomFields(tweetResponseDTO.getParentTweet(), currUser);
    return tweetResponseDTO;
  }


  @Override
  public TweetResponseDTO convertToDto(Tweet tweet) {
    return setCustomFields(super.convertToDto(tweet), currUserService.getCurrUser());
  }


  public TweetResponseDTO createTweet(Long userId, String tweetBody, MultipartFile[] attachmentImages, TweetType tweetType, Long parentTweetId) {
    return convertToDto(tweetService
      .createTweet(userId, tweetBody, attachmentImages, tweetType, parentTweetId));
  }


  public TweetResponseDTO getTweetById(Long tweetId) {
    return convertToDto(tweetService.getTweet(tweetId));
  }


  public void deleteTweet(Long userId, Long tweetId) {
    tweetService.deleteTweet(userId, tweetId);
  }


  public TweetResponseDTO createTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    return convertToDto(tweetActionService
      .createTweetAction(userId, tweetId, tweetActionType).getTweet());
  }


  public TweetResponseDTO removeTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType) {
    return convertToDto(tweetActionService
      .removeTweetAction(userId, tweetId, tweetActionType).getTweet());
  }


  public Page<TweetResponseDTO> getTweetsByUserId(Long userId, List<TweetType> tweetTypes, Pageable pageable) {
    return tweetService.getTweetsByUserId(userId, tweetTypes, pageable).map(this::convertToDto);
  }


  public Page<TweetResponseDTO> getTweetsOfTweet(Long tweetId, TweetType tweetType, Pageable pageable) {
    return tweetService.getTweetsOfTweet(tweetId, tweetType, pageable).map(this::convertToDto);
  }


  public Page<TweetResponseDTO> getAllTweets(Pageable pageable) {
    return tweetService.getAllTweets(pageable).map(this::convertToDto);
  }


  public Page<TweetResponseDTO> getTweetsFromSubscriptions(Long userId, Pageable pageable) {
    return tweetService.getTweetsFromSubscriptions(userId, pageable).map(this::convertToDto);
  }

}
