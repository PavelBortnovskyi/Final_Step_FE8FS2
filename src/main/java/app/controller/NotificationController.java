package app.controller;

import app.dto.rs.NotificationResponse;
import app.service.NotificationService;
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

  private final NotificationService notificationService;

  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<NotificationResponse> handleGetAllUserNotifications(HttpServletRequest request,
                                                                  @RequestParam("page") @NotNull @Positive Integer page,
                                                                  @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("useId");
    return this.notificationService.getUserNotifications(currUserId, pageSize, page - 1);
  }

  @GetMapping(path = "/seen", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<NotificationResponse> handleGetSeenUserNotifications(HttpServletRequest request,
                                                                   @RequestParam("page") @NotNull @Positive Integer page,
                                                                   @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("useId");
    return this.notificationService.getUserSeenNotificationsList(currUserId, pageSize, page - 1);
  }

  @GetMapping(path = "/unseen", produces = MediaType.APPLICATION_JSON_VALUE)
  public Page<NotificationResponse> handleGetUnSeenUserNotifications(HttpServletRequest request,
                                                                     @RequestParam("page") @NotNull @Positive Integer page,
                                                                     @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    Long currUserId = (Long) request.getAttribute("useId");
    return this.notificationService.getUserUnreadNotificationsList(currUserId, pageSize, page - 1);
  }
}
