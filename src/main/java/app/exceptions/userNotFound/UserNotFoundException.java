package app.exceptions.userNotFound;

import app.exceptions.AppError;

public class UserNotFoundException extends AppError {
    public UserNotFoundException(Long id) {
        super(id.toString());
    }
}
