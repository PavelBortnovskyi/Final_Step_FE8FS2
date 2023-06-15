package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "chats")
@NoArgsConstructor
@AllArgsConstructor
@Data
@SequenceGenerator(name = "custom_gen", sequenceName = "chats_id_seq", allocationSize = 1)
public class Chat extends BaseEntityModel {
  @ManyToOne
  private UserModel initiatorUser;

  @OneToMany(mappedBy = "chat", cascade = CascadeType.REMOVE)
  private List<Message> messages = new ArrayList<>();

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "chats_users", joinColumns = @JoinColumn(name = "chat_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
  private Set<UserModel> users = new HashSet<>();
}
