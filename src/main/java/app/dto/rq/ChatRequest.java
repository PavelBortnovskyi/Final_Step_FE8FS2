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
  @JsonView({Marker.Existed.class, Marker.ChatDetails.class, Marker.Delete.class, Marker.Details.class})
  @NotNull(message = "Need to specify chatId", groups = {Marker.Existed.class, Marker.ChatDetails.class, Marker.Delete.class, Marker.Details.class})
  @Null(groups = {Marker.New.class})
  private Long chatId;

  @ApiModelProperty(value = "Initiator userID", example = "13", required = true)
  @JsonView({Marker.New.class, Marker.Existed.class, Marker.Delete.class})
  @NotNull(message = "Need to specify initiator userId", groups = {Marker.Existed.class, Marker.New.class, Marker.Delete.class})
  private Long initiatorUserId;

  @ApiModelProperty(value = "Initiator userID", example = "55", required = true)
  @JsonView({Marker.New.class})
  @NotNull(message = "Need to specify interlocutor userId", groups = {Marker.New.class})
  private Long interlocutorUserId;

  @ApiModelProperty(value = "Page size for message quantity definition", example = "20", required = true)
  @JsonView({Marker.Existed.class, Marker.Preview.class})
  @NotNull(message = "Need to specify messages q-ty", groups = {Marker.Existed.class, Marker.Preview.class})
  @Null(groups = {Marker.New.class})
  private Integer pageSize;

  @ApiModelProperty(value = "Page number", example = "5", required = true)
  @JsonView({Marker.Existed.class, Marker.Preview.class})
  @NotNull(message = "Page number", groups = {Marker.Existed.class, Marker.Preview.class})
  @Null(groups = {Marker.New.class})
  private Integer pageNumber;
}
