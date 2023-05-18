package app.exceptions;

public class AuthErrorException extends AppError {
    public AuthErrorException(String message) {
        super(message);
    }
}
