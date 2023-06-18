package app.service;

import app.enums.TweetType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.exceptions.tweetError.TweetPermissionException;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Primary
@Log4j2
@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {

  private final TweetModelRepository tweetRepository;
  private final UserService userService;
  private final CloudinaryService cloudinaryService;
  private final AttachmentImagesService attachmentImagesService;


  @Transactional
  public Tweet createTweet(Long userId, String tweetBody, MultipartFile[] files, TweetType tweetType, Long parentTweetId) {
    if (files == null) files = new MultipartFile[0];

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
  public void deleteTweet(Long userId, Long tweetId) {
    Tweet tweet = getTweet(tweetId);
    if (!tweet.getUser().getId().equals(userId)) throw new TweetPermissionException(tweetId);
    delete(tweet);
    cloudinaryService.deleteTweetImages(userId, tweetId);
  }


  public Integer getCountReplies(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.REPLY);
  }


  public Integer getCountQuoteTweets(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.QUOTE_TWEET);
  }


  public Integer getCountRetweetTweets(Tweet tweet) {
    return tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.RETWEET);
  }


  public Page<Tweet> getTweetsByUserId(Long userId, List<TweetType> tweetTypes, Pageable pageable) {
    return tweetRepository.findByUserAndTweetTypeInOrderByCreatedAtDesc(
      userService.getUser(userId), tweetTypes, pageable);
  }


  public Page<Tweet> getTweetsOfTweet(Long tweetId, TweetType tweetType, Pageable pageable) {
    return tweetRepository.findByParentTweetAndTweetTypeOrderByCreatedAtDesc(getTweet(tweetId), tweetType, pageable);
  }


  public Page<Tweet> getAllTweets(Pageable pageable) {
    return tweetRepository.findByTweetTypeNotOrderByCreatedAtDesc(TweetType.REPLY, pageable);
  }


  public Page<Tweet> getTweetsFromSubscriptions(Long userId, Pageable pageable) {
    return tweetRepository
      .findAllByUser_FollowersContainingAndTweetTypeNotOrderByCreatedAtDesc(userService.getUser(userId), TweetType.REPLY, pageable);
  }

  public boolean isUserTweetedTweet(UserModel currUser, Tweet tweet, TweetType tweetType) {
    return tweetRepository.existsByUserAndParentTweetAndTweetType(currUser, tweet, tweetType);
  }
}
