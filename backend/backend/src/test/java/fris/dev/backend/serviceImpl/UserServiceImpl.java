package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.UserMapper;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public User createUser(UserDto dto) {
        // hash password here using BCrypt, etc.
        dto.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));
        return userRepository.save(userMapper.toEntity(dto));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}


