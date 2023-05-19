package app.exceptions.tweetError;

import app.exceptions.AppError;
import app.exceptions.BadRequestException;
import lombok.Getter;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TweetIsNotFoundException extends BadRequestException {
  public TweetIsNotFoundException(String message) {

    super("Tweet is not found " + message);
  }

}
