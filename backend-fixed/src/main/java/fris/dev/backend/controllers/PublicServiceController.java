package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.DTO.PublicServiceResponseDto;
import fris.dev.backend.entities.PublicService;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.PublicServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public-service")
@RequiredArgsConstructor
public class PublicServiceController {

    private final PublicServiceService service;
    private final UserRepository userRepository;


    @PostMapping
    public ResponseEntity<PublicService> createPublicService(
            @RequestBody PublicServiceDto dto,
            Authentication authentication
    ) {
        String username = authentication.getName();
        PublicService created = service.create(dto, username);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PublicService>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

//    @GetMapping("/approved")
//    public ResponseEntity<List<PublicService>> getApproved() {
//        return ResponseEntity.ok(service.getApproved());
//    }

    @GetMapping("/approved")
    public ResponseEntity<List<PublicServiceResponseDto>> getApprovedByCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<PublicServiceResponseDto> dtos = service.getApprovedPublicServicesByUser(user.getUserId());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/approved/sorted")
    public ResponseEntity<List<PublicServiceResponseDto>> getApprovedSortedByType(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<PublicServiceResponseDto> dtos = service.getApprovedPublicServicesByUserSorted(user.getUserId());

        return ResponseEntity.ok(dtos);
    }


}