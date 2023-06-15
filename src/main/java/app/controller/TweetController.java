package app.controller;

import app.dto.rq.TweetRequestDTO;
import app.dto.rs.TweetResponseDTO;
import app.enums.TweetActionType;
import app.enums.TweetType;
import app.facade.TweetFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

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


  // Create replay tweet
  @PutMapping("/{id}/replay")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                           @ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                           HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.REPLY, tweetId));
  }


  // Delete tweet
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                          HttpServletRequest httpRequest){
    tweetFacade.deleteTweet((Long) httpRequest.getAttribute("userId"), tweetId);
  }

  // Create like action
  @PutMapping("/{id}/like")
  public ResponseEntity<TweetResponseDTO> likeTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.actionTweet((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Create bookmark
  @PutMapping("/{id}/bookmark")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.actionTweet((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  // Create retweet
  @PutMapping("/{id}/retweet")
  public ResponseEntity<TweetResponseDTO> retweetTweet(@PathVariable(name ="id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest){
    return ResponseEntity.ok(tweetFacade.actionTweet((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.RETWEET));
  }


  // Get Tweet by Id
  @GetMapping("/{id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


}
