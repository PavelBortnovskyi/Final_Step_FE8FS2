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
  public ResponseEntity<TweetResponse> getTweet(@PathVariable Long tweetId) {
    Optional<Tweet> tweet = tweetService.findById(tweetId);

    if (!tweet.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    TweetResponse tweetResponse = new TweetResponse(tweet.get().getBody());
    return ResponseEntity.ok(tweetResponse);
  }

  @GetMapping("/create")
  public void createTweet(HttpServletRequest request){
    Long id = (Long) request.getAttribute("userId");
    //Optional<UserModel> user = userModelService.getUser(1L);
    Tweet tweet = new Tweet();
    tweet.setBody("Hello world");
    tweet.setCountLikes(45);
    //tweet.setUser(user.orElse(null));
    tweet.setCountRetweets(2);
    tweet.setTweetType(TweetType.TWEET);
    this.tweetService.save(tweet);
  }

  @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> addTweet(@RequestBody TweetRequest tweetRequest) {

    Tweet newTweet = this.tweetService.save(this.tweetFacade.convertToEntity(tweetRequest));

    return ResponseEntity.ok("response");
  }



}
