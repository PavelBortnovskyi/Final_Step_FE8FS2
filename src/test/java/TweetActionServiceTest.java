import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import app.repository.TweetActionRepository;
import app.service.TweetActionService;
import app.service.TweetService;
import app.service.UserService;
import org.junit.jupiter.api.Test;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class TweetActionServiceTest {
  private TweetActionRepository tweetActionRepository = mock(TweetActionRepository.class);
  private UserService userService = mock(UserService.class);
  private TweetService tweetService = mock(TweetService.class);
  private TweetActionService tweetActionService = new TweetActionService(tweetActionRepository,tweetService, userService);



  @Test
  void testCreateTweetAction_AlreadyExists() {
    Long userId = 1L;
    Long tweetId = 1L;
    TweetActionType actionType = TweetActionType.LIKE;
    TweetAction tweetAction = new TweetAction();

    when(userService.getUser(userId)).thenReturn(new UserModel());
    when(tweetService.getTweet(tweetId)).thenReturn(new Tweet());
    when(tweetActionRepository.getByUserAndTweetAndActionType(any(), any(), any())).thenReturn(Optional.of(tweetAction));

    TweetAction result = tweetActionService.createTweetAction(userId, tweetId, actionType);

    assertThat(result).isEqualTo(tweetAction);
    verify(userService).getUser(userId);
    verify(tweetService).getTweet(tweetId);
    verify(tweetActionRepository).getByUserAndTweetAndActionType(any(), any(), any());
  }

  @Test
  void testGetCountLikes() {
    Tweet tweet = new Tweet();

    when(tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.LIKE)).thenReturn(10);

    Integer result = tweetActionService.getCountLikes(tweet);

    assertThat(result).isEqualTo(10);
    verify(tweetActionRepository).countAByTweetAndActionType(tweet, TweetActionType.LIKE);
  }

  @Test
  void testGetCountBookmarks() {
    Tweet tweet = new Tweet();

    when(tweetActionRepository.countAByTweetAndActionType(tweet, TweetActionType.BOOKMARK)).thenReturn(5);

    Integer result = tweetActionService.getCountBookmarks(tweet);

    assertThat(result).isEqualTo(5);
    verify(tweetActionRepository).countAByTweetAndActionType(tweet, TweetActionType.BOOKMARK);
  }

  @Test
  void testGetActionsByUser() {
    UserModel user = new UserModel();
    TweetActionType actionType = TweetActionType.LIKE;
    Pageable pageable = mock(Pageable.class);
    Page<TweetAction> page = mock(Page.class);

    when(tweetActionRepository.findAllByUserAndActionTypeOrderByCreatedAtDesc(user, actionType, pageable)).thenReturn(page);

    Page<TweetAction> result = tweetActionService.getActionsByUser(user, actionType, pageable);

    assertThat(result).isEqualTo(page);
    verify(tweetActionRepository).findAllByUserAndActionTypeOrderByCreatedAtDesc(user, actionType, pageable);
  }

  @Test
  void testIsUserActionTweet() {
    UserModel currUser = new UserModel();
    Tweet tweet = new Tweet();
    TweetActionType actionType = TweetActionType.LIKE;

    when(tweetActionRepository.existsByUserAndTweetAndActionType(currUser, tweet, actionType)).thenReturn(true);

    boolean result = tweetActionService.isUserActionTweet(currUser, tweet, actionType);

    assertThat(result).isTrue();
    verify(tweetActionRepository).existsByUserAndTweetAndActionType(currUser, tweet, actionType);
  }
}