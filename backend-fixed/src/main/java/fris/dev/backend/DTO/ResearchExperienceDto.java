package fris.dev.backend.DTO;

import lombok.*;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchExperienceDto {
    private Long researchExperienceId; // null for new entries
    private String location;
    private Date startDate;
    private Date endDate;
    private String experienceDetails;
}
