package app.controller;

import app.annotations.Marker;
import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.facade.TweetFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;
import java.util.HashSet;

@Log4j2
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweet")
public class TweetController {

  private final TweetFacade tweetFacade;


  // Create Tweet
  @PutMapping
  //@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<TweetResponseDTO> createNewTweet(@ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                         HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.TWEET, null));
  }


  // Create quote tweet
  @PutMapping("/{id}/quote")
  public ResponseEntity<TweetResponseDTO> createQuoteTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                           @ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                           HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.QUOTE_TWEET, tweetId));
  }


  // Create retweet
  @PutMapping("/{id}/retweet")
  public ResponseEntity<TweetResponseDTO> createRetweetTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                             HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      new TweetRequestDTO("", new ArrayList<>()), TweetType.RETWEET, tweetId));
  }


  // Create replay tweet
  @PutMapping("/{id}/replay")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                           @ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                           HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.REPLY, tweetId));
  }



  // Get Tweet by id
  @GetMapping("/{id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


  // Delete tweet
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                          HttpServletRequest httpRequest){
    tweetFacade.deleteTweet((Long) httpRequest.getAttribute("userId"), tweetId);
  }


  // Like tweet action
  @PostMapping("/{id}/like")
  public ResponseEntity<TweetResponseDTO> likeTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Unlike tweet action
  @PostMapping("/{id}/unlike")
  public ResponseEntity<TweetResponseDTO> unLikeTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Create bookmark
  @PostMapping("/{id}/bookmark")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  // UnBookmark tweet action
  @PostMapping("/{id}/unbookmark")
  public ResponseEntity<TweetResponseDTO> unBookmarkTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                      HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }

//
//  // Create retweet
//  @PostMapping("/{id}/retweet")
//  public ResponseEntity<TweetResponseDTO> retweetTweet(@PathVariable(name ="id") @Positive Long tweetId,
//                                                    HttpServletRequest httpRequest){
//    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
//      TweetActionType.RETWEET));
//  }
//
//
//  // Remove retweet
//  @PostMapping("/{id}/unretweet")
//  public ResponseEntity<TweetResponseDTO> unRetweetTweet(@PathVariable(name ="id") @Positive Long tweetId,
//                                                       HttpServletRequest httpRequest){
//    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
//      TweetActionType.RETWEET));
//  }
//
//

  // Get user all tweets
  @GetMapping({"/user/{id}", "/user"})
  public Page<TweetResponseDTO> getAllTweets(@PathVariable(name ="id", required = false) Long userId,
                                             @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                             HttpServletRequest httpRequest){
    return tweetFacade.getAllTweetsByUserId(userId == null ? (Long) httpRequest.getAttribute("userId") : userId, page, size);
  }





}
