package fris.dev.backend.controllers;

import fris.dev.backend.DTO.UserDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        User savedUser = userService.createUser(userDto);
        return ResponseEntity.ok(savedUser);
    }
}