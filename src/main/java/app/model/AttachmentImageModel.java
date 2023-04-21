package app.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "attachment_image")
@Data
public class AttachmentImageModel extends BaseEntityModel{

    @Column(name = "tweet_id" , insertable = false, updatable = false)
    private Long tweet_id;


    @Column(name = "img_url")
    private String img_url;

    @OneToOne(mappedBy = "attachmentImageModel")
    private TweetModel tweetModel;


}
