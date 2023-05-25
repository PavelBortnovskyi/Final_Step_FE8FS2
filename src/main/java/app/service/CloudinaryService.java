package app.service;

import app.exceptions.cloudinaryError.UploadImageException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class CloudinaryService {

  private final Cloudinary cloudinary;

  public boolean isImage(MultipartFile file) {
    String contentType = file.getContentType();
    return contentType != null && contentType.startsWith("image/");
  }

  public String uploadFile(MultipartFile file, String imgId) {
    if (!isImage(file)) throw new UploadImageException("Not image.");
    try {
      return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
        "public_id", imgId,
        "overwrite", true
      )).get("url").toString();
    } catch (IOException e) {
      throw new UploadImageException(imgId + ". " + e);
    }
  }

}
