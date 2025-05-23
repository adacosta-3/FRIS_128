package fris.dev.backend.service;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.entities.User;

import java.util.Optional;

public interface UserService {
    User createUser(UserDto dto);
    Optional<User> findByUsername(String username);
}

