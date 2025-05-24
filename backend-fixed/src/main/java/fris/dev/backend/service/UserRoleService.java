package fris.dev.backend.service;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.DTO.UserRoleUpdateDto;
import fris.dev.backend.entities.UserRole;

import java.util.List;

public interface UserRoleService {
    UserRole assignRole(UserRoleDto dto);
    List<UserRole> getUserRoles(Long userId);
    UserRole updateUserRole(UserRoleUpdateDto dto);
    void removeUserRole(Long userRoleId);
}
