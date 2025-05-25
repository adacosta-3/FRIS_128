package fris.dev.backend.controllers;

import fris.dev.backend.DTO.DetailedSubmissionDto;
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


    // Get all submissions for logged-in user (any status)
    @GetMapping("/me")
    public ResponseEntity<List<DetailedSubmissionDto>> getMySubmissions(Authentication authentication) {
        String username = authentication.getName();
        List<DetailedSubmissionDto> submissions = submissionService.getSubmissionsByUser(username);
        return ResponseEntity.ok(submissions);
    }

    // Get pending submissions for logged-in user
    @GetMapping("/me/pending")
    public ResponseEntity<List<DetailedSubmissionDto>> getMyPendingSubmissions(Authentication authentication) {
        String username = authentication.getName();
        List<DetailedSubmissionDto> pending = submissionService.getPendingSubmissionsByUser(username);
        return ResponseEntity.ok(pending);
    }

    // Get pending submissions filtered by activity type for logged-in user
    @GetMapping("/me/pending/filter")
    public ResponseEntity<List<DetailedSubmissionDto>> getMyPendingSubmissionsFiltered(
            @RequestParam String activityType,
            Authentication authentication) {
        String username = authentication.getName();
        List<DetailedSubmissionDto> filtered = submissionService.getPendingSubmissionsByUserAndType(username, activityType);
        return ResponseEntity.ok(filtered);
    }

    @GetMapping("/me/filter")
    public ResponseEntity<List<DetailedSubmissionDto>> getMySubmissionsFiltered(
            @RequestParam String status,
            @RequestParam String activityType,
            Authentication authentication) {

        String username = authentication.getName();
        List<DetailedSubmissionDto> filteredSubs = submissionService.getSubmissionsByUserStatusAndType(username, status, activityType);

        return ResponseEntity.ok(filteredSubs);
    }



}
