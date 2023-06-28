package app.service;

import app.model.AttachmentImage;
import app.model.Tweet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttachmentImagesService extends GeneralService<AttachmentImage> {


  public Set<AttachmentImage> saveAttachmentImages(HashSet<String> urls, Tweet tweet) {
    return urls.stream().map(url -> save(new AttachmentImage(tweet, url))).collect(Collectors.toSet());
  }

}
