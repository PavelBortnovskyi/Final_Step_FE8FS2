package app.controller;

import app.dto.rq.TweetRequest;
import app.dto.rs.TweetResponse;
import app.exceptions.tweetError.TweetIsNotFoundException;
import app.facade.TweetFacade;
import app.model.Tweet;
import app.service.TweetService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tweet")
public class TweetController {

  private final TweetService tweetService;


  private final TweetFacade tweetFacade;

  //get tweet by id (don`t need token)
  @GetMapping("{id}")
  public ResponseEntity<TweetResponse> getTweet(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok(tweetFacade.getTweetById(id));
  }

  //delete tweet by id
  @GetMapping("/delete/{id}")
  public void deleteTweet(@PathVariable String id, HttpServletRequest request) {
    Optional<Tweet> tweet = tweetService.findById(Long.valueOf(id));
    if (tweet.isPresent() && tweet.get().getUser().getId().equals(request.getAttribute("userId"))) {
      tweetService.deleteTweet(Long.valueOf(id));
    }
  }

  //update tweet
  @PostMapping(path = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<TweetResponse> updateTweet(@PathVariable Long id, @RequestBody TweetRequest tweetRequest){
    return ResponseEntity.ok(tweetFacade.updateTweet(id, tweetRequest));
  }

  //create new tweet
  @PostMapping("/create")
  public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest, HttpServletRequest request) {
    return ResponseEntity.ok(tweetService.createTweet(tweetRequest, request));
  }

  //get List tweets following users
  @GetMapping("/get_following_tweets/{pageNumber}")
  public List<TweetResponse> getAllTweets(@PathVariable(name = "pageNumber") Integer pageNumber, HttpServletRequest request) {
    return ResponseEntity.ok(tweetFacade.allUserFollowingTweet(request, pageNumber)).getBody();
  }

  // get user tweets
  @GetMapping("/get_tweets/{id}")
  public List<TweetResponse> getUserTweets(@PathVariable(name = "id") Long userId) {
    return ResponseEntity.ok(tweetFacade.getUserTweets(userId)).getBody();
  }

  //TODO: fix, not working
  @PostMapping("/add_like/{id}")
  public void addLikeToTweet(@PathVariable(name = "id") Long tweetId, HttpServletRequest request) {
    tweetService.addLikeToTweet((Long) request.getAttribute("userId"), tweetId);
  }


}
