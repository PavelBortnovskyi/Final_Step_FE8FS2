package app.controller;

import app.annotations.New;
import app.dto.rq.TweetRequest;
import app.dto.rq.UserModelRequest;
import app.dto.rs.TweetResponse;
import app.enums.TokenType;
import app.enums.TweetType;
import app.exceptions.EmailAlreadyRegisteredException;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.model.UserModel;
import app.service.TweetService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/tweet")
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
            .orElseGet(() -> ResponseEntity.notFound().build());
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
  public ResponseEntity<TweetResponse> getAllTweet(@PathVariable(name = "id") Long id) {

    userModelService.getUser(id);
    Optional<Tweet> tweet = tweetService.findById(id);

    if (!tweet.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    return tweet.map(model -> ResponseEntity.ok(tweetFacade.convertToDto(model)))
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/test")
  public void test () {
    UserModel user1 = new UserModel();
    user1.setUserTag("user1");
    user1.setFullName("User Usereus1");
    user1.setEmail("user1@gmail.com");
    user1.setPassword("11111111");

    UserModel user2 = new UserModel();
    user2.setUserTag("user2");
    user2.setFullName("User Usereus2");
    user2.setEmail("user2@gmail.com");
    user2.setPassword("11111111");

    UserModel user3 = new UserModel();
    user3.setUserTag("user3");
    user3.setFullName("User Usereus3");
    user3.setEmail("user4@gmail.com");
    user3.setPassword("11111111");

    UserModel user4 = new UserModel();
    user4.setUserTag("user4");
    user4.setFullName("User Usereus1");
    user4.setEmail("user41@gmail.com");
    user4.setPassword("11111111");

    UserModel user5 = new UserModel();
    user5.setUserTag("user5");
    user5.setFullName("User Usereus1");
    user5.setEmail("user5@gmail.com");
    user5.setPassword("11111111");
    List<UserModel> users = new LinkedList<>();

    users.add(user1);
    users.add(user2);
    users.add(user3);
    users.add(user4);

/*    Set<UserModel> followUser = new TreeSet<>();
    followUser.add(user3);
    followUser.add(user5);
    user1.setFollowings(followUser);*/

    users.forEach(u -> userModelService.save(u));;
  }


}
