package app.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;




@Entity
@Table(name = "attachment_images")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttachmentImage extends BaseEntityModel{
    public AttachmentImage(Long tweetId, String imgUrl) {
        this.tweetId = tweetId;
        this.imgUrl = imgUrl;
        //this.setCreatedBy();
    }

    @Column(name = "tweet_id", insertable = false, updatable = false)
    private Long tweetId;

    @Column(name = "img_url")
    private String imgUrl;

    @ManyToOne(targetEntity = Tweet.class)
    @JoinColumn(name = "tweet_id")
    private Tweet tweet;
}
