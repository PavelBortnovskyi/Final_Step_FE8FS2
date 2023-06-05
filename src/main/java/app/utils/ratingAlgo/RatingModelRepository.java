package app.utils.ratingAlgo;

import app.repository.RepositoryInterface;
import org.h2.mvstore.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingModelRepository extends JpaRepository<RatingModel, Long> {
  List<RatingModel> findAll();
}
