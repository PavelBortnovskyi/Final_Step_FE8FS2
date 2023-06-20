package app.repository;

import app.model.RatingModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingModelRepository extends JpaRepository<RatingModel, Long> {
  List<RatingModel> findAll();

  Page<RatingModel> findAllByOrderByTweetRatingDesc(Pageable pageable);
}
