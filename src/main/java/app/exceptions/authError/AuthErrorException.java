package app.exceptions.authError;

import app.exceptions.UnAuthorizedException;

public class AuthErrorException extends UnAuthorizedException {
  public AuthErrorException(String message) {

    super("Authorization error. " + message);
  }
}
