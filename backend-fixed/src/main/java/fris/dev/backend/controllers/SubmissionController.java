package fris.dev.backend.controllers;

import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<Submission> submit(@RequestBody SubmissionDto dto) {
        return ResponseEntity.ok(submissionService.submit(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Submission>> getUserSubmissions(@PathVariable Long userId) {
        return ResponseEntity.ok(submissionService.getUserSubmissions(userId));
    }

    @GetMapping("/submissions/pending")
    public ResponseEntity<List<SubmissionDto>> getPendingSubmissionsForUser(Authentication authentication) {
        String username = authentication.getName();
        List<SubmissionDto> pendingSubs = submissionService.getPendingSubmissionsForUser(username);
        return ResponseEntity.ok(pendingSubs);
    }

    @GetMapping("/submissions/pending/filter")
    public ResponseEntity<List<SubmissionDto>> getPendingSubmissionsByType(
            @RequestParam String activityType,
            Authentication authentication) {

        String username = authentication.getName();
        List<SubmissionDto> pendingSubs = submissionService.getPendingSubmissionsForUserByType(username, activityType);
        return ResponseEntity.ok(pendingSubs);
    }


}
