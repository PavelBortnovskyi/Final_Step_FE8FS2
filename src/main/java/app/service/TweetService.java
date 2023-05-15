package app.service;

import app.exceptions.TweetIsDeleteException;
import app.model.Tweet;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {
  private final TweetModelRepository tweetModelRepository;
  public void deleteTweet(Long tweetId) {
    this.tweetModelRepository.deleteById(tweetId);
    new TweetIsDeleteException(String.format("Tweet: %d, has been deleted", tweetId));
  }

  public Optional<Tweet> update(Tweet tweetRequest) {
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetRequest.getId());
    if (tweet.isPresent()) {
      Tweet tweetToUpdate = tweet.get();
      tweetToUpdate.setBody(tweetRequest.getBody());
      tweetModelRepository.save(tweetToUpdate);
    }
    return tweet;
  }

}
