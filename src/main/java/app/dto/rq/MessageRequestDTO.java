package app.dto.rq;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@ApiModel(description = "Chat request")
public class MessageRequestDTO {

  @JsonView({Marker.Delete.class, Marker.Existed.class})
  @NotNull(message = "Message id must be specified", groups = {Marker.Delete.class, Marker.Existed.class})
  @Null(groups = {Marker.New.class, Marker.Existed.class})
  private Long id;

  @JsonView({Marker.New.class, Marker.Existed.class})
  @NotNull(message = "Chat id must be specified", groups = {Marker.New.class, Marker.Existed.class})
  private Long chatId;

  @JsonView({Marker.New.class, Marker.Existed.class})
  @NotNull(message = "Message author must be specified", groups = {Marker.New.class, Marker.Existed.class})
  private Long userId;

  @JsonView({Marker.New.class, Marker.Existed.class})
  @Size(min = 1, max = 4096, message = "Message body length must be in range 1..4096 characters", groups = {Marker.New.class, Marker.Existed.class})
  private String body;

  private LocalDateTime sent = LocalDateTime.now();
}
