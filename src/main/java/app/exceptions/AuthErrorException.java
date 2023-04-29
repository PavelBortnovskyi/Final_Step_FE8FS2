package app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;



@Data
public class AuthErrorException extends AppError{
  public AuthErrorException (String message) {
    super(message);
  }
}
