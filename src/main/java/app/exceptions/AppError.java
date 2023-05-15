package app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@AllArgsConstructor
public class AppError extends RuntimeException {
  public String message;
}
