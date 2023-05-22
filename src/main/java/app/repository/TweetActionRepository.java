package app.repository;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetActionRepository extends RepositoryInterface<TweetAction>{
    @Query("SELECT t.tweet.id FROM TweetAction t WHERE t.actionType = :action_type AND t.tweet.id = :tweet_id")
    List<Long> getTweetByTweetAction(@Param("action_type") TweetActionType tweetActionType, @Param("tweet_id") Long tweetId);
}



