import app.enums.TweetType;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetModelRepository;
import app.service.AttachmentImagesService;
import app.service.CloudinaryService;
import app.service.TweetService;
import app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class TweetServiceTest {
  @Mock
  private TweetModelRepository tweetRepository;

  @InjectMocks
  private TweetService tweetService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }



  @Test
  public void getTweet_WithExistingTweetId_ReturnsTweet() {
    // Mock repository behavior
    Long tweetId = 1L;
    Tweet tweet = new Tweet();
    when(tweetRepository.findTweetById(tweetId)).thenReturn(Optional.of(tweet));


    // Perform the test
    Tweet retrievedTweet = tweetService.getTweet(tweetId);

    // Verify the result
    assertThat(retrievedTweet).isEqualTo(tweet);

    verify(tweetRepository).findTweetById(tweetId);
  }


  @Test
  public void getCounts() {
    // Mock repository behavior
    Tweet tweet = new Tweet();
    when(tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.REPLY)).thenReturn(3);
    when(tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.QUOTE_TWEET)).thenReturn(4);
    when(tweetRepository.countByParentTweetAndTweetType(tweet, TweetType.RETWEET)).thenReturn(5);

    // Perform the test
    Integer countByParentTweet = tweetService.getCountReplies(tweet);
    Integer countQuoteTweets = tweetService.getCountQuoteTweets(tweet);
    Integer countRetweetTweets = tweetService.getCountRetweetTweets(tweet);

    // Verify the result
    assertThat(countByParentTweet).isEqualTo(3);
    assertThat(countQuoteTweets).isEqualTo(4);
    assertThat(countRetweetTweets).isEqualTo(5);

    verify(tweetRepository).countByParentTweetAndTweetType(tweet, TweetType.REPLY);
  }

  @Test
  public void createTweet(){
    Tweet tweet = new Tweet();
    tweet.setBody("testTweet");
    when(tweetRepository.findTweetById(1L)).thenReturn(Optional.of(tweet));
    assertThat(tweetService.getTweet(1L)).isEqualTo(tweet);
  }
}