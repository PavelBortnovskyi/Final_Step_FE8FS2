package app.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tweet_action")
@Data
public class TweetActionModel extends BaseEntityModel{
    public TweetActionModel(){
    }
    @Column(name = "action_type")
    private TweetActionType actionType;
    @Column(name = "tweet_id")
    private Long tweet_id;
    @Column(name = "user_id")
    private Long user_id;

}
