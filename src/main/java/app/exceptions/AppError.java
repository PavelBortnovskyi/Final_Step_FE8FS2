package app.exceptions;

import lombok.*;
import lombok.experimental.SuperBuilder;


@AllArgsConstructor
@Getter
public class AppError extends RuntimeException {
  public String message;
}
