package app.dto.rq;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@ApiModel(description = "Tweet request form-data")
public class TweetRequestDTO {

  @ApiModelProperty(value = "Text of tweet", required = true)
  private String tweetBody;

  @ApiModelProperty(value = "Images of tweet.", required = true, dataType = "Array of MultipartFile")
  @NotNull
  private ArrayList<MultipartFile> attachmentImages;
}
