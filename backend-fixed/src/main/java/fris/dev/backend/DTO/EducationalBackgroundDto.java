package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationalBackgroundDto {
    private String degree;
    private String school;
    private Integer graduationYear;
    private String degreeType;
}

