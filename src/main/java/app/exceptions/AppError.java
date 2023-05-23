package app.exceptions;

import lombok.Getter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Getter
public class AppError extends RuntimeException {
    public String message;

    public AppError(String msg) {
        log.error(msg);
        message = msg;
    }
}
