package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class UserModel extends BaseEntityModel {
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "user_tag", nullable = false)
    private String userTag;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "date_of_birth", updatable = false)
    private LocalDate birthDate;

    @Column(name = "bio")
    private String bio;

    @Column(name = "location")
    private String location;

    @Column(name = "avatar_img_url")
    private String avatarImgUrl;

    @Column(name = "header_img_url")
    private String headerImgUrl;

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "token_used")
    private boolean refreshed;

//  @OneToMany
//  @JoinTable(name = "followers")
//  private Set<UserModel> following;
//
//  @OneToMany
//  @JoinTable(name = "followers")
//  private Set<UserModel> followers;

    @LazyCollection(value = LazyCollectionOption.TRUE)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "followed_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private Set<UserModel> followers = new HashSet<>();

    @LazyCollection(value = LazyCollectionOption.EXTRA)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id"))
    private Set<UserModel> followings = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Tweet> tweets = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Message> messages = new HashSet<>();
    ;

    @OneToMany(mappedBy = "initiatorUser")
    private Set<Chat> chat = new HashSet<>();
    ;


    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private Set<Chat> chats = new HashSet<>();
    ;

    @OneToMany(mappedBy = "user")
    private Set<TweetAction> tweetAction;

    public boolean isVerified() {
        return this.isVerified;
    }

    public void setVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }


    public Integer getCountFollowers() {
        return followers.size();
    }

    public Integer getCountFollowings() {
        return followings.size();
    }

}

