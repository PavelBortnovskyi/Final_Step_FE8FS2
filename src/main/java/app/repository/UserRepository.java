package app.repository;

import app.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends RepositoryInterface<UserModel> {

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

  // Search users by Email
  Optional<UserModel> findByEmail(String email);

  // Search user by refreshToken
  Optional<UserModel> findByRefreshToken(String refreshToken);
}
