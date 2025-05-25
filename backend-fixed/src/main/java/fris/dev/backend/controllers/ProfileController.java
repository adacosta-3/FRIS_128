package fris.dev.backend.controllers;

import fris.dev.backend.DTO.ProfileDto;
import fris.dev.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<ProfileDto> getMyProfile(Authentication authentication) {
        String username = authentication.getName();
        ProfileDto dto = profileService.getLoggedInUserProfile(username);
        return ResponseEntity.ok(dto);
    }
}

