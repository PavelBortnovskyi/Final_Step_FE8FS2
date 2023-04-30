package app.exceptions;

import lombok.Data;

@Data
public class AuthErrorException extends AppError {
  public AuthErrorException(String message) {
    super(message);
  }
}
