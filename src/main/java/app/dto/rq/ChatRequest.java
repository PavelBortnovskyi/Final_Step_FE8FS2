package app.dto.rq;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@ApiModel(description = "Chat request")
public class ChatRequest {

  @ApiModelProperty(value = "Chat id", example = "599", required = true)
  @JsonView({Marker.forExisted.class, Marker.ChatDetails.class, Marker.toDelete.class, Marker.Details.class})
  @NotNull(message = "Need to specify chatId", groups = {Marker.forExisted.class, Marker.ChatDetails.class, Marker.toDelete.class, Marker.Details.class})
  @Null(groups = {Marker.forNew.class})
  private Long chatId;

  @ApiModelProperty(value = "Initiator userID", example = "13", required = true)
  @JsonView({Marker.forNew.class, Marker.forExisted.class, Marker.toDelete.class})
  @NotNull(message = "Need to specify initiator userId", groups = {Marker.forExisted.class, Marker.forNew.class, Marker.toDelete.class})
  private Long initiatorUserId;

  @ApiModelProperty(value = "Initiator userID", example = "55", required = true)
  @JsonView({Marker.forNew.class})
  @NotNull(message = "Need to specify interlocutor userId", groups = {Marker.forNew.class})
  private Long interlocutorUserId;

  @ApiModelProperty(value = "Page size for message quantity definition", example = "20", required = true)
  @JsonView({Marker.forExisted.class, Marker.Preview.class})
  @NotNull(message = "Need to specify messages q-ty", groups = {Marker.forExisted.class, Marker.Preview.class})
  @Null(groups = {Marker.forNew.class})
  private Integer pageSize;

  @ApiModelProperty(value = "Page number", example = "5", required = true)
  @JsonView({Marker.forExisted.class, Marker.Preview.class})
  @NotNull(message = "Page number", groups = {Marker.forExisted.class, Marker.Preview.class})
  @Null(groups = {Marker.forNew.class})
  private Integer pageNumber;
}
