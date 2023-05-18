package app.exceptions.authError;

public class EmailAlreadyRegisteredException extends AuthErrorException {
    public EmailAlreadyRegisteredException(String message) {
        super(message);
    }
}
