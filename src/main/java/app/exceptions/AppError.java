package app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.checkerframework.checker.units.qual.A;

@Log4j2
@Getter
public class AppError extends RuntimeException {
  public String message;

  public AppError(String msg){
    log.error(msg);
    message = msg;
  }
}
