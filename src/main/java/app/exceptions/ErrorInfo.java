package app.exceptions;

import lombok.Getter;

@Getter
public class ErrorInfo {
  private final String url;
  private final String error;

  ErrorInfo(String url, String error) {
    this.url = url;
    this.error = error;
  }
}
