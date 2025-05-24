package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.DTO.UserRoleUpdateDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.mapper.UserRoleMapper;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.repositories.UserRoleRepository;
import fris.dev.backend.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;
    private final UserRoleMapper userRoleMapper;
    private final UserRepository userRepository;
    @Override
    public UserRole assignRole(UserRoleDto dto) {
        return userRoleRepository.save(userRoleMapper.toEntity(dto));
    }

    @Override
    public List<UserRole> getUserRoles(Long userId) {
        User user = new User();
        user.setUserId(userId);
        return userRoleRepository.findByUser(user);
    }

    @Override
    @Transactional
    public UserRole updateUserRole(UserRoleUpdateDto dto) {
        UserRole userRole = userRoleRepository.findById(dto.getUserRoleId())
                .orElseThrow(() -> new IllegalArgumentException("UserRole not found"));

        if (dto.getNewUserId() != null) {
            User newUser = userRepository.findById(dto.getNewUserId())
                    .orElseThrow(() -> new IllegalArgumentException("New user not found"));
            userRole.setUser(newUser);
        }

        if (dto.getNewCollege() != null) {
            userRole.setCollege(dto.getNewCollege());
        }

        if (dto.getNewDepartment() != null) {
            userRole.setDepartment(dto.getNewDepartment());
        }

        if (dto.getIsPrimary() != null) {
            userRole.setIsPrimary(dto.getIsPrimary());
        }

        return userRoleRepository.save(userRole);
    }

    @Override
    @Transactional
    public void removeUserRole(Long userRoleId) {
        if (!userRoleRepository.existsById(userRoleId)) {
            throw new IllegalArgumentException("UserRole does not exist");
        }
        userRoleRepository.deleteById(userRoleId);
    }
}
