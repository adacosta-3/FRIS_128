package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ResearchExperienceDto;
import fris.dev.backend.entities.ResearchExperience;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ResearchExperienceMapper {

    private final UserRepository userRepository;

    public ResearchExperience toEntity(ResearchExperienceDto dto, String username) {
        ResearchExperience entity = new ResearchExperience();

        if (dto.getResearchExperienceId() != null) {
            entity.setResearchExperienceId(dto.getResearchExperienceId());
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        entity.setUser(user);
        entity.setLocation(dto.getLocation());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setExperienceDetails(dto.getExperienceDetails());

        return entity;
    }

    public ResearchExperienceDto toDto(ResearchExperience entity) {
        return new ResearchExperienceDto(
                entity.getResearchExperienceId(),
                entity.getLocation(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.getExperienceDetails()
        );
    }
}

