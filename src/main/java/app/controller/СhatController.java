package app.controller;

import app.annotations.Marker;
import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.userError.UserNotFoundException;
import app.facade.ChatFacade;
import app.facade.UserModelFacade;
import app.model.Chat;
import app.model.UserModel;
import app.service.ChatService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
@Validated
public class СhatController {
  private final ChatFacade chatFacade;

  private final UserModelFacade userFacade;

  private final ChatService chatService;

  private final UserModelService userService;

  @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ChatResponse> handleCreate(HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    UserModel currUser = this.userService.findById(currUserId).orElseThrow(() -> new UserNotFoundException(currUserId));
    Chat freshChat = new Chat(currUser, null, new HashSet<>() {{add(currUser);}});
    return ResponseEntity.ok(this.chatFacade.save(freshChat));
  }

  @PostMapping(path = "/add/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ChatResponse> handleAdd(@PathVariable("id") Long userIdToAdd,
                                                @RequestBody @JsonView(Marker.ChatDetails.class)
                                                @Valid ChatRequest chatDTO,
                                                HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    UserModel currUser = this.userService.findById(currUserId).orElseThrow(() -> new UserNotFoundException(currUserId));
    UserModel userToAdd = this.userService.findById(userIdToAdd).orElseThrow(() -> new UserNotFoundException(userIdToAdd));
    Chat chatToUpdate = this.chatService.findById(chatDTO.getChatId()).orElseThrow(() -> new ChatNotFoundException(""));
    chatToUpdate.getUsers().add(userToAdd);
    return ResponseEntity.ok(this.chatFacade.save(chatToUpdate));
  }

  //TODO: add Pageable support
  @Validated({Marker.forExisted.class})
  @GetMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ChatResponse> handleGetChat(@PathVariable(name = "id") Long chatId,
                                                    @RequestBody @JsonView(Marker.forExisted.class)
                                                    @Valid ChatRequest chatDTO, HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatFacade.convertToDto(this.chatService.findById(chatId)
      .filter(chat -> chat.getUsers().contains(this.userService.findById(chatDTO.getInitiatorUserId())
        .orElseThrow(() -> new UserNotFoundException(currUserId))) || chat.getInitiatorUser().getId().equals(currUserId))
      .orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d bot found", chatId, currUserId)))));
  }
}
