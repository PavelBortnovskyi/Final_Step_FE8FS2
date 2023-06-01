package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "attachment_images")
@NoArgsConstructor
@AllArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "attachment_images_id_seq", allocationSize = 1)
public class AttachmentImage extends BaseEntityModel {
  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @Column(name = "img_url")
  private String imgUrl;
}
