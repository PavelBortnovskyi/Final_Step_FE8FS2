package app.enums;

import lombok.Getter;

@Getter
public enum TokenType {
  ACCESS("secretKey"),
  REFRESH("secretRefreshKey"),
  PASSWORD_RESET("secretPasswordReset"),
  PASSWORD_UPDATE("secretPasswordUpdate"),

  REGISTER("WelcomeOnBoard!");

  public final String label;

  TokenType(String label) {
    this.label = label;
  }
}
