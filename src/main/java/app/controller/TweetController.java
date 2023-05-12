package app.controller;

import app.dto.rs.TweetResponse;
import app.model.Tweet;
import app.service.TweetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/tweet")
public class TweetController {
  @Autowired
  private TweetService tweetService;


  @GetMapping("{id}")
  public ResponseEntity<Tweet> getTweet(@PathVariable("id") Long id) {
    Optional<Tweet> optionalTweet = tweetService.findById(id);
    return optionalTweet.map(tweet -> ResponseEntity.ok(tweet))
      .orElseGet(() -> ResponseEntity.notFound().build());
  }


}
