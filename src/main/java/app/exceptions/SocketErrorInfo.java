package app.exceptions;

import lombok.Getter;

@Getter
public class SocketErrorInfo {
  private final String code;
  private final String info;

  public SocketErrorInfo(String code, String info) {
    this.code = code;
    this.info = info;
  }
}
