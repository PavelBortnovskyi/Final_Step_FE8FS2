package app.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class SocketErrorInfo {
  private final String code;
  private final String info;

  public SocketErrorInfo(String code, String info) {
    this.code = code;
    this.info = info;
  }
}
