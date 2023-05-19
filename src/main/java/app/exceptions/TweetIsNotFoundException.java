package app.exceptions;

import lombok.Getter;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TweetIsNotFoundException extends AppError{
  @Getter
  public class ErrorInfo {
    private final String url;
    private final String info;

    ErrorInfo(String url, String info) {
      this.url = url;
      this.info = info;
    }
  }
  public TweetIsNotFoundException(String message) {
    super(message);
  }

  @ExceptionHandler({TweetIsNotFoundException.class})
  public TweetIsNotFoundException.ErrorInfo handleSignUpException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    return new TweetIsNotFoundException.ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Tweet is not found");
  }
}
