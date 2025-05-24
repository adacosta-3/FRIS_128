package fris.dev.backend.service;

import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.entities.CourseAndSet;

import java.util.List;

public interface CourseAndSetService {
    CourseAndSet add(CourseAndSetDto dto);
    List<CourseAndSet> getByTeachingId(Long teachingId);
    CourseAndSet addCourseSet(CourseAndSetDto dto, String loggedInUsername);
}

