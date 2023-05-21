package app.repository;

import app.model.Chat;
import app.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageModelRepository extends RepositoryInterface<Message> {

  @Query(value = "SELECT m from Message m where chat.id = :id")
  Page<Message> getMessagesFromChat(@Param("id") Long chatId, Pageable pageable);
}
