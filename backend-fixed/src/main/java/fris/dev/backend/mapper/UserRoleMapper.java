package fris.dev.backend.mapper;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.repositories.RoleRankRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRoleMapper {

    private final UserRepository userRepository;
    private final RoleRankRepository roleRankRepository;

    public UserRole toEntity(UserRoleDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        RoleRank roleRank = roleRankRepository.findById(dto.getRoleRankId())
                .orElseThrow(() -> new IllegalArgumentException("RoleRank not found"));
        return new UserRole(null, user, roleRank, dto.getCollege(), dto.getDepartment(), dto.getIsPrimary());
    }
}