package fris.dev.backend.mapper;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(UserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPasswordHash(dto.getPassword()); // You’ll hash this later
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        return user;
    }
}