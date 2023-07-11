package app.service;

import app.enums.TokenType;
import app.exceptions.authError.AuthErrorException;
import app.exceptions.authError.JwtAuthenticationException;
import app.model.UserModel;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class JwtTokenService {
  private final UserDetailsService userDetailsService;

  private final UserService userService;

  @Value("${jwt.secret}")
  private String secretAccessKey;
  @Value("${jwt.secretRefresh}")
  private String secretRefreshKey;
  @Value("${jwt.secretPasswordReset}")
  private String secretPasswordResetKey;
  @Value("${jwt.secretPasswordUpdate}")
  private String secretPasswordUpdateKey;

  @Value("${jwt.secretRegister}")
  private String secretRegisterKey;
  @Value("${jwt.header}")
  private String authorizationHeader;

  //All fields below in milliseconds
  @Value("${jwt.expiration}")
  private long accessTokenLiveTime;
  @Value("${jwt.expirationRefresh}")
  private long refreshTokenLiveTime;
  @Value("${jwt.expirationPasswordReset}")
  private long passwordResetTokenLiveTime;
  @Value("${jwt.expirationPasswordUpdate}")
  private long passwordUpdateTokenLiveTime;

  @Value("${jwt.expirationRegister}")
  private long registerTokenLiveTime;

  private static final String BEARER = "Bearer ";


  /**
   * Encoding of secrets
   */

  @PostConstruct
  protected void init() {
    this.secretAccessKey = Base64.getEncoder().encodeToString(this.secretAccessKey.getBytes());
    this.secretRefreshKey = Base64.getEncoder().encodeToString(this.secretRefreshKey.getBytes());
  }

  /**
   * Method for JWT token creation with token type (Enum) reference
   */
  public String createToken(Long userId, TokenType tokenType) {
    String signKey = this.getSignKey(tokenType);
    Date now = new Date();
    Date expiry = this.getExpirationDate(tokenType);
    Claims claims = Jwts.claims().setSubject(userId.toString());

    return Jwts.builder()
      .setClaims(claims)
      .setIssuedAt(now)
      .setExpiration(expiry)
      .signWith(SignatureAlgorithm.HS512, signKey)
      .compact();
  }

  /**
   * Method for JWT token creation with token type (Enum) reference
   */
  public String createToken(Long userId, TokenType tokenType, String userTag, String userMail) {
    String signKey = this.getSignKey(tokenType);
    Date now = new Date();
    Date expiry = this.getExpirationDate(tokenType);
    Claims claims = (userId == null) ? Jwts.claims().setSubject(userMail) : Jwts.claims().setSubject(userId.toString());

    if (tokenType.equals(TokenType.REGISTER)) {
      claims.put("email", userMail);
    }

    if (tokenType.equals(TokenType.ACCESS)) {
      claims.put("username", userTag);
      claims.put("email", userMail);
    }

    return Jwts.builder()
      .setClaims(claims)
      .setIssuedAt(now)
      .setExpiration(expiry)
      .signWith(SignatureAlgorithm.HS512, signKey)
      .compact();
  }

  /**
   * Method for extraction claims from token according to token type (Enum)
   */
  public Optional<Jws<Claims>> extractClaimsFromToken(String token, TokenType tokenType) throws JwtAuthenticationException {
    String signKey = this.getSignKey(tokenType);
    try {
      return Optional.ofNullable(Jwts.parser()
        .setSigningKey(signKey)
        .parseClaimsJws(token));
    } catch (SignatureException e) {
      log.error("Wrong signature key: " + signKey);
      throw new JwtAuthenticationException("Wrong signature key: " + signKey);
    } catch (MalformedJwtException e) {
      log.error("Token was malformed: " + token);
      throw new JwtAuthenticationException("Token was malformed: " + token);
    } catch (ExpiredJwtException e) {
      log.error(String.format("Token: %s expired", token));
      throw new JwtAuthenticationException(String.format("Token: %s expired", token));
    } catch (UnsupportedJwtException e) {
      log.error("Unsupported type for token: " + token);
      throw new JwtAuthenticationException("Unsupported type for token: " + token);
    } catch (InvalidClaimException e) {
      log.error("Invalid claim from token: " + token);
      throw new JwtAuthenticationException("Invalid claim from token: " + token);
    } catch (CompressionException e) {
      log.error("Invalid compression for token: " + token);
      throw new JwtAuthenticationException("Invalid compression for token: " + token);
    } catch (Exception e) {
      log.error("Some error" + e.toString());
    }
    return Optional.empty();
  }

  /**
   * Method for extraction token from request (JWT Bearer type)
   */
  public Optional<String> extractTokenFromRequest(HttpServletRequest request) {
    return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
      .filter(h -> h.startsWith(BEARER))
      .map(h -> h.substring(BEARER.length()));
  }

  public Optional<String> extractTokenFromHeader(String header) {
    return Optional.of(header.substring(BEARER.length()));
  }

  /**
   * Method for extraction user id value from JWT Claims
   */
  public Optional<Long> extractIdFromClaims(Jws<Claims> claims) {
    try {
      return Optional.ofNullable(claims.getBody().getSubject()).map(Long::parseLong);
    } catch (Exception e) {
      log.error(String.format("Claims id: %s id parsing went wrong: %s", claims.getBody().getId(), claims.getBody().getSubject()));
    }
    return Optional.empty();
  }

  /**
   * Method for extraction username value from JWT Claims
   */
  public Optional<String> extractUserNameFromClaims(Jws<Claims> claims) {
    try {
      return Optional.ofNullable((String) claims.getBody().get("username"));
    } catch (Exception e) {
      log.error(String.format("Claims id: %s username parsing went wrong: %s", claims.getBody().getId(), claims.getBody().getSubject()));
      return Optional.empty();
    }
  }

  /**
   * Method for extraction user email value from JWT Claims
   */
  public Optional<String> extractUserEmailFromClaims(Jws<Claims> claims) {
    try {
      return Optional.ofNullable((String) claims.getBody().get("email"));
    } catch (Exception e) {
      log.error(String.format("Claims id: %s username parsing went wrong: %s", claims.getBody().getId(), claims.getBody().getSubject()));
      return Optional.empty();
    }
  }

  /**
   * Method returns optional of user id from request with JWT Access token
   */
  public Optional<Long> getIdFromRequest(HttpServletRequest request) {
    return this.extractTokenFromRequest(request)
      .flatMap(t -> this.extractClaimsFromToken(t, TokenType.ACCESS))
      .flatMap(this::extractIdFromClaims);
  }

  /**
   * Method for token expiration time validation. Returns true if token not expired
   */
  public boolean validateToken(String token, TokenType tokenType) {
    String signKey = this.getSignKey(tokenType);
    try {
      Jws<Claims> claimsJws = Jwts.parser().setSigningKey(signKey).parseClaimsJws(token);
      return !claimsJws.getBody().getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException e) {
      log.error(String.format("JWT %s token is expired or invalid", tokenType.toString()));
      return false;
    }
  }

  /**
   * Method returns authentication from access token
   */
  public Authentication getAuthentication(String accessToken) {
    UserDetails userDetails = userDetailsService
      .loadUserByUsername(this.extractUserEmailFromClaims(this.extractClaimsFromToken(accessToken, TokenType.ACCESS)
          .orElseThrow(() -> new AuthErrorException("Authentication error with access token: " + accessToken)))
        .orElseThrow(() -> new JwtAuthenticationException("Wrong token payload, email not found")));
    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
  }

  /**
   * Method returns true if provided User Model is exist in DB and refreshToken updated
   */
  public void updateRefreshToken(UserModel userModel, String refreshToken) {
    userService.updateRefreshTokenById(userModel.getId(), refreshToken);
  }

  /**
   * Method returns true if provided refresh Token is not used
   */
  public boolean checkRefreshTokenStatus(String refreshToken) {
    return userService.checkRefreshTokenStatus(refreshToken);
  }

  /**
   * Method changes refresh token refreshed status
   */
  public void changeRefreshTokenStatus(Long userId, boolean usedStatus) {
    userService.changeRefreshTokenStatusById(userId, usedStatus);
  }

  /**
   * Method changes refresh token refreshed status
   */
  public void changeRefreshTokenStatus(String token, boolean usedStatus) {
    userService.changeTokenStatusByValue(token, usedStatus);
  }

  /**
   * Method returns string value of secret depending token type
   */
  private String getSignKey(TokenType tokenType) {
    switch (tokenType) {
      case ACCESS -> {
        return this.secretAccessKey;
      }
      case REFRESH -> {
        return this.secretRefreshKey;
      }
      case PASSWORD_RESET -> {
        return secretPasswordResetKey;
      }
      case PASSWORD_UPDATE -> {
        return secretPasswordUpdateKey;
      }
      default -> {
        return "";
      }
    }
  }

  /**
   * Method returns date expiration value depending token type
   */
  private Date getExpirationDate(TokenType tokenType) {
    Date now = new Date();
    switch (tokenType) {
      case ACCESS -> {
        return new Date(now.getTime() + accessTokenLiveTime);
      }
      case REFRESH -> {
        return new Date(now.getTime() + refreshTokenLiveTime);
      }
      case PASSWORD_RESET -> {
        return new Date(now.getTime() + passwordResetTokenLiveTime);
      }
      case PASSWORD_UPDATE -> {
        return new Date(now.getTime() + passwordUpdateTokenLiveTime);
      }
      default -> {
        return now;
      }
    }
  }

  /**
   * Method returns generated access and refresh token pair based on provided user model
   */
  public HashMap<String, String> generateTokenPair(UserModel user) {
    String accessToken = this.createToken(user.getId(), TokenType.ACCESS, user.getUserTag(), user.getEmail());
    String refreshToken = this.createToken(user.getId(), TokenType.REFRESH);

    //Update refresh token for current user
    this.updateRefreshToken(user, refreshToken);
    this.changeRefreshTokenStatus(user.getId(), false);

    //JWT tokens for response packing
    HashMap<String, String> response = new HashMap<>();
    response.put("ACCESS_TOKEN", accessToken);
    response.put("REFRESH_TOKEN", refreshToken);
    response.put("USER_ID", user.getId().toString());
    return response;
  }
}

/**
 * Sandbox
 */
//  public static void main(String[] args) {
//    JwtTokenService jwts = new JwtTokenService();
//    String access = jwts.createToken(1L, TokenType.ACCESS, "DUFF", "111@gmail.com");
//    String refresh = jwts.createToken(2L, TokenType.REFRESH);
//    String passwordReset = jwts.createToken(3L, TokenType.PASSWORD_RESET);
//    String passwordUpdate = jwts.createToken(4L, TokenType.PASSWORD_UPDATE);
//    System.out.println(String.format("Access token: %s", access));
//    System.out.println(String.format("Refresh token: %s", refresh));
//    System.out.println(String.format("PasswordReset token: %s", passwordReset));
//    System.out.println(String.format("PasswordUpdate token: %s", passwordUpdate));
//    System.out.println(jwts.extractIdFromClaims(jwts.extractClaimsFromToken(access, TokenType.ACCESS).get()).get());
//    System.out.println(jwts.extractIdFromClaims(jwts.extractClaimsFromToken(refresh, TokenType.REFRESH).get()).get());
//    System.out.println(jwts.extractIdFromClaims(jwts.extractClaimsFromToken(passwordReset, TokenType.PASSWORD_RESET).get()).get());
//    System.out.println(jwts.extractIdFromClaims(jwts.extractClaimsFromToken(passwordUpdate, TokenType.PASSWORD_UPDATE).get()).get());
//    System.out.println(jwts.extractUserNameFromClaims(jwts.extractClaimsFromToken(access, TokenType.ACCESS).get()).get());
//    System.out.println(jwts.extractUserEmailFromClaims(jwts.extractClaimsFromToken(access, TokenType.ACCESS).get()).get());
//  }
