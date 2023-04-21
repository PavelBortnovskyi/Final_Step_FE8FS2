package app.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "folowers")
@Data
public class FollowersModel extends BaseEntityModel{

    @Column(name = "follower")
    private Integer follower_id;

    @Column (name = "followered")
    private Integer followered_id;
}

