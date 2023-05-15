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
  public void deleteTweet(@PathVariable String id, HttpServletRequest request){
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

  @PostMapping("/add")
  public ResponseEntity<Tweet> createTweet(@RequestBody TweetRequest tweetRequest) {
    UserModel user = userModelService.getUser(1L).orElse(null);
    Tweet tweet = new Tweet();
    tweet.setBody(tweetRequest.getBody());
    tweet.setTweetType(tweetRequest.getTweetType());
    tweet.setUser(user);
    Tweet savedTweet = tweetService.save(tweet);
    return ResponseEntity.ok(savedTweet);
  }



}
