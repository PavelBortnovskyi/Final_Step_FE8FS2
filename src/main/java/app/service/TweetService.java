package app.service;

import app.enums.TweetActionType;
import app.enums.TweetType;
import app.exceptions.tweetError.TweetPermissionException;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.Tweet;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Primary
@Log4j2
@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {

  private final TweetModelRepository tweetRepository;
  private final UserService userService;
  private final CloudinaryService cloudinaryService;
  private final AttachmentImagesService attachmentImagesService;
  private final TweetActionService tweetActionService;


  @Transactional
  public Tweet createTweet(Long userId, String tweetBody, ArrayList<MultipartFile> files, TweetType tweetType, Long parentTweetId) {
    Tweet tweet = new Tweet();

    if (parentTweetId != null) tweet.setParentTweet(getTweet(parentTweetId));
    tweet
      .setUser(userService.getUser(userId))
      .setBody(tweetBody)
      .setTweetType(tweetType);

    save(tweet)
      .getAttachmentImages()
      .addAll(attachmentImagesService
        .saveAttachmentImages(cloudinaryService
          .uploadTweetImages(files, userId, tweet.getId()), tweet));

    return tweet;
  }


  public Tweet getTweet(Long tweetId) {
    return tweetRepository.findTweetById(tweetId).orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }


  @Transactional
  public void deleteTweet(Long userId, Long tweetId){
    Tweet tweet = getTweet(tweetId);
    if (!tweet.getUser().getId().equals(userId)) throw new TweetPermissionException(tweetId);
    delete(tweet);
    cloudinaryService.deleteTweetImages(userId, tweetId);
  }


  @Transactional
  public Tweet createTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType){
    return tweetActionService.createTweetAction(userService.getUser(userId), getTweet(tweetId), tweetActionType)
      .getTweet();
  }


  @Transactional
  public Tweet removeTweetAction(Long userId, Long tweetId, TweetActionType tweetActionType){
    return tweetActionService.removeTweetAction(userService.getUser(userId), getTweet(tweetId), tweetActionType)
      .getTweet();
  }


  public Integer getCountReplays(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.REPLY);
  }


  public Integer getCountQuoteTweets(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.QUOTE_TWEET);
  }


  public Integer getCountRetweetTweets(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.RETWEET);
  }


  public Page<Tweet> getAllTweetByUserId(Long userId, int page, int size){
    return tweetRepository.findByUserAndTweetTypeNotOrderByCreatedAtDesc(
      userService.getUser(userId), TweetType.REPLY, PageRequest.of(page, size));
  }
}
