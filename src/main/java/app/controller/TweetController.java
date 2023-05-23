package app.controller;

import app.annotations.Marker;
import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.service.TweetActionService;
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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("api/v1/tweet")
public class TweetController {

  private final TweetService tweetService;

  private final TweetActionService tweetActionService;
  private final TweetFacade tweetFacade;

  //get tweet by id (don`t need token)
  @GetMapping("{id}")
  public ResponseEntity<TweetResponse> getTweet(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(tweetFacade.getTweetById(id));
  }

  //delete tweet by id
  @DeleteMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id, HttpServletRequest request) {
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetService.deleteTweet(Long.valueOf(id));
    }
  }

  //update tweet
  @PostMapping(path = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Validated({Marker.Update.class})
  public ResponseEntity<TweetResponse> updateTweet(@Valid @JsonView({Marker.Update.class}) @PathVariable Long id,
                                                   @RequestBody TweetRequest tweetRequest){
    return ResponseEntity.ok(tweetFacade.updateTweet(id, tweetRequest));
  }

  //create new tweet
  @PostMapping("/create_tweet")
  @Validated({Marker.New.class})
  public ResponseEntity<TweetResponse> createTweet(@Valid @JsonView({Marker.New.class})
          @RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createTweet(tweetRequest, request));
  }

  @PostMapping("/create_retweet")
  @Validated({Marker.Retweet.class})
  public ResponseEntity<TweetResponse> createRetweet(@Valid @JsonView({Marker.Retweet.class})
                                                                                 @RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createRetweet(tweetRequest, request));
  }

  @PostMapping("/create_reply")
  @Validated({Marker.Retweet.class})
  public ResponseEntity<TweetResponse> createReply(@Valid @JsonView({Marker.Retweet.class})
                                                                                       @RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createRetweet(tweetRequest, request));
  }

  //get List tweets following users
  @GetMapping("/get_following_tweets/{pageNumber}")
  public List<TweetResponse> getAllUserFollowingsTweets(@PathVariable(name = "pageNumber") Integer pageNumber, HttpServletRequest request) {
    return ResponseEntity.ok(tweetFacade.allUserFollowingTweet(request, pageNumber)).getBody();
  }

  // get user tweets
  @GetMapping("/get_tweets/{id}")
  public List<TweetResponse> getUserTweets(@PathVariable(name = "id") Long userId) {
    return ResponseEntity.ok(tweetFacade.getUserTweets(userId)).getBody();
  }

  @PostMapping("/add_like/{tweetId}")
  public ResponseEntity addLikeToTweet(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    return ResponseEntity.ok(tweetActionService.addLike(tweetId, request));
  }

  @PostMapping("/add_bookmarks/{tweetId}")
  public ResponseEntity addBookmark(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    return ResponseEntity.ok(tweetActionService.addBookmark(tweetId, request));
  }




}
