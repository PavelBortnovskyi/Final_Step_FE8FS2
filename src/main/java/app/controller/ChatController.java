package app.controller;

import app.annotations.Marker;
import app.dto.rs.ChatResponseDTO;
import app.dto.rs.MessageResponseDTO;
import app.exceptions.httpError.BadRequestException;
import app.facade.ChatFacade;
import app.service.AuthUserService;
import app.utils.CustomPageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Set;

@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@Log4j2
@RestController
@RequestMapping("/api/v1/chat")
@Validated
@RequiredArgsConstructor
public class ChatController {
  private final ChatFacade chatFacade;

  private final AuthUserService authUserService;

  /**
   * This endpoint waiting for valid url params and token to return created chat response
   */
  @ApiOperation("Create chat by current user")
  @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView(Marker.ChatDetails.class) ResponseEntity<Set<ChatResponseDTO>> handleCreateChat(@RequestParam("interlocutorId")
                                                                                                   @NotNull @Positive Long interlocutorId) {
    return ResponseEntity.ok(chatFacade.createChat(authUserService.getCurrUserId(), interlocutorId));
  }

  /**
   * This endpoint returns chat by id from path variable with checking
   */
  @ApiOperation("Get chat by id")
  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ChatResponseDTO> handleGetChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                       @PathVariable(name = "id") Long chatId) {
    return ResponseEntity.ok(chatFacade.getChatById(chatId, authUserService.getCurrUserId()));
  }

  /**
   * This endpoint waiting for valid url params and token to delete chat (can be deleted only by chat initiator!)
   */
  @ApiOperation("Delete chat by id")
  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleDeleteChat(@RequestBody @JsonView(Marker.ChatDetails.class)
                                                 @PathVariable(name = "id") Long chatId) {
    if (!chatFacade.deleteChat(chatId, authUserService.getCurrUserId()))
      return ResponseEntity.ok("Chat id: " + chatId + " deleted");
    else return ResponseEntity.badRequest().body("Can not delete chat id: " + chatId);
  }


  /**
   * This endpoint waiting for valid url params to add user to chat and return updated chat response
   */
  //TODO: discuss who can perform that operation
  @ApiOperation("Add user to chat")
  @Validated({Marker.ChatDetails.class})
  @PutMapping(path = "/{id}/user_add", produces = MediaType.APPLICATION_JSON_VALUE)
  @JsonView(Marker.ChatDetails.class)
  public ResponseEntity<ChatResponseDTO> handleAddUserToChat(@RequestParam("userId")
                                                             @NotNull(groups = Marker.ChatDetails.class)
                                                             @Positive(groups = Marker.ChatDetails.class)
                                                             Long userIdToAdd,
                                                             @PathVariable(name = "id") Long chatId) {
    return ResponseEntity.ok(chatFacade.addUserToChat(userIdToAdd, chatId));
  }

  /**
   * This endpoint waiting for valid url params, DTO and token to remove user from chat (can be performed only by chat initiator)
   */
  //TODO: discuss who can perform that operation
  @ApiOperation("Delete user from chat")
  @Validated({Marker.ChatDetails.class})
  @DeleteMapping(path = "/{id}/user_remove", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> handleRemoveUserFromChat(@RequestParam("userId") Long userIdToRemove,
                                                         @PathVariable(name = "id") Long chatId) {
    return chatFacade.removeUserFromChat(userIdToRemove, authUserService.getCurrUserId(), chatId);
  }

  /**
   * This endpoint waiting for valid url params and token to return all user chats with last messages in page format to preview
   */
  @ApiOperation("Get all current user chats (pageable)")
  @JsonView(value = Marker.ChatDetails.class)
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<ChatResponseDTO> handleGetChatsForPreview(HttpServletRequest request,
                                                                  @RequestParam("page") @NotNull Integer page,
                                                                  @RequestParam("size") @NotNull @Positive Integer pageSize) {
    return chatFacade.getChatsForPreview(authUserService.getCurrUserId(), pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params and token to return all messages in chat in page format
   * (only user that participates the chat can get messages)
   */
  @ApiOperation("Get all messages from chat with id (pageable)")
  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/{id}/messages", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponseDTO> handleGetChatMessages(@PathVariable(name = "id") Long chatId,
                                                        @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class) Integer page,
                                                        @RequestParam("size") @NotNull(groups = Marker.ChatDetails.class)
                                                        @Positive(groups = Marker.ChatDetails.class) Integer pageSize) {
    return chatFacade.getChatMessages(authUserService.getCurrUserId(), chatId, pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params and token to return page with search result in chat
   */
  @ApiOperation("Search messages by keyword in current user chat with id (pageable)")
  @Validated({Marker.ChatDetails.class})
  @GetMapping(path = "/{id}/messages/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponseDTO> handleGetSearchResultFromChat(@PathVariable(name = "id") Long chatId,
                                                                @RequestParam("page") @NotNull(groups = Marker.ChatDetails.class) Integer page,
                                                                @RequestParam("size") @NotNull(groups = Marker.ChatDetails.class)
                                                                @Positive(groups = Marker.ChatDetails.class) Integer pageSize,
                                                                @RequestParam("keyword") String keyword) {
    if (keyword.isEmpty() || keyword.isBlank()) {
      throw new BadRequestException("Keyword cannot be empty");
    }
    return chatFacade.searchMessagesInChat(chatId, authUserService.getCurrUserId(), pageSize, page, keyword);
  }

  /**
   * This endpoint waiting for valid url params and token to return page with search result in all user chats
   */


  @ApiOperation("Search messages by keyword in user chats (pageable)")
  @GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<MessageResponseDTO> handleGetSearchResultFromChats(HttpServletRequest request,
                                                                 @RequestParam("page") @NotNull Integer page,
                                                                 @RequestParam("size") @NotNull @Positive Integer pageSize,
                                                                 @RequestParam("keyword") String keyword) {
    if (keyword.isEmpty() || keyword.isBlank()) {
      throw new BadRequestException("Keyword cannot be empty");
    }
    return chatFacade.searchMessagesInChats(authUserService.getCurrUserId(), pageSize, page, keyword);
  }
}
