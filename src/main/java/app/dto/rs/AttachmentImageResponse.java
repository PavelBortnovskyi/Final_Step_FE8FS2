package app.dto.rs;

import lombok.Data;

@Data
public class AttachmentImageResponse {

  private Long tweetId;
  private String imgUrl;
}
