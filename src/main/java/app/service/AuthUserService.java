package app.service;

import app.exceptions.httpError.BadRequestException;
import app.model.UserModel;
import app.security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthUserService {

  private final UserService userService;


  public JwtUserDetails getUserDetails() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof JwtUserDetails)
      return (JwtUserDetails) authentication.getPrincipal();
    else return new JwtUserDetails(0L, "Zero@mail.net");
  }

  public Long getCurrUserId() {
    return getUserDetails().getId();
  }


  public UserModel getCurrUser() {
    return getCurrUserId() != 0 ? userService.getUser(getCurrUserId()) : null;
  }

//  public byte[] fizzbuzz(int value) throws BadRequestException {
//    String result = (value % 3 == 0) ? "Fizz" : null;
//    result += (value % 5 == 0) ? "Buzz" : null;
//    Optional<String> re = Optional.of(result);
//    return re.orElseThrow(() -> new BadRequestException("dsfds")).getBytes();
//    if (result.length() != 0) return result.getBytes();
//    else throw new BadRequestException("dsfgfdg");
//    }
}
