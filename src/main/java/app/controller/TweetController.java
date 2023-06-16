package app.controller;

import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.facade.TweetFacade;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;

@Log4j2
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweet")
public class TweetController {

  private final TweetFacade tweetFacade;


  // Create Tweet
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ApiOperation("Create TWEET")
  public ResponseEntity<TweetResponseDTO> createNewTweet(HttpServletRequest httpRequest,
                                                         @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                         @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.TWEET, null));
  }


  // Create quote tweet
  @PostMapping("/{id}/quote")
  @ApiOperation("Create QUOTE_TWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createQuoteTweet(HttpServletRequest httpRequest,
                                                           @PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.QUOTE_TWEET, tweetId));
  }


  // Create retweet
  @PostMapping("/{id}/retweet")
  @ApiOperation("Create RETWEET from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createRetweetTweet(HttpServletRequest httpRequest,
                                                             @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      null, new MultipartFile[0], TweetType.RETWEET, tweetId));
  }


  // Create replay tweet
  @PostMapping("/{id}/replay")
  @ApiOperation("Create REPLAY from tweet with {id}")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(HttpServletRequest httpRequest,
                                                           @PathVariable(name = "id") @Positive Long tweetId,
                                                           @RequestParam(value = "tweetBody", required = false) String tweetBody,
                                                           @RequestParam(value = "attachmentImages", required = false) MultipartFile[] attachmentImages) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      tweetBody, attachmentImages, TweetType.REPLY, tweetId));
  }


  // Get Tweet by id
  @GetMapping("/{id}")
  @ApiOperation("Get TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


  // Delete tweet
  @DeleteMapping("/{id}")
  @ApiOperation("Delete TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}.  Только свои можно удалять.")
  public void deleteTweet(HttpServletRequest httpRequest, @PathVariable(name = "id") @Positive Long tweetId) {
    tweetFacade.deleteTweet((Long) httpRequest.getAttribute("userId"), tweetId);
  }


  // Like tweet action
  @PostMapping("/{id}/like")
  @ApiOperation("Like TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}")
  public ResponseEntity<TweetResponseDTO> likeTweet(HttpServletRequest httpRequest,
                                                    @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Unlike tweet action
  @PostMapping("/{id}/unlike")
  @ApiOperation("Unlike лайк TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}")
  public ResponseEntity<TweetResponseDTO> unLikeTweet(HttpServletRequest httpRequest,
                                                      @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Create bookmark
  @PostMapping("/{id}/bookmark")
  @ApiOperation("Add to bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(HttpServletRequest httpRequest,
                                                        @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  // UnBookmark tweet action
  @PostMapping("/{id}/unbookmark")
  @ApiOperation("Remove from bookmarks TWEET/RETWEET/QUOTE_TWEET/REPLAY with {id}")
  public ResponseEntity<TweetResponseDTO> unBookmarkTweet(HttpServletRequest httpRequest,
                                                          @PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  // Get user all tweets
  @GetMapping({"/user/{id}", "/user"})
  @ApiOperation("Get all TWEET/RETWEET/QUOTE_TWEET/REPLAY of user with {id}, without {id} - current user")
  public Page<TweetResponseDTO> getAllTweets(HttpServletRequest httpRequest,
                                             @PathVariable(name = "id", required = false) Long userId,
                                             @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size) {
    return tweetFacade.getAllTweetsByUserId(userId == null ? (Long) httpRequest.getAttribute("userId") : userId, page, size);
  }
}
