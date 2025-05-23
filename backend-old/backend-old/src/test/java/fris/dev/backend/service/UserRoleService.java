package fris.dev.backend.service;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.entities.UserRole;

import java.util.List;

public interface UserRoleService {
    UserRole assignRole(UserRoleDto dto);
    List<UserRole> getUserRoles(Long userId);
}
