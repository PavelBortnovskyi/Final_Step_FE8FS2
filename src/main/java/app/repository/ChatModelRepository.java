package app.repository;

import app.model.Chat;
import app.model.Tweet;
import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatModelRepository extends RepositoryInterface<Chat> {
  @Query("SELECT c FROM UserModel u JOIN u.chats c WHERE u.id = :id")
  Page<Chat> getChatList(@Param("id") Long userId, Pageable pageable);

  @Query("SELECT c, m FROM UserModel u JOIN u.chats c LEFT JOIN c.messages m " +
    "WHERE u.id = :id AND m.sent = (SELECT MAX(m2.sent) FROM c.messages m2)")
  Page<Object[]> getChatListForPreview(@Param("id") Long userId, Pageable pageable);
}
