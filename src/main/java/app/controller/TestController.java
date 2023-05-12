package app.controller;

import app.enums.TokenType;
import app.enums.TweetType;
import app.model.Tweet;
import app.model.UserModel;
import app.service.TweetService;
import app.service.UserModelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Log4j2
@RestController
@RequestMapping("/create")
public class TestController {

  @Autowired
  private TweetService tweetService;

  @Autowired
  private UserModelService userService;

  @Autowired
  private PasswordEncoder encoder;


  @GetMapping
  public void createSample(){
    UserModel sample = new UserModel();
    sample.setEmail("111@gmail.com");
    sample.setFullName("Homer");
    sample.setUserTag("DUFF");
    sample.setPassword(encoder.encode("111"));
    this.userService.save(sample);

    Tweet tweet = new Tweet();
    tweet.setBody("Hello world");
    tweet.setCountLikes(45);
    tweet.setUser(sample);
    tweet.setCountRetweets(2);
    tweet.setTweetType(TweetType.TWEET);
    this.tweetService.save(tweet);
  }
}
