package app.exceptions.httpError;

import app.exceptions.AppError;

public class BadRequestException extends AppError {
    public BadRequestException(String msg) {
        super("BAD REQUEST. " + msg);
    }
}
