package fris.dev.backend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeachingActivityDto {
    private Long userId;
    private String type;
    private String description;
    private String academicYear;
}
