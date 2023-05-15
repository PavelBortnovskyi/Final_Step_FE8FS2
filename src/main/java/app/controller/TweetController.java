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
import java.util.HashMap;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/tweet")
public class TweetController {

  private final TweetService tweetService;

  private final UserModelService userModelService;

  private final TweetFacade tweetFacade;



  @GetMapping("{id}")
  public ResponseEntity<HashMap<String, String>> getTweet(@PathVariable String id) {
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));

    if (!tweet.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    HashMap<String, String> response = new HashMap<>();
    response.put("created_at", tweet.get().getCreatedAt().toString());
    response.put("count_likes", tweet.get().getCountLikes().toString());
    response.put("count_retweets", tweet.get().getCountRetweets().toString());
    response.put("avatar_image", tweet.get().getUser().getAvatarImgUrl());
    response.put("user_tag", tweet.get().getUser().getUserTag());
    if (tweet.get().getParentTweet()!= null) response.put("parent_tweet", tweet.get().getParentTweet().toString());
    response.put("body", tweet.get().getBody());



    return ResponseEntity.ok(response);
  }

  @GetMapping("/create")
  public void createTweet(HttpServletRequest request){
    Optional<UserModel> user = userModelService.getUser(1L);  //(Long) request.getAttribute("userId")
    Tweet tweet = new Tweet();
    tweet.setBody("Hello world");
    tweet.setCountLikes(45);
    tweet.setUser(user.orElse(null));
    tweet.setCountRetweets(2);
    tweet.setTweetType(TweetType.TWEET);
    this.tweetService.save(tweet);
  }

  @GetMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id){
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(1L)) { //(Long) request.getAttribute("userId")
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



  @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> addTweet(@RequestBody TweetRequest tweetRequest) {

    Tweet newTweet = this.tweetService.save(this.tweetFacade.convertToEntity(tweetRequest));

    return ResponseEntity.ok("response");
  }



}
