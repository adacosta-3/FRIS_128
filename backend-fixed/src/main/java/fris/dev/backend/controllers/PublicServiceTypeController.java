package fris.dev.backend.controllers;

import fris.dev.backend.DTO.PublicServiceTypeDto;
import fris.dev.backend.service.PublicServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public-service-types")
@RequiredArgsConstructor
public class PublicServiceTypeController {

    private final PublicServiceTypeService publicServiceTypeService;

    @GetMapping
    public ResponseEntity<List<PublicServiceTypeDto>> getAllGrouped() {
        List<PublicServiceTypeDto> groupedTypes = publicServiceTypeService.getAllPublicServiceTypesGrouped();
        return ResponseEntity.ok(groupedTypes);
    }
}

