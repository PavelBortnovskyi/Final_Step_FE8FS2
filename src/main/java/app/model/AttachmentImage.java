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
public class AttachmentImage extends BaseEntityModel {
  @ManyToOne(targetEntity = Tweet.class)
  @JoinColumn(name = "tweet_id")
  private Long tweetId;
  @Column(name = "img_url")
  private String imgUrl;
}
