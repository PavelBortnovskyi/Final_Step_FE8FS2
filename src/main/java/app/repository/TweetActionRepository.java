package app.repository;


import app.model.Tweet;
import app.model.TweetAction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetActionRepository extends RepositoryInterface<TweetAction>{
    @Query("SELECT t.tweet.id FROM TweetAction t WHERE t.actionType = :actionType AND t.user.id = :userId")
    Page<Long> findTweetIdsByActionTypeAndUserId(String actionType, Long userId, Pageable pageable);

    TweetAction findTweetActionByTweetIdAndUserIdAndActionTypeLike(Long tweetId, Long userId, String actionType);

    @Query("SELECT COUNT(t) FROM TweetAction t WHERE t.tweet.id = :tweetId AND t.actionType = :actionType")
    Integer countByTweetIdAndActionType(Long tweetId, String actionType);

    @Query("SELECT t.tweet FROM TweetAction t WHERE t.actionType = 'TWEET_BOOKMARK' AND t.user.id = :userId")
    List<Tweet> findTweetsByActionTypeAndUserId(Long userId);

}





