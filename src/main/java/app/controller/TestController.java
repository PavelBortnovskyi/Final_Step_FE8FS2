package app.controller;

import app.facade.AuthFacade;
import app.model.Message;
import app.model.UserModel;
import app.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

  private final UserModelService userService;

  private final PasswordEncoder encoder;

  private final JwtTokenService jwtTokenService;

  private final AuthenticationManager authenticationManager;

  private final AuthFacade authFacade;

  private final MessageService messageService;

  private final ChatService chatService;

  @PostMapping(value = "/addMessages", produces = MediaType.APPLICATION_JSON_VALUE)
  public void handleAddMessages() throws InterruptedException {
    this.chatService.createChat(3L, 1L);
    this.chatService.createChat(3L, 2L);
    this.messageService.save(new Message(this.chatService.findById(1L).get(), this.userService.getUserO(3L).get(), "Hi my friends!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(2L).get(), this.userService.getUserO(3L).get(), "Hi all!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(1L).get(), this.userService.getUserO(1L).get(), "Hello!", LocalDateTime.now()));
    Thread.sleep(2000);
    this.messageService.save(new Message(this.chatService.findById(2L).get(), this.userService.getUserO(2L).get(), "Hello there!", LocalDateTime.now()));
  }

  @PostMapping(value = "/initUsers", produces = MediaType.APPLICATION_JSON_VALUE)
  public void handleInitUsers() {
    UserModel sample1 = new UserModel();
    UserModel sample2 = new UserModel();
    UserModel sample3 = new UserModel();
    UserModel sample4 = new UserModel();
    UserModel sample5 = new UserModel();

    sample1.setFullName("User1 Petrovich");
    sample1.setUserTag("@user1Tag");
    sample1.setPassword(encoder.encode("11111111"));
    sample1.setEmail("user1@gmail.com");
    sample1.setBio("man");
    sample1.setBirthDate(LocalDate.of(1995, 02, 11));
    sample1.setLocation("London");
    sample1.setVerified(true);
    sample1.setRefreshToken("11111111111");

    sample2.setFullName("User2 Vasilevich");
    sample2.setUserTag("@user2Tag");
    sample2.setPassword(encoder.encode("11111111"));
    sample2.setEmail("user2@gmail.com");
    sample2.setBio("man");
    sample2.setBirthDate(LocalDate.of(1985, 05, 12));
    sample2.setLocation("Kyiv");
    sample2.setVerified(true);
    sample2.setRefreshToken("11111111111");

    sample3.setFullName("User3 Genadevich");
    sample3.setUserTag("@user3Tag");
    sample3.setPassword(encoder.encode("11111111"));
    sample3.setEmail("user3@gmail.com");
    sample3.setBio("man");
    sample3.setBirthDate(LocalDate.of(1975, 05, 12));
    sample3.setLocation("Lviv");
    sample3.setVerified(true);
    sample3.setRefreshToken("11111111111");

    sample4.setFullName("User4 Mukolaivna");
    sample4.setUserTag("@user4Tag");
    sample4.setPassword(encoder.encode("11111111"));
    sample4.setEmail("user4@gmail.com");
    sample4.setBio("woman");
    sample4.setBirthDate(LocalDate.of(2000, 05, 12));
    sample4.setLocation("Paris");
    sample4.setVerified(true);
    sample4.setRefreshToken("11111111111");

    sample5.setFullName("User5 Nikitichna");
    sample5.setUserTag("@user5Tag");
    sample5.setPassword(encoder.encode("11111111"));
    sample5.setEmail("user5@gmail.com");
    sample5.setBio("woman");
    sample5.setBirthDate(LocalDate.of(2010, 05, 12));
    sample5.setLocation("London");
    sample5.setVerified(true);
    sample5.setRefreshToken("11111111111");

    this.authFacade.generateTokenPair(this.userService.save(sample1));
    this.authFacade.generateTokenPair(this.userService.save(sample2));
    this.authFacade.generateTokenPair(this.userService.save(sample3));
    this.authFacade.generateTokenPair(this.userService.save(sample4));
    this.authFacade.generateTokenPair(this.userService.save(sample5));

    this.userService.subscribe(1L, 3L);
    this.userService.subscribe(1L, 4L);
    this.userService.subscribe(2L, 1L);
    this.userService.subscribe(3L, 1L);
    this.userService.subscribe(3L, 4L);
    this.userService.subscribe(5L, 1L);
    this.userService.subscribe(5L, 2L);
    this.userService.subscribe(5L, 3L);
    this.userService.subscribe(5L, 4L);
  }

//  @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
//  public List<Page> handleSearch(HttpServletRequest request,
//                                 @RequestParam("page") @NotNull @Positive Integer page,
//                                 @RequestParam("pageSize") @NotNull @Positive Integer pageSize,
//                                 @RequestParam("keyword") @NotNull String keyword,
//                                 @RequestParam("id") Long currUserId) {
//    return this.chatService.getSearchResult(currUserId, pageSize, page, keyword);
//  }
}
