package app.dto.rq;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@ApiModel(description = "Chat request")
public class ChatRequest {

  @JsonView({Marker.forExisted.class, Marker.ChatDetails.class})
  @NotNull(message = "Need to specify chatId", groups = {Marker.forExisted.class, Marker.ChatDetails.class})
  @Null(groups = {Marker.forNew.class})
  private Long chatId;

  @JsonView({Marker.forNew.class, Marker.forExisted.class})
  @NotNull(message = "Need to specify initiator userId", groups = {Marker.forExisted.class, Marker.forNew.class})
  private Long initiatorUserId;

  @JsonView(Marker.forExisted.class)
  @NotNull(message = "Need to specify messages q-ty", groups = {Marker.forExisted.class})
  @Null(groups = {Marker.forNew.class})
  private Integer pageSize;
}
