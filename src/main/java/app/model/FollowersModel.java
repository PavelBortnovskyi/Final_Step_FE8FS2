package app.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "folowers")
@Data
public class FollowersModel extends BaseEntityModel{
    @Column(name = "follower")
    private Long follower_id;
    @Column (name = "followered")
    private Long followered_id;
}

