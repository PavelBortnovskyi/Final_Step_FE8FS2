package app.utils.ratingAlgo;

import app.repository.RepositoryInterface;

import java.util.List;

public interface RatingModelRepository extends RepositoryInterface<RatingModel> {
  List<RatingModel> findAll();
}
