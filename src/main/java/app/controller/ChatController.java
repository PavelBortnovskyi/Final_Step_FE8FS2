package app.controller;

import app.annotations.Marker;
import app.dto.rq.ChatRequest;
import app.dto.rs.ChatResponse;
import app.dto.rs.MessageResponse;
import app.facade.ChatFacade;
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

  /**
   * This endpoint waiting for valid url params and token to return created chat response
   */
  @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleCreateChat(@RequestParam("interlocutorId")
                                                                                           @NotNull @Positive Long interlocutorId,
                                                                                           HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    return ResponseEntity.ok(this.chatFacade.createChat(currUserId, interlocutorId));
  }

  /**
   * This endpoint waiting for valid url params and token to delete chat (can be deleted only by chat initiator!)
   */
  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleDeleteChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                 @PathVariable(name = "id") Long chatId,
                                                 HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.chatFacade.deleteChat(chatId, currUserId))
      return ResponseEntity.ok("Chat id: " + chatId + " deleted");
    else return ResponseEntity.badRequest().body("Can not delete chat id: " + chatId);
  }

  /**
   * This endpoint waiting for valid url params and DTO to add user to chat and return updated chat response
   */
  //TODO: discuss who can perform that operation
  @Validated({Marker.ChatDetails.class})
  @PutMapping(path = "/{id}/user_add", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<ChatResponse> handleAddUserToChat(@RequestParam("userId")
                                                                                              @NotNull(groups = Marker.ChatDetails.class)
                                                                                              @Positive(groups = Marker.ChatDetails.class)
                                                                                              Long userIdToAdd,
                                                                                              @PathVariable(name = "id") Long chatId) {
    return ResponseEntity.ok(this.chatFacade.addUserToChat(userIdToAdd, chatId));
  }

  /**
   * This endpoint waiting for valid url params, DTO and token to remove user from chat (can be performed only by chat initiator)
   */
  //TODO: discuss who can perform that operation
  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/{id}/user_remove", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleRemoveUserFromChat(@RequestParam("userId") Long userIdToRemove,
                                                         @PathVariable(name = "id") Long chatId,
                                                         HttpServletRequest request) {
    Long currUserId = (Long) request.getAttribute("userId");
    if (this.chatFacade.removeUserFromChat(userIdToRemove, currUserId, chatId))
      return ResponseEntity.ok(String.format("User with id: %d was removed from chat id: %d by chat initiator id: %d",
        userIdToRemove, chatId, currUserId));
    else
      return ResponseEntity.badRequest().body(String.format("Error in attempt to remove user with id: %d from chat id: %d by user with id: %d",
        userIdToRemove, chatId, currUserId));
  }

  /**
   * This endpoint waiting for valid url params and token to return all user chats with last messages in page format to preview
   */
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<ChatResponse> handleGetChatsForPreview(HttpServletRequest request,
                                                     @RequestParam("page") @NotNull Integer page,
                                                     @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.getChatsForPreview(currUserId, pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params and token to return all messages in chat in page format
   * (only user that participates the chat can get messages)
   */
  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/{id}/messages/", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetChat(@PathVariable(name = "id") Long chatId, HttpServletRequest request,
                                             @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class) Integer page,
                                             @RequestParam("pageSize") @NotNull(groups = Marker.ChatDetails.class)
                                             @Positive(groups = Marker.ChatDetails.class) Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.getChatMessages(currUserId, chatId, pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params and token to return page with search result in chat
   */
  @Validated({Marker.ChatDetails.class})
  @PostMapping(path = "/{id}/messages/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetSearchResultFromChat(@PathVariable(name = "id") Long chatId, HttpServletRequest request,
                                                             @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class) Integer page,
                                                             @RequestParam("pageSize") @NotNull(groups = Marker.ChatDetails.class)
                                                             @Positive(groups = Marker.ChatDetails.class) Integer pageSize,
                                                             @RequestParam("keyword") String keyword) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.searchMessagesInChat(chatId, currUserId, pageSize, page, keyword);
  }

  /**
   * This endpoint waiting for valid url params and token to return page with search result in all user chats
   */
  @PostMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponse> handleGetSearchResultFromChats(HttpServletRequest request,
                                                              @RequestParam("page") @NotNull Integer page,
                                                              @RequestParam("pageSize") @NotNull @Positive Integer pageSize,
                                                              @RequestParam("keyword") String keyword) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.searchMessagesInChats(currUserId, pageSize, page, keyword);
  }
}
