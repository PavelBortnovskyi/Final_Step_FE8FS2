package app.validation;

import app.dto.rq.UserModelRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class UserDtoValidator implements Validator {

  @Override
  public boolean supports(Class<?> clazz) {
    return UserModelRequest.class.isAssignableFrom(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    UserModelRequest userModelRequest = (UserModelRequest) target;

    ValidationUtils.rejectIfEmptyOrWhitespace(errors, "fullName", "NotEmpty");
    ValidationUtils.rejectIfEmptyOrWhitespace(errors, "userTag", "NotEmpty");
    ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "NotEmpty");

    if (userModelRequest.getFullName() != null && userModelRequest.getFullName().length() > 20) {
      errors.rejectValue("fullName", "Size", "Username length must be in range 2..20 characters");
    }

    if (userModelRequest.getUserTag() != null && userModelRequest.getUserTag().length() > 20) {
      errors.rejectValue("userTag", "Size", "UserTag length must be in range 2..20 characters");
    }

    if (userModelRequest.getEmail() != null && userModelRequest.getEmail().length() > 50) {
      errors.rejectValue("email", "Size", "Email length must be at most 50 characters");
    }

    if (userModelRequest.getPassword() != null && userModelRequest.getPassword().length() < 8) {
      errors.rejectValue("password", "Size", "Password length must be at least 8 characters");
    } else if (userModelRequest.getPassword() != null && userModelRequest.getPassword().length() > 50) {
      errors.rejectValue("password", "Size", "Password length must be at most 50 characters");
    }
  }
}

