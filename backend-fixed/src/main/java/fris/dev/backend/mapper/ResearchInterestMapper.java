package fris.dev.backend.mapper;

import fris.dev.backend.DTO.ResearchInterestDto;
import fris.dev.backend.entities.ResearchInterest;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ResearchInterestMapper {

    private final UserRepository userRepository;

    public ResearchInterest toEntity(ResearchInterestDto dto, String username) {
        ResearchInterest entity = new ResearchInterest();

        if (dto.getResearchInterestId() != null) {
            entity.setResearchInterestId(dto.getResearchInterestId());
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        entity.setUser(user);
        entity.setResearchInterest(dto.getResearchInterest());

        return entity;
    }

    public ResearchInterestDto toDto(ResearchInterest entity) {
        return new ResearchInterestDto(
                entity.getResearchInterestId(),
                entity.getResearchInterest()
        );
    }
}

