package app.utils;

import app.dto.rq.NotificationRequestDTO;
import app.enums.NotificationType;
import app.enums.TweetActionType;
import app.model.Tweet;
import app.model.TweetAction;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Log4j2
@Aspect
@Component
public class NotificationAspect {

  @Pointcut("@annotation(SendNotification)")
  public void executeNotification() {
  }

  @Autowired
  private WebSocketStompClient stompClient;

  @Value("${socket.host}")
  private String socketUri;

  @AfterReturning(pointcut = "executeNotification()", returning = "returnValue")
  public void sendNotificationCall(JoinPoint joinPoint, Object returnValue) {
    String methodName = joinPoint.getSignature().getName();

    Object[] args = joinPoint.getArgs();
    Long senderUserId = (Long) args[0];

    TweetAction tweetAction = null;
    Tweet tweet = null;

    if (methodName.equals("createTweetAction")) {
      tweetAction = (TweetAction) returnValue;
      tweet = tweetAction.getTweet();
      log.info(tweet.getBody().toString());
      log.info(tweetAction.getActionType().toString());
    } else tweet = (Tweet) returnValue;

    log.info(methodName);
    Tweet finalTweet = tweet;
    TweetAction finalTweetAction = tweetAction;
    log.info(finalTweet.getBody().toString());

    StompSessionHandler sessionHandler = new StompSessionHandlerAdapter() {
      @Override
      public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        NotificationRequestDTO notificationRequestDTO = new NotificationRequestDTO()
          .setInitiatorUserId(senderUserId)
          .setTweetId(finalTweet.getId());

        if (finalTweetAction.getActionType() != null && finalTweetAction.getActionType().equals(TweetActionType.LIKE))
          notificationRequestDTO.setReceiverUserId(finalTweet.getUser().getId())
            .setNotificationType(NotificationType.LIKE);

        else notificationRequestDTO.setReceiverUserId(finalTweet.getParentTweet().getUser().getId());

        switch (finalTweet.getTweetType()) {
          case QUOTE_TWEET -> notificationRequestDTO.setNotificationType(NotificationType.QUOTE_TWEET);
          case REPLY -> notificationRequestDTO.setNotificationType(NotificationType.REPLY);
          case RETWEET -> notificationRequestDTO.setNotificationType(NotificationType.RETWEET);
        }
        session.send("/api/v1/notifications/private", notificationRequestDTO);
      }
    };
    stompClient.connect(socketUri, sessionHandler);
  }
}
