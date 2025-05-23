package fris.dev.backend.controllers;

import fris.dev.backend.DTO.UserRoleDto;
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
}
