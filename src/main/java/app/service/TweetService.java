package app.service;

import app.enums.TweetActionType;
import app.enums.TweetType;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.model.AttachmentImage;
import app.model.Tweet;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Set;

@Primary
@Log4j2
@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet>{

  private final TweetModelRepository tweetRepository;
  private final UserService userService;
  private final CloudinaryService cloudinaryService;
  private final AttachmentImagesService attachmentImagesService;

  public Tweet getTweet(Long tweetId){
    return tweetRepository.findTweetById(tweetId).orElseThrow(() -> new TweetIsNotFoundException(tweetId));
  }

  //@Transactional
  public Tweet create(Long userId, String tweetBody, ArrayList<MultipartFile> files, TweetType tweetType, Long parentTweetId){
    Tweet tweet = new Tweet();
    if (parentTweetId != null) tweet.setParentTweet(getTweet(parentTweetId));
    tweet.setUser(userService.getUser(userId));
    tweet.setBody(tweetBody);
    tweet.setTweetType(tweetType);
    //Tweet savedTweet =
    save(tweet);
    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ------------------  " + tweet.getId());
    attachmentImagesService.saveAttachmentImages(cloudinaryService.uploadTweetImages(files, userId, tweet.getId()), tweet);

    System.out.println(getTweet(tweet.getId()).getAttachmentImages().size());
    System.out.println(getTweet(tweet.getId()).getId());

    return getTweet(tweet.getId());
  }

  public Integer getCountReplays(Tweet tweet){
    return tweetRepository.countByParentTweetIdAndTweetType(tweet.getId(), TweetType.REPLY);
  }

  public Integer getCountQuoteTweets(Tweet tweet){
    return tweetRepository.countByParentTweetIdAndTweetType(tweet.getId(), TweetType.QUOTE_TWEET);
  }

}
