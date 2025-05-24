package fris.dev.backend.controllers;

import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.service.CourseAndSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses-and-sets")
@RequiredArgsConstructor
public class CourseAndSetController {

    private final CourseAndSetService service;

//    @PostMapping
//    public ResponseEntity<CourseAndSet> add(@RequestBody CourseAndSetDto dto) {
//        return ResponseEntity.ok(service.add(dto));
//    }

    @PostMapping
    public ResponseEntity<CourseAndSet> addCourseSet(
            @RequestBody CourseAndSetDto dto,
            Authentication authentication
    ) {
        String username = authentication.getName();
        CourseAndSet created = service.addCourseSet(dto, username);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/teaching/{teachingId}")
    public ResponseEntity<List<CourseAndSet>> getByTeaching(@PathVariable Long teachingId) {
        return ResponseEntity.ok(service.getByTeachingId(teachingId));
    }
}

