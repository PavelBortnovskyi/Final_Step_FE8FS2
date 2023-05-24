package app.controller;

import app.model.Message;
import app.service.ChatService;
import app.service.JwtTokenService;
import app.service.MessageService;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

  private final UserModelService userService;

  private final PasswordEncoder encoder;

  private final JwtTokenService jwtTokenService;

  private final AuthenticationManager authenticationManager;

  private final MessageService messageService;

  private final ChatService chatService;

  @PostMapping(value = "/addMessages", produces = MediaType.APPLICATION_JSON_VALUE)
  public void extractId() throws InterruptedException {
    this.messageService.save(new Message(this.chatService.findById(1L).get(), this.userService.getUserO(3L).get(), "Hi my friends!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(2L).get(), this.userService.getUserO(3L).get(), "Hi all!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(1L).get(), this.userService.getUserO(1L).get(), "Hello!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(2L).get(), this.userService.getUserO(2L).get(), "Hello Nigga!", LocalDateTime.now()));
  }
}
