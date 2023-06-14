package app.dto.rs;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel("Attachment image response DTO")
public class AttachmentImageResponse {

  private Long tweetId;

  private String imgUrl;
}
