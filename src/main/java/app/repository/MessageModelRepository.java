package app.repository;

import app.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MessageModelRepository extends RepositoryInterface<Message> {

  @Query(value = "SELECT m FROM Message m WHERE chat.id = :id")
  Page<Message> getMessagesFromChat(@Param("id") Long chatId, Pageable pageable);

  @Transactional
  @Modifying
  @Query(value = "UPDATE Message m SET m.body = :body WHERE m.id = :id")
  void changeMessage(@Param("id") Long messageId, @Param("body") String body);

  @Query(value = "SELECT m FROM Message m WHERE m.chat.id = :id AND LOWER(m.body) LIKE LOWER(CONCAT('%', :keyword, '%'))")
  Page<Message> getSearchMessageInChat(@Param("id") Long chatId, @Param("keyword") String keyword, Pageable pageable);

  @Query("SELECT m FROM UserModel u JOIN u.chats c LEFT JOIN c.messages m " +
    "WHERE u.id = :id AND LOWER(m.body) LIKE LOWER(CONCAT('%', :keyword, '%'))")
  Page<Message> getSearchMessages(@Param("id") Long userId, @Param("keyword") String keyword, Pageable pageable);
}
