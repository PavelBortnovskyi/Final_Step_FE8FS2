package app.dto.rs;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel("Attachment image response DTO")
public class AttachmentImageResponseDTO {
  @JsonIgnore
  private Long tweetId;

  @JsonView(Marker.Preview.class)
  private String imgUrl;
}
