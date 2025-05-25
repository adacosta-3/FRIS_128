package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.*;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.PublicServiceMapper;
import fris.dev.backend.mapper.PublicationMapper;
import fris.dev.backend.mapper.TeachingActivityMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final EducationalBackgroundRepository educationalBackgroundRepository;
    private final ResearchInterestRepository researchInterestRepository;
    private final AffiliationRepository affiliationRepository;
    private final ResearchExperienceRepository researchExperienceRepository;
    private final PublicationRepository publicationRepository;
    private final TeachingActivityRepository teachingActivityRepository;
    private final PublicServiceRepository publicServiceRepository;

    private final PublicationMapper publicationMapper;
    private final TeachingActivityMapper teachingActivityMapper;
    private final PublicServiceMapper publicServiceMapper;

    @Override
    public ProfileDto getLoggedInUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        ProfileDto dto = new ProfileDto();
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setUnit(user.getUnit());
        dto.setDepartment(user.getDepartment());
        dto.setCollege(user.getCollege());

        dto.setEducationalBackgrounds(educationalBackgroundRepository.findByUser(user).stream()
                .map(eb -> new EducationalBackgroundDto(
                        eb.getDegree(),
                        eb.getSchool(),
                        eb.getGraduationYear(),
                        eb.getDegreeType()
                )).toList());

        dto.setResearchInterests(researchInterestRepository.findByUser(user).stream()
                .map(ri -> new ResearchInterestDto(ri.getResearchInterest()))
                .toList());

        dto.setAffiliations(affiliationRepository.findByUser(user).stream()
                .map(af -> new AffiliationDto(af.getAffiliationName(), af.getAffiliationType()))
                .toList());

        dto.setResearchExperiences(researchExperienceRepository.findByUser(user).stream()
                .map(re -> new ResearchExperienceDto(re.getLocation(), re.getStartDate(), re.getEndDate(), re.getExperienceDetails()))
                .toList());

        dto.setPublications(publicationRepository.findByUserAndIsApprovedTrue(user).stream()
                .map(publicationMapper::toResponseDto)
                .toList());

        dto.setTeachingActivities(teachingActivityRepository.findByUserAndIsApprovedTrue(user).stream()
                .map(teachingActivityMapper::toResponseDto)
                .toList());

        dto.setPublicServices(publicServiceRepository.findByUserAndIsApprovedTrue(user).stream()
                .map(publicServiceMapper::toResponseDto)
                .toList());

        return dto;
    }
}
