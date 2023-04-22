package app.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Table(name = "attachment_image")
@NoArgsConstructor
@Data
public class AttachmentImageModel extends BaseEntityModel{
    @Column(name = "tweet_id" , insertable = false, updatable = false)
    private Long tweet_id;
    @Column(name = "img_url")
    private String img_url;
}
