package app.exceptions.httpError;

import app.exceptions.AppError;

public class UnAuthorizedException extends AppError {
    public UnAuthorizedException(String msg) {
        super("UNAUTHORIZED. " + msg);
    }
}
