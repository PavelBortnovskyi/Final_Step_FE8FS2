package app.exceptions.authError;

import app.exceptions.AppError;

public class AuthErrorException extends AppError {
    public AuthErrorException(String message) {
        super(message);
    }
}
