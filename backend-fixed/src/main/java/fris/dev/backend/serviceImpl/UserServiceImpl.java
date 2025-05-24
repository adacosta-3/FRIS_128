package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.DTO.UserUpdateDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.UserMapper;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserDto dto) {
        User user = userMapper.toEntity(dto);
        // Encode password before saving
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User updateUserProfile(String username, UserUpdateDto dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhoneNumber() != null) user.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getUnit() != null) user.setUnit(dto.getUnit());
        if (dto.getDepartment() != null) user.setDepartment(dto.getDepartment());
        if (dto.getCollege() != null) user.setCollege(dto.getCollege());

        // Save updated user
        return userRepository.save(user);
    }

}
