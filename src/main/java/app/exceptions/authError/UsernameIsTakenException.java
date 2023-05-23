package app.exceptions.authError;

import app.exceptions.httpError.BadRequestException;

public class UsernameIsTakenException extends BadRequestException {
    public UsernameIsTakenException(String message) {

        super("This username is already registered. Please choose another one." + message);
    }
}
