package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tweet")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TweetModel extends BaseEntityModel{
    @Column(name = "body")
    private String body;
    @Column(name = "tweet_type")
    private TweetTypeEnum tweet_type;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long user_id;
    @Column(name = "parent_tweet_id", nullable = true)
    private Long parent_tweet_id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "tweet_extra",
            joinColumns = {
                    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "attachment_image_id", referencedColumnName = "id")
            }
    )
    private List<AttachmentImageModel> attachmentImageModels;

}
