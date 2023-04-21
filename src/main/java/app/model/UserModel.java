package app.model;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "User")
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

    @Column(name = "date_of_birth")
    @Nullable
    private LocalDate birthdate;

    @Column(name = "bio")
    @Nullable
    private String bio;

    @Column(name = "location")
    @Nullable
    private String location;

    @Column(name = "avatar_img_url")
    @Nullable
    private String avatar_img_url;

    @Column(name = "header_img_url")
    @Nullable
    private String header_img_url;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<TweetModel> tweets;
}
