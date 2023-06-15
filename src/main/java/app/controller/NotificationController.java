package app.controller;

import app.annotations.Marker;
import app.dto.rs.NotificationResponse;
import app.facade.NotificationFacade;
import app.utils.CustomPageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;


@CrossOrigin
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {

  private final NotificationFacade notificationFacade;

  /**
   * This endpoint waiting for valid url params to return all user notifications in page format
   */

  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponse> handleGetAllUserNotifications(HttpServletRequest request,
                                                                            @RequestParam("page") @NotNull Integer page,
                                                                            @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.notificationFacade.getAllUserNotifications(currUserId, pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user seen notifications in page format
   */
  @GetMapping(path = "/seen", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<NotificationResponse> handleGetSeenUserNotifications(HttpServletRequest request,
                                                                   @RequestParam("page") @NotNull Integer page,
                                                                   @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.notificationFacade.getSeenUserNotifications(currUserId, pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user not seen notifications in page format
   */
  @GetMapping(path = "/unseen", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<NotificationResponse> handleGetUnSeenUserNotifications(HttpServletRequest request,
                                                                     @RequestParam("page") @NotNull Integer page,
                                                                     @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("userId");
    return this.notificationFacade.getUnseenUserNotifications(currUserId, pageSize, page);
  }
}
