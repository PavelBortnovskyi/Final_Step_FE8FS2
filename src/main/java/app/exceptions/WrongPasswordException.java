package app.exceptions;

public class WrongPasswordException extends AuthErrorException{
    public WrongPasswordException(String message) {
        super(message);
    }
}
