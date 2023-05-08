package app.repository;

import app.model.UserModel;

import java.util.Optional;

public interface UserModelRepository extends RepositoryInterface<UserModel> {
    Optional<UserModel> findByEmail(String email);
}
