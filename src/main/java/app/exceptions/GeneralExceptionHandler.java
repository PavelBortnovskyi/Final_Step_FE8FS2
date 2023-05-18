package app.exceptions;

import app.exceptions.authError.EmailAlreadyRegisteredException;
import app.exceptions.authError.JwtAuthenticationException;
import app.exceptions.authError.UsernameIsTakenException;
import app.exceptions.userNotFound.UserNotFoundException;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Main exception handler
 */
@RestControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({EmailAlreadyRegisteredException.class})
    public ErrorInfo handleSignUpException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This email is already registered. Please choose another one.");
    }

    @ExceptionHandler({UsernameIsTakenException.class})
    public ErrorInfo handleSignUpException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "This username is already registered. Please choose another one.");
    }

    @ExceptionHandler({JwtAuthenticationException.class})
    public ErrorInfo handleLoginException2(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), ex.getMessage());
    }

    @ExceptionHandler({AuthenticationException.class})
    public ErrorInfo handleAuthenticationException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "Wrong login or password. Please try again.");
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ErrorInfo handleUserNotFoundException(RuntimeException ex, HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return new ErrorInfo(UrlUtils.buildFullRequestUrl(request), "User with id: " + ex.getMessage() + " not Found");
    }

    @Getter
    public class ErrorInfo {
        private final String url;
        private final String info;

        ErrorInfo(String url, String info) {
            this.url = url;
            this.info = info;
        }
    }
}

