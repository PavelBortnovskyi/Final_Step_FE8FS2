package app.exceptions;

import lombok.Getter;

@Getter
public class ErrorInfo2 {
  private final ErrorInfo3 error;

  ErrorInfo2(ErrorInfo3 errorInfo) {
    this.error = errorInfo;
  }
}
