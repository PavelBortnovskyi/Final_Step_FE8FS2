package app.exceptions;

public class UsernameIsTakenException extends AuthErrorException{
    public UsernameIsTakenException(String message) {
        super(message);
    }
}
