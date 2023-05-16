package app.repository;

import app.model.Tweet;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetModelRepository extends RepositoryInterface<Tweet>{
    void deleteById(Long id);
    List<Tweet> getAllByUserId(Long id);

}
