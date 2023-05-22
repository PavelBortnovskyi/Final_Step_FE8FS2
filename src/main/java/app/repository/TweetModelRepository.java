package app.repository;

import app.model.Tweet;
import app.model.TweetAction;
import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface TweetModelRepository extends RepositoryInterface<Tweet> {
  void deleteById(Long id);

  List<Tweet> getAllByUserId(Long id);

  List<Tweet> getAllByUser(UserModel user);



  @Query(value = "SELECT u FROM UserModel u where u.followings = :followed_id")
  Optional<List<UserModel>> userFollowings(@Param("followed_id") Long userId);



}
