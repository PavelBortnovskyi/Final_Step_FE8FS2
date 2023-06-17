package app.controller;


import app.dto.rs.TweetActionResponseDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.facade.TweetActionFacade;
import app.facade.TweetFacade;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Log4j2
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweet")
public class TweetController {

  private final TweetFacade tweetFacade;
  private final TweetActionFacade tweetActionFacade;


  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ApiOperation("Create TWEET")
  public ResponseEntity<TweetResponseDTO> createNewTweet(HttpServletRequest httpRequest,
                                                         @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                         @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.TWEET, null));
  }


  @PostMapping("{id}/quote")
  @ApiOperation("Create QUOTE_TWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createQuoteTweet(HttpServletRequest httpRequest,
                                                           @PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.QUOTE_TWEET, tweetId));
  }


  @PostMapping("{id}/retweet")
  @ApiOperation("Create RETWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createRetweetTweet(HttpServletRequest httpRequest,
                                                             @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      "", new MultipartFile[0], TweetType.RETWEET, tweetId));
  }


  @PostMapping("{id}/reply")
  @ApiOperation("Create REPLAY from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(HttpServletRequest httpRequest,
                                                           @PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.REPLY, tweetId));
  }


  @GetMapping("{id}")
  @ApiOperation("Get TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


  @DeleteMapping("{id}")
  @ApiOperation("Delete TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}.  Только свои можно удалять.")
  public void deleteTweet(HttpServletRequest httpRequest, @PathVariable(name = "id") @Positive Long tweetId) {
    tweetFacade.deleteTweet((Long) httpRequest.getAttribute("userId"), tweetId);
  }


  @PostMapping("{id}/like")
  @ApiOperation("Like TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> likeTweet(HttpServletRequest httpRequest,
                                                    @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  @PostMapping("{id}/unlike")
  @ApiOperation("Unlike лайк TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> unLikeTweet(HttpServletRequest httpRequest,
                                                      @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  @PostMapping("{id}/bookmark")
  @ApiOperation("Add to bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(HttpServletRequest httpRequest,
                                                        @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  @PostMapping("{id}/unbookmark")
  @ApiOperation("Remove from bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLY with {id}")
  public ResponseEntity<TweetResponseDTO> unBookmarkTweet(HttpServletRequest httpRequest,
                                                          @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  @GetMapping({"user/{id}", "/user"})
  @ApiOperation("Get all TWEET/RETWEET/QUOTE_TWEET of user with {id}, without {id} - current user")
  public Page<TweetResponseDTO> getAllTweetsOfUser(HttpServletRequest httpRequest,
                                                   @PathVariable(name = "id", required = false) Long userId,
                                                   @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                   @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getAllTweetsByUserId(userId == null ? (Long) httpRequest.getAttribute("userId") : userId,
      PageRequest.of(page, size));
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
  public Page<TweetActionResponseDTO> getTweetsLikedByUser(HttpServletRequest httpRequest,
                                                           @PathVariable(name = "id", required = false) Long userId,
                                                           @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetActionFacade.getLikesByUser(userId == null ? (Long) httpRequest.getAttribute("userId") : userId,
      TweetActionType.LIKE, PageRequest.of(page, size));
  }


  @GetMapping("bookmark")
  @ApiOperation("Get tweets BOOKMARK by the current user")
  public Page<TweetActionResponseDTO> getTweetsLikedByUser(HttpServletRequest httpRequest,
                                                           @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetActionFacade.getLikesByUser((Long) httpRequest.getAttribute("userId"),
      TweetActionType.BOOKMARK, PageRequest.of(page, size));
  }

  @GetMapping("subscriptions")
  @ApiOperation("Get all tweets (TWEET/RETWEET/QUOTE_TWEET) from the current user's subscriptions")
  public Page<TweetResponseDTO> getTweetsFromSubscriptions(HttpServletRequest httpRequest,
                                                           @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                                           @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getTweetsFromSubscriptions((Long) httpRequest.getAttribute("userId"), PageRequest.of(page, size));
  }



}
