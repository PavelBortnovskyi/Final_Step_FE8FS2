package app.exceptions;

import lombok.Getter;

@Getter
public class SocketErrorInfo {
  private final String code;
  private final String info;

  public SocketErrorInfo(String url, String info) {
    this.code = url;
    this.info = info;
  }
}
