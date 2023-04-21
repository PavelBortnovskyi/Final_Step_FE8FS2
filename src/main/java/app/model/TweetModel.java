package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @OneToOne(optional=true)
    @JoinTable(
            name = "tweet_extra",
            joinColumns = {
                    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "attachmentImege_id", referencedColumnName = "id")
            }
    )
    private AttachmentImageModel attachmentImageModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserModel userModel;

}
