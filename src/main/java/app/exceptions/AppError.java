package app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public class AppError extends RuntimeException {
  public String message;
}
