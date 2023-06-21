package app.controller;

import app.annotations.Marker;
import app.dto.rs.NotificationResponseDTO;
import app.facade.NotificationFacade;
import app.service.AuthUserService;
import app.utils.CustomPageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetAllUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                               @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    return this.notificationFacade.getAllUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user seen notifications in page format
   */
  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/seen", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetSeenUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                                @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    return this.notificationFacade.getSeenUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }

  /**
   * This endpoint waiting for valid url params to return all user not seen notifications in page format
   */
  @JsonView({Marker.Preview.class})
  @GetMapping(path = "/unseen", produces = MediaType.APPLICATION_JSON_VALUE)
  public CustomPageImpl<NotificationResponseDTO> handleGetUnSeenUserNotifications(@RequestParam("page") @NotNull Integer page,
                                                                                  @RequestParam("pageSize") @NotNull @Positive Integer pageSize) {
    return this.notificationFacade.getUnseenUserNotifications(authUserService.getCurrUserId(), pageSize, page);
  }
}
