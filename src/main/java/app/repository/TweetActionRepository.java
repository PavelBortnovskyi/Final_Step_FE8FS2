package app.repository;


import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetActionRepository extends RepositoryInterface<TweetAction> {
  @Query("SELECT t.tweet.id FROM TweetAction t WHERE t.actionType = :actionType AND t.user.id = :userId")
  Page<Long> findTweetIdsByActionTypeAndUserId(String actionType, Long userId, Pageable pageable);

  @Query("SELECT ta FROM TweetAction ta WHERE ta.tweet.id = :tweetId AND ta.user.id = :userId AND ta.actionType = :actionType")
  TweetAction findByTweetIdAndUserIdAndActionType(@Param("tweetId") Long tweetId, @Param("userId") Long userId, @Param("actionType") TweetActionType actionType);

  @Query("SELECT COUNT(ta) FROM TweetAction ta WHERE ta.tweet.id = :tweetId AND ta.actionType = :actionType")
  Integer countByTweetIdAndActionType(@Param("tweetId") Long tweetId, @Param("actionType") TweetActionType actionType);

  @Query("SELECT t.tweet FROM TweetAction t WHERE t.actionType = 'TWEET_BOOKMARK' AND t.user.id = :userId")
  List<Tweet> findTweetsByActionTypeAndUserId(Long userId);

}





