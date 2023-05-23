package app.web;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
public class DeleteMessageNotification {
    private final Long messageId;
}