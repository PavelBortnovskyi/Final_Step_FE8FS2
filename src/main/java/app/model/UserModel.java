package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDate;

import java.util.Set;


@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserModel extends BaseEntityModel{
    public UserModel(String fullName, String userTag, String password, String email) {
        this.fullName = fullName;
        this.userTag = userTag;
        this.password = password;
        this.email = email;
    }

    @Column(name = "fullname", updatable = true, nullable = false)
    private String fullName;

    @Column(name = "user_tag", updatable = true, nullable = false)
    private String userTag;

    @Column(name = "password", updatable = true, nullable = false)
    private String password;

    @Column(name = "email", updatable = true, nullable = false)
    private String email;

    @Column(name = "date_of_birth", updatable = false, nullable = true)
    private LocalDate birthdate;

    @Column(name = "bio", updatable = true, nullable = true)
    private String bio;

    @Column(name = "location", updatable = true, nullable = true)
    private String location;

    @Column(name = "avatar_img_url", updatable = true, nullable = true)
    private String avatarImgUrl;

    @Column(name = "header_img_url", updatable = true, nullable = true)
    private String headerImgUrl;

    @Column(name = "is_verified", updatable = true, nullable = false)
    private boolean isVerified;

    @OneToMany
    @JoinTable(name = "followers")
    private Set<UserModel> following;

    @OneToMany
    @JoinTable(name = "followers")
    private Set<UserModel> followers;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Tweet> tweets;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Tweet> messages;

    @OneToMany(mappedBy = "initiatorUser")
    private Set<Chat> chat;

    @ManyToMany(mappedBy = "users")
    private Set<Chat> chats;

    @OneToOne(mappedBy = "user")
    private TweetAction tweetAction;

}
