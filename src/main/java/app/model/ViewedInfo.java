/*
package app.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Viewed_info", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "tweet_id", "user_id" }),
        @UniqueConstraint(columnNames = { "tweet_id", "user_ip" })
})
@NoArgsConstructor
@Data
public class ViewedInfo extends BaseEntityModel{
    @Column(name = "tweet_id", nullable = false)
    private long tweet_id;

    @Column(name = "user_id")
    private long user_id;

    @Column(name = "user_ip")
    private String user_ip;

}
*/
