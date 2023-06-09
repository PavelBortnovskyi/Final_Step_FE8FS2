package app.repository;


import app.enums.TweetType;
import app.model.Tweet;
import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface TweetModelRepository extends RepositoryInterface<Tweet> {
  void deleteById(Long id);

  @Query(value = "SELECT t FROM Tweet t WHERE t.user.id =:userId")
  Page<Tweet> getUserTweets(Long userId, Pageable pageable);

  //Page<Tweet> getTweetsByUserId(Long userId, Pageable pageable);

  @Query(value = "SELECT t FROM Tweet t")
  Page<Tweet> getAllTweets(Pageable pageable);

  @Query("SELECT t FROM Tweet t WHERE t.user.id IN (:userIds) ORDER BY t.createdAt DESC")
  Page<Tweet> findTweetsByUserIdsSortedByDate(List<Long> userIds, Pageable pageable);

  @Query("SELECT COUNT(*) FROM Tweet t WHERE t.tweetType = :tweetType AND t.id = :tweetId")
  Integer getCountByTweetTypeAndId(@Param("tweetType") TweetType tweetType, @Param("tweetId") Long tweetId);

  @Query("SELECT t FROM Tweet t WHERE t.parentTweet = :parentTweet AND t.tweetType = 'REPLY'")
  Page<Tweet> tweetsReply(@Param("parentTweet") Tweet parrentTweet, Pageable pageable);

  @Query("SELECT t FROM Tweet t ORDER BY t.createdAt DESC")
  List<Tweet> listLast50Tweets(Pageable pageable);

  @Query("SELECT t FROM Tweet t WHERE t.createdAt >= :oneHourAgo")
  List<Tweet> listLastTweetsPerOneHour(LocalDateTime oneHourAgo);

  // ------------------------------------------------------------------------------------------------------------------

  Optional<Tweet> findTweetById(Long tweetId);

  Integer countByParentTweetAndTweetType(Tweet parentTweet, TweetType tweetType);

  Page<Tweet> findByUserAndTweetTypeInOrderByCreatedAtDesc(UserModel user, List<TweetType> tweetTypes, Pageable pageable);

  Page<Tweet> findByParentTweetAndTweetTypeOrderByCreatedAtDesc(Tweet tweet, TweetType tweetType, Pageable pageable);

  Page<Tweet> findByTweetTypeNotOrderByCreatedAtDesc(TweetType excludeTweetType, Pageable pageable);

  Page<Tweet> findAllByUser_FollowersContainingAndTweetTypeNotOrderByCreatedAtDesc(UserModel userModel, TweetType tweetType, Pageable pageable);

  boolean existsByUserAndParentTweetAndTweetType(UserModel currUser, Tweet tweet, TweetType tweetType);

  Optional<Tweet> findByTweetTypeAndUserAndParentTweet(TweetType tweetType, UserModel user, Tweet parentTweet);

}
