package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.service.PublicationService;
import fris.dev.backend.service.PublicServiceService;
import fris.dev.backend.service.TeachingActivityService;
import fris.dev.backend.util.CsvParserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class CsvUploadController {

    private final CsvParserUtil csvParserUtil;
    private final PublicationService publicationService;
    private final PublicServiceService publicServiceService;
    private final TeachingActivityService teachingActivityService;

    // Pass username from request header or param, adjust based on your auth method
    @PostMapping("/publications")
    public ResponseEntity<?> uploadPublicationsCsv(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-Username") String loggedInUsername) {
        try {
            List<PublicationDto> dtos = csvParserUtil.parsePublicationsCsv(file.getInputStream());
            publicationService.saveAllFromDto(dtos, loggedInUsername); // pass username here
            return ResponseEntity.ok("Publications imported successfully. Count: " + dtos.size());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to parse CSV file: " + e.getMessage());
        }
    }

    @PostMapping("/public-services")
    public ResponseEntity<?> uploadPublicServiceCsv(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-Username") String loggedInUsername) {
        try {
            List<PublicServiceDto> dtos = csvParserUtil.parsePublicServiceCsv(file.getInputStream());
            publicServiceService.saveAllFromDto(dtos, loggedInUsername);
            return ResponseEntity.ok("Public Services imported successfully. Count: " + dtos.size());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to parse CSV file: " + e.getMessage());
        }
    }

    @PostMapping("/teaching-activities")
    public ResponseEntity<?> uploadTeachingActivitiesCsv(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-Username") String loggedInUsername) {
        try {
            List<TeachingActivityDto> dtos = csvParserUtil.parseTeachingActivityCsv(file.getInputStream());
            teachingActivityService.saveAllFromDto(dtos, loggedInUsername);
            return ResponseEntity.ok("Teaching Activities imported successfully. Count: " + dtos.size());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to parse CSV file: " + e.getMessage());
        }
    }
}
