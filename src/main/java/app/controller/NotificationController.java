package app.controller;

import app.annotations.Marker;
import app.dto.rs.NotificationResponseDTO;
import app.facade.NotificationFacade;
import app.service.AuthUserService;
import app.utils.CustomPageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;


@CrossOrigin(originPatterns = {"http://localhost:3000", "https://final-step-fe-8-fs-2.vercel.app"})
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {

  private final NotificationFacade notificationFacade;

  private final AuthUserService authUserService;

  /**
   * This endpoint waiting for valid url params to return all user notifications in page format
   */

  @ApiOperation("Get all current user notifications (pageable)")
  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetAllUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                               @RequestParam("size") @NotNull @Positive Integer pageSize) {
    return notificationFacade.getAllUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user seen notifications in page format
   */
  @ApiOperation("Get all current user notifications marked as read (pageable)")
  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/seen", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetSeenUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                                @RequestParam("size") @NotNull @Positive Integer pageSize) {
    return notificationFacade.getSeenUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user not seen notifications in page format
   */
  @ApiOperation("Get all current user notifications marked as not read (pageable)")
  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/unseen", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetUnSeenUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                                  @RequestParam("size") @NotNull @Positive Integer pageSize) {
    return notificationFacade.getUnseenUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }
}
