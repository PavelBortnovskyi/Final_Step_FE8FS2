package app.repository;


import app.model.Tweet;
import app.model.UserModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;


@Repository
public interface TweetModelRepository extends RepositoryInterface<Tweet> {
  void deleteById(Long id);

  @Query(value = "SELECT t FROM Tweet t WHERE t.user.id =:userId")
  List<Tweet> getUserTweets(Long userId);

  @Query("SELECT t FROM Tweet t WHERE t.user.id IN (:userIds) ORDER BY t.createdAt DESC")
  Page<Tweet> findTweetsByUserIdsSortedByDate(List<Long> userIds, Pageable pageable);


  List<Tweet> getAllByUser(UserModel user);


}
