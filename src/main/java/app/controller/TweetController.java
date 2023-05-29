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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
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
  @PutMapping(path = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Validated({Marker.Update.class})
  public ResponseEntity<TweetResponse> updateTweet(@Valid @JsonView({Marker.Update.class}) @PathVariable Long id,
                                                   @RequestBody TweetRequest tweetRequest) {
    return ResponseEntity.ok(tweetFacade.updateTweet(id, tweetRequest));
  }

  //create new tweet
  @PutMapping("/tweet")
  @Validated({Marker.New.class})
  public ResponseEntity<TweetResponse> createTweet(@Valid @JsonView({Marker.New.class}) @RequestBody
                                                   @RequestParam(value = "data") String jsonData, HttpServletRequest request,
                                                   @RequestParam(value = "file", required = false) MultipartFile[] file) {
    return ResponseEntity.ok(tweetService.createTweet(request, jsonData, file));
  }

  @PutMapping("/retweet")
  @Validated({Marker.Retweet.class})
  public ResponseEntity<TweetResponse> createRetweet(@Valid @JsonView({Marker.New.class}) @RequestBody
                                                     @RequestParam(value = "data") String jsonData, HttpServletRequest request,
                                                     @RequestParam(value = "file", required = false) MultipartFile[] file) {
    return ResponseEntity.ok(tweetService.createRetweet(request, jsonData, file));
  }

  @PutMapping("/reply")
  @Validated({Marker.Retweet.class})
  public ResponseEntity<TweetResponse> createReply(@Valid @JsonView({Marker.New.class}) @RequestBody
                                                   @RequestParam(value = "data") String jsonData, HttpServletRequest request,
                                                   @RequestParam(value = "file", required = false) MultipartFile[] file) {
    return ResponseEntity.ok(tweetService.createReply(request, jsonData, file));
  }

  //get List tweets following users
  @GetMapping("/following_tweets")
  public List<TweetResponse> getAllUserFollowingsTweets(@RequestParam("page") int page,
                                                        @RequestParam("pageSize") int pageSize, HttpServletRequest request) {
    return ResponseEntity.ok(tweetFacade.allUserFollowingTweet(request, page, pageSize)).getBody();
  }

  // get user tweets
  @GetMapping("/tweets/{id}")
  public List<TweetResponse> getUserTweets(@PathVariable(name = "id") Long userId, @RequestParam("page") int page,
                                           @RequestParam("pageSize") int pageSize) {
    return ResponseEntity.ok(tweetFacade.getUserTweets(userId, page, pageSize)).getBody();
  }

  @PostMapping("/like/{tweetId}")
  public ResponseEntity<TweetActionResponse> addLikeToTweet(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request) {
    return ResponseEntity.ok(tweetActionFacade.addLike(tweetId, request));
  }

  @PostMapping("/bookmark/{tweetId}")
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

  @GetMapping("/status_like/{tweetId}")
  public ResponseEntity statusLike(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request){
    return ResponseEntity.ok(tweetActionService.statusLike(tweetId, request));
  }

  @GetMapping("/status_bookmark/{tweetId}")
  public ResponseEntity statusBookmark(@PathVariable(name = "tweetId") Long tweetId, HttpServletRequest request){
    return ResponseEntity.ok(tweetActionService.statusBookmark(tweetId, request));
  }

  @GetMapping("/get_likes/{id}")
  public ResponseEntity getCount(@PathVariable(name = "id") Long tweetId) {
    return ResponseEntity.ok(tweetActionService.getCountLikes(tweetId));
  }




}
