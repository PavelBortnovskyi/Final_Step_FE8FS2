package app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "user")
@AllArgsConstructor
@Data
public class UserModel extends BaseEntityModel{
    public UserModel() {
    }
    @Column (name = "fullname")
    private String fullname;
    @Column (name = "user_tag")
    private String user_tag;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "date_of_birth", nullable = true)
    private LocalDate birthdate;
    @Column(name = "bio", nullable = true)
    private String bio;
    @Column(name = "location", nullable = true)
    private String location;
    @Column(name = "avatar_img_url", nullable = true)
    private String avatar_img_url;
    @Column(name = "header_img_url", nullable = true)
    private String header_img_url;
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<TweetModel> tweets;
}
