package app.service;

import app.model.AttachmentImage;
import app.model.Tweet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AttachmentImagesService extends GeneralService<AttachmentImage> {
  private final CloudinaryService cloudinaryService;

  //add
  //delete
  public AttachmentImage createAttachmentImage(String url, Tweet tweet) {
    AttachmentImage attachmentImage = new AttachmentImage(tweet, url);
    save(attachmentImage);
    return attachmentImage;
  }

  public void saveAttachmentImages(HashSet<String> urls, Tweet tweet){
    urls.forEach(url -> save(new AttachmentImage(tweet, url)));
  }
 
}
