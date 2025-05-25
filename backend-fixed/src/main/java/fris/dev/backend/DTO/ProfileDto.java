package fris.dev.backend.DTO;

import lombok.Data;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String unit;
    private String department;
    private String college;

    private List<EducationalBackgroundDto> educationalBackgrounds;
    private List<ResearchInterestDto> researchInterests;
    private List<AffiliationDto> affiliations;
    private List<ResearchExperienceDto> researchExperiences;

    private List<PublicationResponseDto> publications;
    private List<TeachingActivityResponseDto> teachingActivities;
    private List<PublicServiceResponseDto> publicServices;
}

