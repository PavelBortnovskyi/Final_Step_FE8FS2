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


  //get tweet by id (don`t need token)
  @GetMapping("{id}")
  public ResponseEntity<TweetResponse> getTweet(@PathVariable(name = "id") Long id) {
    Optional<Tweet> tweet = tweetService.findById(id);

    if (!tweet.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    return tweet.map(model -> ResponseEntity.ok(tweetFacade.convertToDto(model)))
      .orElseThrow(() -> new TweetIsNotFoundException(id.toString()));
  }

  //delete tweet by id
  @GetMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id, HttpServletRequest request){
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetService.deleteTweet(Long.valueOf(id));
    }
  }

  //update tweet
  @PostMapping(path ="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateTweet(@PathVariable String id, @RequestBody TweetRequest tweetRequest){
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent()){
      this.tweetService.update(this.tweetFacade.convertToEntity(tweetRequest));
      return ResponseEntity.ok("response");
    }
    return null;
  }

  //create new tweet
  @PostMapping("/create")
  public ResponseEntity<Tweet> createTweet(@RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createTweet(tweetRequest, request));
  }

  //get List tweets following users
  @GetMapping("/get_following_tweets/{id}")
  public Optional<List<ResponseEntity<TweetResponse>>> getAllTweets(@PathVariable(name = "id") Long id) {
    return Optional.ofNullable(Optional.ofNullable(tweetService.allUserFollowingTweet(id))
      .map(models -> models.stream()
        .map(model -> ResponseEntity.ok(tweetFacade.convertToDto(model)))
        .collect(Collectors.toList()))
      .orElseThrow(() -> new TweetIsNotFoundException(id.toString())));
  }

  // get user tweets
  @GetMapping("/get_tweets/{id}")
  public Optional<List<ResponseEntity<TweetResponse>>> getUserTweets(@PathVariable(name = "id") Long id) {
    return Optional.ofNullable(Optional.ofNullable(tweetService.getUserTweets(id))
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
