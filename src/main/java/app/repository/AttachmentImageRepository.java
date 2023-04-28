package app.repository;

import app.model.AttachmentImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentImageRepository extends JpaRepository<AttachmentImage, Long> {
}
