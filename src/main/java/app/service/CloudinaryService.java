package app.service;

import com.cloudinary.Cloudinary;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CloudinaryService {

  private final Cloudinary cloudinary;

}
