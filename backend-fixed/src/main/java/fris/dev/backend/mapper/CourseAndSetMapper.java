package fris.dev.backend.mapper;

import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.repositories.TeachingActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CourseAndSetMapper {

    private final TeachingActivityRepository teachingActivityRepository;

    public CourseAndSet toEntity(CourseAndSetDto dto) {
        TeachingActivity activity = teachingActivityRepository.findById(dto.getTeachingId())
                .orElseThrow(() -> new IllegalArgumentException("TeachingActivity not found"));

        return new CourseAndSet(null, activity,
                dto.getAcademicYear(), dto.getTerm(), dto.getCourseNumber(), dto.getSection(),
                dto.getCourseDescription(), dto.getCourseType(), dto.getTeachingPoints(), dto.getSupportingDocument());
    }
}
