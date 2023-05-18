package app.service;

import app.exceptions.TweetIsNotFoundException;
import app.model.Tweet;
import app.model.UserModel;
import app.repository.TweetModelRepository;
import app.repository.UserModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetService extends GeneralService<Tweet> {
  private final TweetModelRepository tweetModelRepository;

  public void addLikeToTweet(Long userId, long tweetId){
    Optional<Tweet> tweet = tweetModelRepository.findById(tweetId);

  }
  public void deleteTweet(Long tweetId) {
    this.tweetModelRepository.deleteById(tweetId);
    new TweetIsNotFoundException(String.format("Tweet: %d, has been deleted", tweetId));
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

  public List<Tweet> allUserFollowingTweet(Long userId){
    Optional<List<UserModel>> followingUsers = tweetModelRepository.userFollowings(userId);
    return followingUsers.stream()
      .flatMap(u -> tweetModelRepository.getAllByUser((UserModel) u).stream())
      .collect(Collectors.toList());
  }

}
