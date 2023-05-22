package app.controller;

import app.annotations.Marker;
import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.dto.rs.UserModelResponse;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.service.TweetService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("api/v1/tweet")
public class TweetController {

  private final TweetService tweetService;
  private final TweetFacade tweetFacade;

  //get tweet by id (don`t need token)
  @GetMapping("{id}")
  @Validated({Marker.forNew.class})
  public ResponseEntity<TweetResponse> getTweet(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(tweetFacade.getTweetById(id));
  }

  //delete tweet by id
  @GetMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id, HttpServletRequest request){
    tweetService.deleteTweet(id, request);
  }

  //update tweet
  @PostMapping(path ="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Validated({Marker.forNew.class})
  public ResponseEntity<TweetResponse> updateTweet(@PathVariable Long id, @RequestBody TweetRequest tweetRequest){
    return ResponseEntity.ok(tweetFacade.updateTweet(id, tweetRequest));
  }

  //create new tweet
  @PostMapping("/create")
  @Validated({Marker.createTweet.class})
  public ResponseEntity<TweetResponse> createTweet(@Payload @Valid @RequestBody TweetRequest tweetRequest,
                                                   HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createTweet(tweetRequest, request));
  }

  //get List tweets following users
  @GetMapping("/get_following_tweets/{id}")
  public List<ResponseEntity<TweetResponse>> getAllTweets(@PathVariable(name = "id") Long id) {
    return (List<ResponseEntity<TweetResponse>>) ResponseEntity.ok(tweetService.allUserFollowingTweet(id));
  }

  // get user tweets
  @GetMapping("/get_tweets/{id}")
  public List<ResponseEntity<TweetResponse>> getUserTweets(@PathVariable(name = "id") Long id) {
    return (List<ResponseEntity<TweetResponse>>) ResponseEntity.ok(tweetService.getUserTweets(id));
  }


  @PostMapping("/add_like/{id}")
  public void addLikeToTweet(@PathVariable(name = "id") Long tweetId, HttpServletRequest request){
    tweetService.addLikeToTweet((Long) request.getAttribute("userId"), tweetId);
  }

  @PostMapping("/create_retweet")
  @Validated({Marker.createRetweet.class})
  public ResponseEntity<TweetResponse> createRetweet(@Payload @Valid @RequestBody TweetRequest tweetRequest,
                                                   HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createTweet(tweetRequest, request));
  }

  /**TODO:
   * @PostMapping("/create_retweet{id}")
   * @PostMapping("/create_reply{id}")
   *
   *
   */


}
