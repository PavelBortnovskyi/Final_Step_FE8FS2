package app.controller;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.enums.TweetType;
import app.exceptions.TweetIsNotFoundException;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.model.UserModel;
import app.service.TweetService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tweet")
public class TweetController {

  private final TweetService tweetService;

  private final UserModelService userModelService;

  private final TweetFacade tweetFacade;



  @GetMapping("{id}")
  public ResponseEntity<TweetResponse> getTweet(@PathVariable(name = "id") Long id) {
    Optional<Tweet> tweet = tweetService.findById(id);

    if (!tweet.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    return tweet.map(model -> ResponseEntity.ok(tweetFacade.convertToDto(model)))
      .orElseThrow(() -> new TweetIsNotFoundException(id.toString()));
  }

  @GetMapping("/create")
  public void createTweet(HttpServletRequest request){
    Optional<UserModel> user = userModelService.getUser((Long) request.getAttribute("userId"));
    Tweet tweet = new Tweet();
    tweet.setBody("Hello world");
    tweet.setCountLikes(45);
    tweet.setUser(user.orElse(null));
    tweet.setCountRetweets(2);
    tweet.setTweetType(TweetType.TWEET);
    this.tweetService.save(tweet);
  }

  @GetMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id, HttpServletRequest request){
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetService.deleteTweet(Long.valueOf(id));
    }
  }

  @PostMapping(path ="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateTweet(@PathVariable String id, @RequestBody TweetRequest tweetRequest){
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent()){
      this.tweetService.update(this.tweetFacade.convertToEntity(tweetRequest));
      return ResponseEntity.ok("response");
    }
    return null;
  }

  @PostMapping("/add")
  public ResponseEntity<Tweet> createTweet(@RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    UserModel user = userModelService.getUser((Long) request.getAttribute("userId")).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetRequest.getTweetType());
    tweet.setCountLikes(0);
    tweet.setCountRetweets(0);
    tweet.setUser(user);
    Tweet savedTweet = tweetService.save(tweet);
    return ResponseEntity.ok(savedTweet);
  }


  @GetMapping("/get_tweet_for/{id}")
  public Optional<List<ResponseEntity<TweetResponse>>> getAllTweet(@PathVariable(name = "id") Long id) {
    return Optional.ofNullable(Optional.ofNullable(tweetService.allUserFollowingTweet(id))
      .map(models -> models.stream()
        .map(model -> ResponseEntity.ok(tweetFacade.convertToDto(model)))
        .collect(Collectors.toList()))
      .orElseThrow(() -> new TweetIsNotFoundException(id.toString())));
  }

  @PostMapping("/add_like/{id}")
  public void addLikeToTweet(@PathVariable(name = "id") Long tweetId, HttpServletRequest request){
    tweetService.addLikeToTweet((Long) request.getAttribute("userId"), tweetId);
  }


}
