package app.service;

import app.model.AttachmentImage;
import app.model.Tweet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AttachmentImagesService extends GeneralService<AttachmentImage>{
  private final CloudinaryService cloudinaryService;
  //add
  //delete
  public AttachmentImage createAttachmentImage(MultipartFile file, Tweet tweet){
    return new AttachmentImage(tweet, cloudinaryService.uploadFile(file, tweet.getId() + "_" + file.hashCode()));
  }

  public void deleteAttachmentImage(AttachmentImage attachmentImage){
    delete(attachmentImage);
  }
}
