package app.utils;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import app.service.NotificationService;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.util.Arrays;

@Log4j2
@Aspect
@Component
public class NotificationAspect {

  @Pointcut("@annotation(app.annotations.SendNotification)")
  public void executeNotification() {
  }

  @Autowired
  private WebSocketStompClient stompClient;

  @Autowired
  private NotificationService notificationService;

  @Value("${socket.host}")
  private String socketUri;

  @AfterReturning(pointcut = "executeNotification()", returning = "returnValue")
  public void sendNotificationCall(JoinPoint joinPoint, Object returnValue) {
    String methodName = joinPoint.getSignature().getName();
    log.info("Method name in aspect: " + methodName);

    Object[] args = joinPoint.getArgs();
    log.info("Args: " + Arrays.toString(args));
    Long senderUserId = (Long) args[0];
    log.info("SenderId: " + senderUserId);

    Tweet tweet = null;
    TweetAction tweetAction = null;
    TweetActionType tweetActionType = null;

    if (methodName.equals("createTweet")) {
      tweet = (Tweet) returnValue;
      log.info("Tweet: " + tweet.getBody());
    } else {
      tweetAction = (TweetAction) returnValue;
      tweet = tweetAction.getTweet();
      tweetActionType = tweetAction.getActionType();
      log.info("Tweet: " + tweet.getBody());
      log.info("TweetActionType: " + tweetActionType.name());
    }
    notificationService.sendNotification(tweet, senderUserId, tweetActionType);
  }
}
