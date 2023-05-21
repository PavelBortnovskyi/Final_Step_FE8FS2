package app.controller;

import app.annotations.Marker;
import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
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
public class ChatController {
  private final ChatFacade chatFacade;

  private final UserModelFacade userFacade;

  private final ChatService chatService;

  private final UserModelService userService;

  @Validated
  @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleCreateChat(@RequestBody @JsonView(Marker.forNew.class)
                                                                                           @Valid ChatRequest chatDTO,
                                                                                           HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (currUserId.equals(chatDTO.getInterlocutorUserId()))
      throw new BadRequestException("Please find somebody else to chat except yourself!");
    return ResponseEntity.ok(this.chatFacade.convertToDto(this.chatService.createChat(currUserId, chatDTO.getInterlocutorUserId())));
  }

  @Validated
  @PostMapping(path = "/add/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleAddUserToChat(@PathVariable("id") Long userIdToAdd,
                                                                                              @RequestBody @JsonView(Marker.ChatDetails.class)
                                                                                              @Valid ChatRequest chatDTO,
                                                                                              HttpServletRequest request) {
    return ResponseEntity.ok(this.chatFacade.save(this.chatService.addUser(userIdToAdd, chatDTO.getChatId())));
  }

  @Validated({Marker.forExisted.class})
  @GetMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ChatResponse> handleGetChat(@PathVariable(name = "id") Long chatId,
                                                    @RequestBody @JsonView(Marker.forExisted.class)
                                                    @Valid ChatRequest chatDTO, HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatFacade.convertToDto(this.chatService.findById(chatId)
      .filter(chat -> chat.getUsers().contains(this.userService.findById(chatDTO.getInitiatorUserId())
        .orElseThrow(() -> new UserNotFoundException(currUserId))) || chat.getInitiatorUser().getId().equals(currUserId))
      .map(chat -> {
        chat.setMessages(this.chatService.getMessages(chatDTO.getChatId(), chatDTO.getPageSize(), chatDTO.getPageNumber()));
        return chat;
      }).orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d bot found", chatId, currUserId)))));
  }
}
