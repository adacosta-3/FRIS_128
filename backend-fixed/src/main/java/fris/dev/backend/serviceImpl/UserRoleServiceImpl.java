package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.mapper.UserRoleMapper;
import fris.dev.backend.repositories.UserRoleRepository;
import fris.dev.backend.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;
    private final UserRoleMapper userRoleMapper;

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
}
