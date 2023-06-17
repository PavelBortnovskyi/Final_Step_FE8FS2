package app.controller;

import app.annotations.Marker;
import app.dto.rs.ChatResponseDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.httpError.BadRequestException;
import app.facade.ChatFacade;
import app.utils.CustomPageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Set;

@CrossOrigin
@Log4j2
@RestController
@RequestMapping("/api/v1/chat")
@Validated
public class ChatController {
  @Autowired
  private ChatFacade chatFacade;

  /**
   * This endpoint waiting for valid url params and token to return created chat response
   */
  @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<Set<ChatResponseDTO>> handleCreateChat(@RequestParam("interlocutorId")
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
    if (!this.chatFacade.deleteChat(chatId, currUserId))
      return ResponseEntity.ok("Chat id: " + chatId + " deleted");
    else return ResponseEntity.badRequest().body("Can not delete chat id: " + chatId);
  }

  /**
   * This endpoint waiting for valid url params to add user to chat and return updated chat response
   */
  //TODO: discuss who can perform that operation
  @Validated({Marker.ChatDetails.class})
  @PutMapping(path = "/{id}/user_add", produces = MediaType.APPLICATION_JSON_VALUE)
  @JsonView(Marker.ChatDetails.class)
  public ResponseEntity<ChatResponseDTO> handleAddUserToChat(@RequestParam("userId")
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
    return this.chatFacade.removeUserFromChat(userIdToRemove, currUserId, chatId);
  }

  /**
   * This endpoint waiting for valid url params and token to return all user chats with last messages in page format to preview
   */

  @JsonView(value = Marker.ChatDetails.class)
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<ChatResponseDTO> handleGetChatsForPreview(HttpServletRequest request,
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
  public Page<MessageResponseDTO> handleGetChat(@PathVariable(name = "id") Long chatId, HttpServletRequest request,
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
  @GetMapping(path = "/{id}/messages/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponseDTO> handleGetSearchResultFromChat(@PathVariable(name = "id") Long chatId, HttpServletRequest request,
                                                                @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class) Integer page,
                                                                @RequestParam("pageSize") @NotNull(groups = Marker.ChatDetails.class)
                                                                @Positive(groups = Marker.ChatDetails.class) Integer pageSize,
                                                                @RequestParam("keyword") String keyword) {
    if (keyword.isEmpty() || keyword.isBlank()) {
      throw new BadRequestException("Keyword cannot be empty");
    }
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.searchMessagesInChat(chatId, currUserId, pageSize, page, keyword);
  }

  /**
   * This endpoint waiting for valid url params and token to return page with search result in all user chats
   */
  @GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponseDTO> handleGetSearchResultFromChats(HttpServletRequest request,
                                                                 @RequestParam("page") @NotNull Integer page,
                                                                 @RequestParam("pageSize") @NotNull @Positive Integer pageSize,
                                                                 @RequestParam("keyword") String keyword) {
    if (keyword.isEmpty() || keyword.isBlank()) {
      throw new BadRequestException("Keyword cannot be empty");
    }
    Long currUserId = (Long) request.getAttribute("userId");
    return this.chatFacade.searchMessagesInChats(currUserId, pageSize, page, keyword);
  }
}
