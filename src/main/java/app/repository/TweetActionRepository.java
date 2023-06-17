package app.repository;


import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TweetActionRepository extends RepositoryInterface<TweetAction> {

  @Query("SELECT ta FROM TweetAction ta WHERE ta.tweet.id = :tweetId AND ta.user.id = :userId AND ta.actionType = :actionType")
  TweetAction findByTweetIdAndUserIdAndActionType(@Param("tweetId") Long tweetId, @Param("userId") Long userId, @Param("actionType") TweetActionType actionType);

  @Query("SELECT COUNT(*) FROM TweetAction WHERE tweet.id = :tweetId AND actionType = :actionType")
  Integer getCountByTweetIdAndActionType(@Param("tweetId") Long tweetId, @Param("actionType") TweetActionType actionType);

  @Query("SELECT t FROM TweetAction ta JOIN ta.tweet t WHERE ta.actionType = :actionType AND t.user.id = :userId")
  Page<Tweet> findTweetsByActionTypeAndUserId(Long userId, @Param("actionType") TweetActionType actionType, Pageable pageable);

  @Query("SELECT COUNT(t) FROM TweetAction t WHERE t.actionType = :actionType AND t.user.id = :userId AND t.tweet.id = :tweetId")
  int countByActionTypeAndUserIdAndTweetId(@Param("actionType") TweetActionType actionType, @Param("userId") Long userId, @Param("tweetId") Long tweetId);

  // ----------------------------------------------------------------------------------------------------------------


  Integer countAByTweetAndActionType(Tweet tweet, TweetActionType actionType);

  Optional<TweetAction> getByUserAndTweetAndActionType(UserModel user, Tweet tweet, TweetActionType actionType);

  Page<TweetAction> findAllByUserAndActionTypeOrderByCreatedAtDesc(UserModel user, TweetActionType actionType, Pageable pageable);
}





