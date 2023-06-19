package app.utils;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import app.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Log4j2
@Aspect
@Component
@RequiredArgsConstructor
public class NotificationAspect {

  @Pointcut("@annotation(app.annotations.SendNotification)")
  public void executeNotification() {
  }

  private final WebSocketStompClient stompClient;

  private final NotificationService notificationService;

  @AfterReturning(pointcut = "executeNotification()", returning = "returnValue")
  public void sendNotificationCall(JoinPoint joinPoint, Object returnValue) {
    String methodName = joinPoint.getSignature().getName();

    Object[] args = joinPoint.getArgs();
    Long senderUserId = (Long) args[0];

    Tweet tweet = null;
    TweetAction tweetAction = null;
    TweetActionType tweetActionType = null;

    if (methodName.equals("createTweet")) {
      tweet = (Tweet) returnValue;
    } else {
      tweetAction = (TweetAction) returnValue;
      tweet = tweetAction.getTweet();
      tweetActionType = tweetAction.getActionType();
    }
    notificationService.sendNotification(tweet, senderUserId, tweetActionType);
  }
}
