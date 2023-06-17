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
  @ApiOperation("Создать TWEET")
  //@RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<TweetResponseDTO> createNewTweet(@ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                         HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.TWEET, null));
  }


  // Create quote tweet
  @PostMapping("/{id}/quote")
  @ApiOperation("Создать QUOTE_TWEET твита с {id}")
  public ResponseEntity<TweetResponseDTO> createQuoteTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                           @ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                           HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.QUOTE_TWEET, tweetId));
  }


  // Create retweet
  @PostMapping("/{id}/retweet")
  @ApiOperation("Создать RETWEET твита с {id}")
  public ResponseEntity<TweetResponseDTO> createRetweetTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                             HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"),
      new TweetRequestDTO("", new ArrayList<>()), TweetType.RETWEET, tweetId));
  }


  // Create replay tweet
  @PostMapping("/{id}/replay")
  @ApiOperation("Создать REPLAY твита с {id}")
  public ResponseEntity<TweetResponseDTO> createReplyTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                           @ModelAttribute @Valid TweetRequestDTO requestDTO,
                                                           HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweet((Long) httpRequest.getAttribute("userId"), requestDTO,
      TweetType.REPLY, tweetId));
  }


  // Get Tweet by id
  @GetMapping("/{id}")
  @ApiOperation("Получить TWEET/RETWEET/QUOTE_TWEET/REPLAY по {id}")
  public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable(name = "id") @Positive Long tweetId) {
    return ResponseEntity.ok(tweetFacade.getTweetById(tweetId));
  }


  // Delete tweet
  @DeleteMapping("/{id}")
  @ApiOperation("Удалить TWEET/RETWEET/QUOTE_TWEET/REPLAY по {id}.  Только свои можно удалять.")
  public void deleteTweet(@PathVariable(name = "id") @Positive Long tweetId,
                          HttpServletRequest httpRequest) {
    tweetFacade.deleteTweet((Long) httpRequest.getAttribute("userId"), tweetId);
  }


  // Like tweet action
  @PostMapping("/{id}/like")
  @ApiOperation("Лайкнуть TWEET/RETWEET/QUOTE_TWEET/REPLAY с {id}")
  public ResponseEntity<TweetResponseDTO> likeTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                    HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Unlike tweet action
  @PostMapping("/{id}/unlike")
  @ApiOperation("Забрать лайк TWEET/RETWEET/QUOTE_TWEET/REPLAY с {id}")
  public ResponseEntity<TweetResponseDTO> unLikeTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                      HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.removeTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.LIKE));
  }


  // Create bookmark
  @PostMapping("/{id}/bookmark")
  @ApiOperation("Добавить в закладки TWEET/RETWEET/QUOTE_TWEET/REPLAY с {id}")
  public ResponseEntity<TweetResponseDTO> bookmarkTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                        HttpServletRequest httpRequest) {
    return ResponseEntity.ok(tweetFacade.createTweetAction((Long) httpRequest.getAttribute("userId"), tweetId,
      TweetActionType.BOOKMARK));
  }


  // UnBookmark tweet action
  @PostMapping("/{id}/unbookmark")
  @ApiOperation("Убрать из закладок TWEET/RETWEET/QUOTE_TWEET/REPLAY с {id}")
  public ResponseEntity<TweetResponseDTO> unBookmarkTweet(@PathVariable(name = "id") @Positive Long tweetId,
                                                          HttpServletRequest httpRequest) {
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
  @ApiOperation("Получить все (пагинация) TWEET/RETWEET/QUOTE_TWEET/REPLAY у юзера с {id}, если не указать {id} - текущий юзер")
  public Page<TweetResponseDTO> getAllTweets(@PathVariable(name = "id", required = false) Long userId,
                                             @RequestParam(name = "page", defaultValue = "0") @PositiveOrZero int page,
                                             @RequestParam(name = "size", defaultValue = "10") @Positive int size,
                                             HttpServletRequest httpRequest) {
    return tweetFacade.getAllTweetsByUserId(userId == null ? (Long) httpRequest.getAttribute("userId") : userId, page, size);
  }
}
