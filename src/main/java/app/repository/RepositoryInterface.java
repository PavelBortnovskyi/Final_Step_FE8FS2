package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryInterface<E> extends JpaRepository<E, Long> {
}
