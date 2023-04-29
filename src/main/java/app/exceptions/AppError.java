package app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppError extends RuntimeException {
  public String message;
}
