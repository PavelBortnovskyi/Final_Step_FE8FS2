package app.exceptions;

public class EmailAlreadyRegisteredException extends AuthErrorException{
    public EmailAlreadyRegisteredException(String message) {
        super(message);
    }
}
