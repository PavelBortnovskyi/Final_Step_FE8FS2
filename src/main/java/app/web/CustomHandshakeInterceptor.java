//package app.web;
//
//import app.enums.TokenType;
//import app.exceptions.authError.JwtAuthenticationException;
//import app.security.JwtUserDetails;
//import app.service.JwtTokenService;
//import com.nimbusds.jose.util.Pair;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.ServerHttpRequest;
//import org.springframework.http.server.ServerHttpResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.server.HandshakeInterceptor;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Map;
//import java.util.Optional;
//
//@Component
//@RequiredArgsConstructor
//public class CustomHandshakeInterceptor implements HandshakeInterceptor {
//
//  public final JwtTokenService jwtTokenService;
//
//
//  @Override
//  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
//                                 WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//
//    HttpServletRequest httpRequest = (HttpServletRequest) request;
//
//    String token = this.jwtTokenService.extractTokenFromRequest(httpRequest).orElseThrow(() -> new JwtAuthenticationException("Token not found!"));
//
//    if (!token.isEmpty()) {
//      if (this.jwtTokenService.validateToken(token, TokenType.ACCESS)) {
//        this.processHttpRequestWithToken(httpRequest, token);
//        return true;
//      } else {
//        response.setStatusCode(HttpStatus.UNAUTHORIZED);
//        return true;
//      }
//    }
//      return true;
//  }
//
//  private void processHttpRequestWithToken(HttpServletRequest request, String token) {
//    try {
//      this.jwtTokenService.extractClaimsFromToken(token, TokenType.ACCESS)
//        .flatMap(claims -> {
//          Long userId = this.jwtTokenService.extractIdFromClaims(claims).get();
//          String username = this.jwtTokenService.extractUserEmailFromClaims(claims).get();
//          return Optional.of(Pair.of(userId, username));
//        })
//        .map(pair -> new JwtUserDetails(pair.getLeft(), pair.getRight()))
//        .map(ud -> new UsernamePasswordAuthenticationToken(ud, "", ud.getAuthorities()))
//        .ifPresent((UsernamePasswordAuthenticationToken auth) -> {
//          auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//          SecurityContextHolder.getContext().setAuthentication(auth);
//        });
//    } catch (Exception e) {
//      throw new JwtAuthenticationException("Authentication failed with: " + e.getMessage());
//    }
//  }
//
//
//  @Override
//  public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
//
//  }
//}
