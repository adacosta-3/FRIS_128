package fris.dev.backend.controllers;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.DTO.TeachingActivityResponseDto;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.service.TeachingActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teaching-activities")
@RequiredArgsConstructor
public class TeachingActivityController {

    private final TeachingActivityService service;

//    @PostMapping
//    public ResponseEntity<TeachingActivity> submit(@RequestBody TeachingActivityDto dto) {
//        return ResponseEntity.ok(service.submit(dto));
//    }

    @PostMapping
    public ResponseEntity<TeachingActivity> submit(
            @RequestBody TeachingActivityDto dto,
            Authentication authentication) {
        String username = authentication.getName();
        TeachingActivity created = service.submitTeachingActivity(dto, username);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TeachingActivity>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<TeachingActivity>> getApproved() {
        return ResponseEntity.ok(service.getApproved());
    }

    @GetMapping("/approved/filter")
    public ResponseEntity<List<TeachingActivityResponseDto>> getApprovedTeachingActivitiesByType(
            @RequestParam String type,
            Authentication authentication) {
        String username = authentication.getName();
        List<TeachingActivityResponseDto> activities = service.getApprovedTeachingActivitiesByType(username, type);
        return ResponseEntity.ok(activities);
    }

}
