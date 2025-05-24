package fris.dev.backend.service;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.DTO.UserUpdateDto;
import fris.dev.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(UserDto dto);
    Optional<User> findByUsername(String username);
    List<User> getAllUsers();
    User updateUserProfile(String username, UserUpdateDto dto);

}
