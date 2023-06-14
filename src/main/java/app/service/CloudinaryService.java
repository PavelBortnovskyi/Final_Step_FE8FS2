package app.service;

import app.exceptions.cloudinaryError.UploadImageException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class CloudinaryService {

  private final Cloudinary cloudinary;
  private final String PROJECT_FOLDER = "tweeter_v1";

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

  private String uploadFile(MultipartFile file, String imageName, String folder) {
    checkImageType(file);
    try {
      return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
        "public_id", imageName,
        "overwrite", true,
        "folder", folder
      )).get("url").toString();
    } catch (IOException e) {
      throw new UploadImageException(imageName + ". " + e);
    }
  }

  private String getUserFolder(Long userId){
    return PROJECT_FOLDER + "/userId_" + userId;
  }

  private String getTweetFolder(Long userId, Long tweetId){
    return getUserFolder(userId) + "/tweets/tweetId_" + tweetId;
  }

  public String uploadUserAvatarImage(MultipartFile file, Long userId) {
    return uploadFile(file, "avatar", getUserFolder(userId) + "/profile");
  }

  public String uploadUserHeaderImage(MultipartFile file, Long userId) {
    return uploadFile(file, "header", getUserFolder(userId) + "/profile");
  }

  public HashSet<String> uploadTweetImages(MultipartFile[] files, Long userId, Long tweetId) {
    // This is NOT FOR PRODUCTION. To avoid problems when testing and creating multiple tweets with the same ID.
    deleteTweetImages(userId, tweetId);
    return IntStream.range(0, files.length)
      .mapToObj(i ->
        uploadFile(files[i], "img_" + i + 1, getTweetFolder(userId, tweetId)))
      .collect(Collectors.toCollection(HashSet::new));
  }

  private void deleteTweetImages(Long userId, Long tweetId){
    try {
      cloudinary.api().deleteFolder(getTweetFolder(userId, tweetId), ObjectUtils.emptyMap());
      System.out.println("Папка успешно удалена.");
    } catch (Exception e) {
      System.out.println("Ошибка при удалении папки: " + e.getMessage());
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
