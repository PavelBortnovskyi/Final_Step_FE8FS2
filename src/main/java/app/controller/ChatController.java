package app.controller;

import app.annotations.Marker;
import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.dto.rs.MessageResponse;
import app.exceptions.chatError.ChatNotFoundException;
import app.exceptions.httpError.BadRequestException;
import app.exceptions.userError.UserNotFoundException;
import app.facade.ChatFacade;
import app.facade.MessageFacade;
import app.service.ChatService;
import app.service.UserModelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
@Validated
public class ChatController {
  private final ChatFacade chatFacade;

  private final MessageFacade messageFacade;

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
      return ResponseEntity.ok(String.format("User with id: %d was removed from chat id: %d by chat initiator id: %d", userIdToRemove, chatDTO.getChatId(), currUserId));
    else
      return ResponseEntity.badRequest().body(String.format("Error in attempt to remove user with id: %d from chat id: %d by user with id: %d", userIdToRemove, chatDTO.getChatId(), currUserId));
  }

  //@Validated({Marker.Preview.class})
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.ChatDetails.class}) ResponseEntity<List<ChatResponse>> handleGetChatsForPreview(HttpServletRequest request,
                                                                                                           @RequestParam("page") Integer page,
                                                                                                           @RequestParam("pageSize") Integer pageSize) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatService.getUserChatsWithLastMessage(currUserId, pageSize, page - 1)
      .stream()
      .map(this.chatFacade::convertToDto)
      .collect(Collectors.toList()));
  }

//  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
//  public @JsonView({Marker.ChatDetails.class}) ResponseEntity<Page<ChatResponse>> handleGetChatsForPreview(HttpServletRequest request,
//                                                                                                           @RequestParam("page") Integer page,
//                                                                                                           @RequestParam("pageSize") Integer pageSize) {
//    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
//    Long currUserId = (Long) request.getAttribute("userId");
//    return ResponseEntity.ok(this.chatService.getUserChatsWithLastMessage(currUserId, pageSize, page - 1));
//      //.stream()
//      //.map(this.chatFacade::convertToDto).collect(Collectors.toList())));
//  }

  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/messages", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.ChatDetails.class}) ResponseEntity<List<MessageResponse>> handleGetChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                             @Valid ChatRequest chatDTO, HttpServletRequest request,
                                                             @RequestParam("page") Integer page,
                                                             @RequestParam("pageSize") Integer pageSize) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("userId");
    this.chatService.findById(chatDTO.getChatId())
      .filter(chat -> chat.getUsers().contains(this.userService.findById(currUserId)
        .orElseThrow(() -> new UserNotFoundException(currUserId))))
      .orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatDTO.getChatId(), currUserId)));
    return ResponseEntity.ok(this.chatService.getMessages(chatDTO.getChatId(), pageSize, page - 1)
      .stream()
      .map(this.messageFacade::convertToDto).collect(Collectors.toList()));
//    return ResponseEntity.ok(this.chatFacade.convertToDto(this.chatService.findById(chatId)
//      .filter(chat -> chat.getUsers().contains(this.userService.findById(chatDTO.getInitiatorUserId())
//        .orElseThrow(() -> new UserNotFoundException(currUserId))) || chat.getInitiatorUser().getId().equals(currUserId))
//      .map(chat -> {
//        chat.setMessages(this.chatService.getMessages(chatDTO.getChatId(), chatDTO.getPageSize(), chatDTO.getPageNumber() - 1));
//        return chat;
//      }).orElseThrow(() -> new ChatNotFoundException(String.format("Chat id: %d for user with id: %d not found", chatId, currUserId)))));
  }

  @Validated({Marker.ChatDetails.class})
  @PostMapping(path = "/messages/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.ChatDetails.class}) ResponseEntity<List<MessageResponse>> handleGetSearchResultFromChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                                             @Valid ChatRequest chatDTO, HttpServletRequest request,
                                                                             @RequestParam("page") Integer page,
                                                                             @RequestParam("pageSize") Integer pageSize,
                                                                             @RequestParam("keyword") String keyword) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatService.searchMessageInChat(chatDTO.getChatId(), currUserId, pageSize, page - 1, keyword)
      .stream()
      .map(this.messageFacade::convertToDto).collect(Collectors.toList()));
  }

  @PostMapping(path = "/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.ChatDetails.class}) ResponseEntity<List<MessageResponse>> handleGetSearchResultFromChats(HttpServletRequest request,
                                                                                                                   @RequestParam("page") Integer page,
                                                                                                                   @RequestParam("pageSize") Integer pageSize,
                                                                                                                   @RequestParam("keyword") String keyword) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatService.searchMessageInChats(currUserId, pageSize, page - 1, keyword)
      .stream()
      .map(this.messageFacade::convertToDto).collect(Collectors.toList()));
  }
}
