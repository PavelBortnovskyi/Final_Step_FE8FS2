package app.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class AuthErrorException extends AppError {
  public AuthErrorException(String message, HttpStatus httpStatus) {
    super(message);
  }
}
