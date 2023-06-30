package app.controller;


import app.dto.rs.TweetActionResponseDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.facade.TweetActionFacade;
import app.facade.TweetFacade;
import app.service.AuthUserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Log4j2
@Validated
@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweet")
public class TweetController {

  private final TweetFacade tweetFacade;
  private final TweetActionFacade tweetActionFacade;
  private final AuthUserService authUserService;


  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ApiOperation("Create TWEET")
  public ResponseEntity<TweetResponseDTO> createNewTweet(@RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                         @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet(authUserService.getCurrUserId(),
      tweetBody, attachmentImages, TweetType.TWEET, null));
  }


  @PostMapping("{id}/quote")
  @ApiOperation("Create QUOTE_TWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createQuoteTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet(authUserService.getCurrUserId(),
      tweetBody, attachmentImages, TweetType.QUOTE_TWEET, tweetId));
  }


  // returns the parent tweet
  @PostMapping("{id}/retweet")
  @ApiOperation("Create or delete RETWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createOrDeleteRetweetTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    //return ResponseEntity.ok(tweetFacade.createTweet(authUserService.getCurrUserId(),
    // "", new MultipartFile[0], TweetType.RETWEET, tweetId));
    return ResponseEntity.ok(tweetFacade.createOrDeleteRetweet(authUserService.getCurrUserId(), tweetId));
  }


  @PostMapping("{id}/reply")
  @ApiOperation("Create REPLAY from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet(authUserService.getCurrUserId(),
      tweetBody, attachmentImages, TweetType.REPLY, tweetId));
  }


  @GetMapping("{id}")
  @ApiOperation("Get TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


  @DeleteMapping("{id}")
  @ApiOperation("Delete TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}.  Только свои можно удалять.")
  public void deleteTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    tweetFacade.deleteTweet(authUserService.getCurrUserId(), tweetId);
  }


  @PostMapping("{id}/like")
  @ApiOperation("Like TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> likeTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction(authUserService.getCurrUserId(), tweetId,
      TweetActionType.LIKE));
  }


  @PostMapping("{id}/unlike")
  @ApiOperation("Unlike лайк TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> unLikeTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction(authUserService.getCurrUserId(), tweetId,
      TweetActionType.LIKE));
  }


  @PostMapping("{id}/bookmark")
  @ApiOperation("Add to bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction(authUserService.getCurrUserId(), tweetId,
      TweetActionType.BOOKMARK));
  }


  @PostMapping("{id}/unbookmark")
  @ApiOperation("Remove from bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> unBookmarkTweet(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction(authUserService.getCurrUserId(), tweetId,
      TweetActionType.BOOKMARK));
  }


  @GetMapping({"user/{id}", "/user"})
  @ApiOperation("Get all TWEET/RETWEET/QUOTE_TWEET of user with {id}, without {id} - current user")
  public Page<TweetResponseDTO> getTweetsByTypeOfUser(@PathVariable(name = "id", required = false) Long userId,
                                                      @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                      @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsByUserId(userId == null ? authUserService.getCurrUserId() : userId,
      List.of(TweetType.TWEET, TweetType.RETWEET, TweetType.QUOTE_TWEET), PageRequest.of(page, size));
  }


  @GetMapping({"reply/user/{id}", "reply/user"})
  @ApiOperation("Get all replies of user with {id}, without {id} - current user")
  public Page<TweetResponseDTO> getAllRepliesOfUser(@PathVariable(name = "id", required = false) Long userId,
                                                    @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                    @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsByUserId(userId == null ? authUserService.getCurrUserId() : userId,
      List.of(TweetType.REPLY), PageRequest.of(page, size));
  }


  @GetMapping("{id}/reply")
  @ApiOperation("Get all REPLY of tweet with {id}")
  public Page<TweetResponseDTO> getReplyOfTweet(@PathVariable(name = "id") Long tweetId,
                                                @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsOfTweet(tweetId, TweetType.REPLY, PageRequest.of(page, size));
  }


  @GetMapping("{id}/retweet")
  @ApiOperation("Get all RETWEET of tweet with {id}")
  public Page<TweetResponseDTO> getRetweetOfTweet(@PathVariable(name = "id") Long tweetId,
                                                  @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                  @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsOfTweet(tweetId, TweetType.RETWEET, PageRequest.of(page, size));
  }


  @GetMapping("{id}/quote")
  @ApiOperation("Get all QUOTE of tweet with {id}")
  public Page<TweetResponseDTO> getQuoteOfTweet(@PathVariable(name = "id") Long tweetId,
                                                @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsOfTweet(tweetId, TweetType.QUOTE_TWEET, PageRequest.of(page, size));
  }


  @GetMapping
  @ApiOperation("Get all TWEET/RETWEET/QUOTE_TWEET")
  public Page<TweetResponseDTO> getAllTweets(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getAllTweets(PageRequest.of(page, size));
  }


  @GetMapping({"like/user/{id}", "like/user"})
  @ApiOperation("Get tweets LIKEd by the user")
  public Page<TweetActionResponseDTO> getTweetsLikedByUser(@PathVariable(name = "id", required = false) Long userId,
                                                           @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetActionFacade.getTweetActionsByUser(userId == null ? authUserService.getCurrUserId() : userId,
      TweetActionType.LIKE, PageRequest.of(page, size));
  }


  @GetMapping("bookmark")
  @ApiOperation("Get tweets BOOKMARK by the current user")
  public Page<TweetActionResponseDTO> getTweetsLikedByUser(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetActionFacade.getTweetActionsByUser(authUserService.getCurrUserId(),
      TweetActionType.BOOKMARK, PageRequest.of(page, size));
  }


  @GetMapping("subscriptions")
  @ApiOperation("Get all tweets (TWEET/RETWEET/QUOTE_TWEET) from the current user's subscriptions")
  public Page<TweetResponseDTO> getTweetsFromSubscriptions(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsFromSubscriptions(authUserService.getCurrUserId(), PageRequest.of(page, size));
  }


  @GetMapping("top")
  @ApiOperation("Get top tweets")
  public Page<TweetResponseDTO> getTopTweets(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTopTweets(PageRequest.of(page, size));
  }


}
