package app.utils;

import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import app.service.NotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutionException;

@Log4j2
@Aspect
@Component
@RequiredArgsConstructor
public class NotificationAspect {

  @Pointcut("@annotation(app.annotations.SendNotification)")
  public void executeNotification() {
  }

  private final NotificationService notificationService;

  /**
   * Method intercepts method args, return value at pointcut and sends notification via websocket to author of content
   */
  @AfterReturning(pointcut = "executeNotification()", returning = "returnValue")
  public void sendNotificationCall(JoinPoint joinPoint, Object returnValue) throws ExecutionException, InterruptedException, JsonProcessingException {
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
