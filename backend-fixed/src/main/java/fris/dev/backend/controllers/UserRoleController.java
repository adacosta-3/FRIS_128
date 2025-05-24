package fris.dev.backend.controllers;

import fris.dev.backend.DTO.UserRoleDto;
import fris.dev.backend.DTO.UserRoleUpdateDto;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
@RequiredArgsConstructor
public class UserRoleController {

    private final UserRoleService userRoleService;

    @PostMapping
    public ResponseEntity<UserRole> assignRole(@RequestBody UserRoleDto dto) {
        return ResponseEntity.ok(userRoleService.assignRole(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRole>> getUserRoles(@PathVariable Long userId) {
        return ResponseEntity.ok(userRoleService.getUserRoles(userId));
    }

    @PutMapping("/{userRoleId}")
    public ResponseEntity<UserRole> updateUserRole(
            @PathVariable Long userRoleId,
            @RequestBody UserRoleUpdateDto dto) {

        dto.setUserRoleId(userRoleId);
        UserRole updated = userRoleService.updateUserRole(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userRoleId}")
    public ResponseEntity<Void> deleteUserRole(@PathVariable Long userRoleId) {
        userRoleService.removeUserRole(userRoleId);
        return ResponseEntity.noContent().build();
    }
}
