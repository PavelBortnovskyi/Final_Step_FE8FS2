package app.exceptions;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class AppError extends RuntimeException {
    public String message;
}
