package app.exceptions;

public class EmailNotFoundException extends AuthErrorException{
    public EmailNotFoundException(String message) {
        super(message);
    }
}
