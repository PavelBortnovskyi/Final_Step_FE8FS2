package app.controller;

import app.annotations.Marker;
import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.dto.rs.MessageResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.facade.ChatFacade;
import app.service.ChatService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@CrossOrigin
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
@Validated
public class ChatController {
  private final ChatFacade chatFacade;

  private final ChatService chatService;

  private final UserModelService userService;

  //@Validated({Marker.New.class})
  @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleCreateChat(@RequestParam("interlocutorId") Long interlocutorId,
                                                                                           HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (currUserId.equals(interlocutorId))
      throw new BadRequestException("Please find somebody else to chat except yourself!");
    return ResponseEntity.ok(this.chatFacade.convertToDto(this.chatService.createChat(currUserId, interlocutorId)));
  }

  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleDeleteChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                 @Valid ChatRequest chatDTO,
                                                 HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.chatService.deleteChat(chatDTO.getChatId(), currUserId))
      return ResponseEntity.ok("Chat id: " + chatDTO.getChatId() + " deleted");
    else return ResponseEntity.badRequest().body("Can not delete chat id: " + chatDTO.getChatId());
  }

  @Validated({Marker.ChatDetails.class})
  @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleAddUserToChat(@RequestParam("userId") Long userIdToAdd,
                                                                                              @RequestBody @JsonView(Marker.ChatDetails.class)
                                                                                              @Valid ChatRequest chatDTO) {
    return ResponseEntity.ok(this.chatFacade.save(this.chatService.addUser(userIdToAdd, chatDTO.getChatId())));
  }

  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/remove", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleRemoveUserFromChat(@PathVariable("userId") Long userIdToRemove,
                                                         @RequestBody @JsonView(Marker.ChatDetails.class)
                                                         @Valid ChatRequest chatDTO, HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.chatService.removeUser(userIdToRemove, currUserId, chatDTO.getChatId()))
      return ResponseEntity.ok(String.format("User with id: %d was removed from chat id: %d by chat initiator id: %d",
        userIdToRemove, chatDTO.getChatId(), currUserId));
    else
      return ResponseEntity.badRequest().body(String.format("Error in attempt to remove user with id: %d from chat id: %d by user with id: %d",
        userIdToRemove, chatDTO.getChatId(), currUserId));
  }

  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<ChatResponse> handleGetChatsForPreview(HttpServletRequest request,
                                                     @RequestParam("page") @NotNull @Positive Integer page,
                                                     @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatService.getUserChatsWithLastMessage(currUserId, pageSize, page - 1);
  }

  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/messages", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                             @Valid ChatRequest chatDTO, HttpServletRequest request,
                                             @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class)
                                             @Positive(groups = Marker.ChatDetails.class) Integer page,
                                             @RequestParam("pageSize") @NotNull(groups = Marker.ChatDetails.class)
                                             @Positive(groups = Marker.ChatDetails.class) Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    this.chatService.findById(chatDTO.getChatId())
      .filter(chat -> chat.getUsers().contains(this.userService.findById(currUserId)
        .orElseThrow(() -> new UserNotFoundException(currUserId))))
      .orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatDTO.getChatId(), currUserId)));
    return this.chatService.getMessages(chatDTO.getChatId(), pageSize, page - 1);
  }

  @Validated({Marker.ChatDetails.class})
  @PostMapping(path = "/messages/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetSearchResultFromChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                             @Valid ChatRequest chatDTO, HttpServletRequest request,
                                                             @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class)
                                                             @Positive(groups = Marker.ChatDetails.class) Integer page,
                                                             @RequestParam("pageSize") @NotNull(groups = Marker.ChatDetails.class)
                                                             @Positive(groups = Marker.ChatDetails.class) Integer pageSize,
                                                             @RequestParam("keyword") String keyword) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatService.searchMessageInChat(chatDTO.getChatId(), currUserId, pageSize, page - 1, keyword);
  }

  @PostMapping(path = "/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetSearchResultFromChats(HttpServletRequest request,
                                                              @RequestParam("page") @NotNull @Positive Integer page,
                                                              @RequestParam("pageSize") @NotNull @Positive Integer pageSize,
                                                              @RequestParam("keyword") String keyword) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatService.searchMessageInChats(currUserId, pageSize, page - 1, keyword);
  }
}
