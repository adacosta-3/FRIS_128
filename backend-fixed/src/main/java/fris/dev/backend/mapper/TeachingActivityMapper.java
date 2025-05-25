package fris.dev.backend.mapper;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.DTO.TeachingActivityResponseDto;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.AuthorshipRepository;
import fris.dev.backend.repositories.CourseAndSetRepository;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeachingActivityMapper {

    private final UserRepository userRepository;

    public TeachingActivity toEntity(TeachingActivityDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new TeachingActivity(null, user, dto.getType(), dto.getDescription(), dto.getAcademicYear(), false);
    }

    private final CourseAndSetRepository courseAndSetRepository;
    private final AuthorshipRepository authorshipRepository;

    public TeachingActivityResponseDto toResponseDto(TeachingActivity activity) {
        TeachingActivityResponseDto dto = new TeachingActivityResponseDto();
        dto.setTeachingId(activity.getTeachingId());
        dto.setType(activity.getType());
        dto.setDescription(activity.getDescription());
        dto.setAcademicYear(activity.getAcademicYear());
        dto.setIsApproved(activity.getIsApproved());

        // Fetch and map subtype details:
        dto.setCoursesAndSets(courseAndSetRepository.findByTeachingActivity(activity).stream()
                .map(cs -> new CourseAndSetDto(
                        cs.getCourseSetId(),
                        cs.getAcademicYear(),
                        cs.getTerm(),
                        cs.getCourseNumber(),
                        cs.getSection(),
                        cs.getCourseDescription(),
                        cs.getCourseType(),
                        cs.getTeachingPoints(),
                        cs.getSupportingDocument()
                )).toList());

        dto.setAuthorships(authorshipRepository.findByTeachingActivity(activity).stream()
                .map(au -> new AuthorshipDto(
                        au.getAuthorshipId(),
                        au.getTitle(),
                        au.getAuthors(),
                        au.getDate(),
                        au.getUpCourse(),
                        au.getRecommendingUnit(),
                        au.getPublisher(),
                        au.getAuthorshipType(),
                        au.getNumberOfAuthors(),
                        au.getSupportingDocument()
                )).toList());

        return dto;
    }
}
