package fris.dev.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationalBackgroundDto {
    private Long eduId;  // For update/delete
    private String degree;
    private String school;
    private Integer graduationYear;
    private String degreeType;  // Bachelor, Master, Doctoral
}


