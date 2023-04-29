package app.repository;

import app.model.BaseEntityModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RepositoryInterface<E extends BaseEntityModel> extends JpaRepository<E, Long> {
}
