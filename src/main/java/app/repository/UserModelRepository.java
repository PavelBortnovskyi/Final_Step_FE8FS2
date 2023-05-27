package app.repository;

import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserModelRepository extends RepositoryInterface<UserModel> {

  Optional<UserModel> findByUserTag(String userTag);

  // Return followings
  Page<UserModel> findByFollowersContains(UserModel userModel, Pageable pageable);

  // Return followers
  Page<UserModel> findByFollowingsContains(UserModel userModel, Pageable pageable);

  // Search users to offer followings
  Page<UserModel> findByIdNotAndFollowersNotContaining(Long userId, UserModel userModel, Pageable pageable);

  // Search users by part of full name and part of user tag
  Page<UserModel> findByIdNotAndFullNameContainsIgnoreCaseOrUserTagContainsIgnoreCase(Long id,
                                                                                      String fullName,
                                                                                      String userTag,
                                                                                      Pageable pageable
  );

  @Query(value = "SELECT u FROM UserModel u WHERE u.email = :email")
  Optional<UserModel> findByEmail(@Param("email") String email);

  @Query(value = "SELECT u FROM UserModel u WHERE u.refreshToken = :refreshToken")
  Optional<UserModel> findByToken(@Param("refreshToken") String refreshToken);


  @Query(value = "SELECT u.refreshed FROM UserModel u WHERE u.refreshToken = :refreshToken")
  boolean checkRefreshTokenStatus(@Param("refreshToken") String refreshToken);

  @Modifying
  @Transactional
  @Query(value = "UPDATE UserModel u SET u.refreshed = :used WHERE u.id = :id")
  void changeTokenStatusById(@Param("id") Long id, @Param("used") boolean used);

  @Modifying
  @Transactional
  @Query(value = "UPDATE UserModel u SET u.refreshed = :used WHERE u.refreshToken = :refreshToken")
  void changeTokenStatusByValue(@Param("refreshToken") String refreshToken, @Param("used") boolean used);

  @Modifying
  @Transactional
  @Query(value = "UPDATE UserModel u SET u.refreshToken = :refreshToken WHERE u.id = :id")
  void updateRefreshToken(@Param("id") Long userId, @Param("refreshToken") String refreshToken);

  @Modifying
  @Transactional
  @Query(value = "UPDATE UserModel u SET u.password = :password WHERE u.id = :id")
  void updatePassword(@Param("id") Long userId, @Param("password") String freshPassword);

}
