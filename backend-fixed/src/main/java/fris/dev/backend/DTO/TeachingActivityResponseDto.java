package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeachingActivityResponseDto {
    private Long teachingId;
    private String type;                // Course, SET, or Authorship
    private String description;
    private String academicYear;
    private Boolean isApproved;

    // Subtype details:
    private List<CourseAndSetDto> coursesAndSets;
    private List<AuthorshipDto> authorships;
}

