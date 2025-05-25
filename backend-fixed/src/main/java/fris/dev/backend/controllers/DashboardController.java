package fris.dev.backend.controllers;

import fris.dev.backend.DTO.DashboardDto;
import fris.dev.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardDto> getDashboard(
            @RequestParam String academicYear,
            @RequestParam String term,
            Authentication authentication) {
        String username = authentication.getName();
        DashboardDto dto = dashboardService.getDashboardCounts(username, academicYear, term);
        return ResponseEntity.ok(dto);
    }
}

