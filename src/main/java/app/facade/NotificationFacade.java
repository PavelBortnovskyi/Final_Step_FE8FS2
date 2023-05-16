package app.facade;

import app.dto.rq.NotificationRequest;
import app.dto.rs.NotificationResponse;
import app.model.Notification;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NotificationFacade extends GeneralFacade<Notification, NotificationRequest, NotificationResponse> {
}
