package app.exceptions;

import lombok.Getter;

@Getter
public class ErrorInfo3 {
  private final String code;
  private final String message;

  ErrorInfo3(String code, String message) {
    this.code = code;
    this.message = message;
  }
}
