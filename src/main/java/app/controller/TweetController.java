package app.controller;

import app.annotations.Marker;
import app.dto.rq.TweetRequest;
import app.dto.rs.TweetActionResponse;
import app.dto.rs.TweetResponse;
import app.facade.TweetActionFacade;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.service.TweetActionService;
import app.service.TweetService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Log4j2
@CrossOrigin
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("api/v1/tweet")
public class TweetController {

  private final TweetService tweetService;
  private final TweetActionService tweetActionService;
  private final TweetActionFacade tweetActionFacade;
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
      tweetService.deleteTweet(Long.valueOf(id), request);
    }
  }

  //update tweet
  @PostMapping(path = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Validated({Marker.Update.class})
  public ResponseEntity<TweetResponse> updateTweet(@Valid @JsonView({Marker.Update.class}) @PathVariable Long id,
                                                   @RequestBody TweetRequest tweetRequest) {
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
    return ResponseEntity.ok(tweetService.createReply(tweetRequest, request));
  }

  //get List tweets following users
  @GetMapping("/get_following_tweets")
  public List<TweetResponse> getAllUserFollowingsTweets(@RequestParam("page") int page,
                                                        @RequestParam("pageSize") int pageSize, HttpServletRequest request) {
    return ResponseEntity.ok(tweetFacade.allUserFollowingTweet(request, page, pageSize)).getBody();
  }

  // get user tweets
  @GetMapping("/get_tweets/{id}")
  public List<TweetResponse> getUserTweets(@PathVariable(name = "id") Long userId, @RequestParam("page") int page,
                                           @RequestParam("pageSize") int pageSize) {
    return ResponseEntity.ok(tweetFacade.getUserTweets(userId, page, pageSize)).getBody();
  }

  @PostMapping("/add_like/{tweetId}")
  public ResponseEntity<TweetActionResponse> addLikeToTweet(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    return ResponseEntity.ok(tweetActionFacade.addLike(tweetId, request));
  }

  @PostMapping("/add_bookmark/{tweetId}")
  public ResponseEntity<TweetActionResponse> addBookmark(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    return ResponseEntity.ok(tweetActionFacade.addBookmark(tweetId, request));
  }

  @GetMapping("/bookmarks")
  public ResponseEntity getAllBookmarks(@RequestParam("page") int page,
                                        @RequestParam("pageSize") int pageSize, HttpServletRequest request) {
    return ResponseEntity.ok(tweetFacade.getAllBookmarksTweet(request, page, pageSize));
  }

  @DeleteMapping("/delete_like/{tweetId}")
  public void deleteLike(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    tweetActionService.deleteLike(tweetId, request);
  }

  @DeleteMapping("/delete_bookmark/{tweetId}")
  public void deleteBookmark(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    tweetActionService.deleteBookmark(tweetId, request);
  }


}
