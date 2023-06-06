package app.service;

import app.exceptions.cloudinaryError.UploadImageException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class CloudinaryService {

  private final Cloudinary cloudinary;

  public void checkImageType(MultipartFile file) {
    Map<String, ArrayList<Byte>> signatures = new HashMap<>();
    signatures.put("*.jpeg, *.jpg", new ArrayList<>(Arrays.asList((byte) 0xFF, (byte) 0xD8)));
    signatures.put("*.png", new ArrayList<>(Arrays.asList((byte) 0x89, (byte) 0x50, (byte) 0x4E, (byte) 0x47, (byte) 0x0D, (byte) 0x0A, (byte) 0x1A, (byte) 0x0A)));
    try {
      byte[] headerBytes = Arrays.copyOfRange(file.getBytes(), 0, 8);
      if (signatures.values().stream()
          .anyMatch(s -> IntStream.range(0, s.size())
              .allMatch(i -> s.get(i).equals(headerBytes[i]))
          )
      ) return;
    } catch (IOException ignored) {
    }
    throw new UploadImageException("Supported type: " + signatures.keySet());
  }

  public String uploadFile(MultipartFile file, String imgId) {
    checkImageType(file);
    try {
      return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
          "public_id", imgId,
          "overwrite", true
      )).get("url").toString();
    } catch (IOException e) {
      throw new UploadImageException(imgId + ". " + e);
    }
  }

  public boolean deleteFile(String imgId) {
    try {
      Map<?, ?> result = cloudinary.uploader().destroy(imgId, ObjectUtils.emptyMap());
      if (result.containsKey("result") && result.get("result").equals("ok")) return true;
    } catch (IOException ignored) {
    }
    return false;
  }
}
