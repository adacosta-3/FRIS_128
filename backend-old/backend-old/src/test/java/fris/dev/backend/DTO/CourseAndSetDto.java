package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseAndSetDto {
    private Long teachingId;
    private String academicYear;
    private String term;
    private String courseNumber;
    private String section;
    private String courseDescription;
    private String courseType;
    private Double teachingPoints;
    private String supportingDocument;
}

