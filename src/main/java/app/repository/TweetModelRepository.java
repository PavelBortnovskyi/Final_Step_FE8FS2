package app.repository;


import app.enums.TweetType;
import app.model.Tweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface TweetModelRepository extends RepositoryInterface<Tweet> {
  void deleteById(Long id);

  @Query(value = "SELECT t FROM Tweet t WHERE t.user.id =:userId")
  Page<Tweet> getUserTweets(Long userId, Pageable pageable);

  //Page<Tweet> getTweetsByUserId(Long userId, Pageable pageable);

  @Query(value = "SELECT t FROM Tweet t")
  Page<Tweet> listTweets(Pageable pageable);

  @Query("SELECT t FROM Tweet t WHERE t.user.id IN (:userIds) ORDER BY t.createdAt DESC")
  Page<Tweet> findTweetsByUserIdsSortedByDate(List<Long> userIds, Pageable pageable);

  @Query("SELECT COUNT(*) FROM Tweet t WHERE t.tweetType = :tweetType AND t.id = :tweetId")
  Integer getCountByTweetTypeAndId(@Param("tweetType") TweetType tweetType, @Param("tweetId") Long tweetId);

  @Query("SELECT t FROM Tweet t WHERE t.createdAt >= :lastHour")
  List<Tweet> listTweetsFromLastHour(LocalDateTime lastHour);


}
