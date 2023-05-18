package app.exceptions;

public class ChatNotFoundException extends AuthErrorException{
    public ChatNotFoundException(String message) {
        super(message);
    }
}
