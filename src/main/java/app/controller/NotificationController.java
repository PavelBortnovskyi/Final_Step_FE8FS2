package app.controller;

import app.annotations.Marker;
import app.dto.rs.NotificationResponse;
import app.exceptions.httpError.BadRequestException;
import app.facade.NotificationFacade;
import app.service.NotificationService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {

  private final NotificationService notificationService;

  private final NotificationFacade notificationFacade;

  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.Existed.class}) ResponseEntity<List<NotificationResponse>> handleGetAllUserNotifications(HttpServletRequest request,
                                                                                                                    @RequestParam("page") Integer page,
                                                                                                                    @RequestParam("pageSize") Integer pageSize) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("useId");
    return ResponseEntity.ok(this.notificationService.getUserNotifications(currUserId, pageSize, page - 1)
      .stream().map(this.notificationFacade::convertToDto).collect(Collectors.toList()));
  }

  @GetMapping(path = "/seen", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.Existed.class}) ResponseEntity<List<NotificationResponse>> handleGetSeenUserNotifications(HttpServletRequest request,
                                                                                                                     @RequestParam("page") Integer page,
                                                                                                                     @RequestParam("pageSize") Integer pageSize) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("useId");
    return ResponseEntity.ok(this.notificationService.getUserSeenNotificationsList(currUserId, pageSize, page - 1)
      .stream().map(this.notificationFacade::convertToDto).collect(Collectors.toList()));
  }

  @GetMapping(path = "/unseen", produces = MediaType.APPLICATION_JSON_VALUE)
  public @JsonView({Marker.Existed.class}) ResponseEntity<List<NotificationResponse>> handleGetUnSeenUserNotifications(HttpServletRequest request,
                                                                                                                       @RequestParam("page") Integer page,
                                                                                                                       @RequestParam("pageSize") Integer pageSize) {
    if (pageSize <= 0 && page <= 0) throw new BadRequestException("Page number and page size must be > 0");
    Long currUserId = (Long) request.getAttribute("useId");
    return ResponseEntity.ok(this.notificationService.getUserUnreadNotificationsList(currUserId, pageSize, page - 1).stream()
      .map(this.notificationFacade::convertToDto).collect(Collectors.toList()));
  }
}
