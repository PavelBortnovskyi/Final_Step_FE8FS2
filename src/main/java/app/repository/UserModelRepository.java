package app.repository;

import app.model.UserModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserModelRepository extends RepositoryInterface<UserModel> {

    @Query(value = "SELECT u FROM UserModel u WHERE u.email = :email")
    Optional<UserModel> findByEmail(@Param("email") String email);

    @Modifying
    @Query(value = "UPDATE UserModel u SET u.refreshToken = :refreshToken WHERE u.id = :id")
    void updateRefreshToken(@Param("id") Long userId, @Param("refreshToken") String refreshToken);
}
