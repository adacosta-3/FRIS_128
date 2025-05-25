package fris.dev.backend.mapper;

import fris.dev.backend.DTO.AffiliationDto;
import fris.dev.backend.entities.Affiliation;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AffiliationMapper {

    private final UserRepository userRepository;

    public Affiliation toEntity(AffiliationDto dto, String username) {
        Affiliation entity = new Affiliation();

        if (dto.getAffiliationId() != null) {
            entity.setAffiliationId(dto.getAffiliationId());
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        entity.setUser(user);
        entity.setAffiliationName(dto.getAffiliationName());
        entity.setAffiliationType(dto.getAffiliationType());

        return entity;
    }

    public AffiliationDto toDto(Affiliation entity) {
        return new AffiliationDto(
                entity.getAffiliationId(),
                entity.getAffiliationName(),
                entity.getAffiliationType()
        );
    }
}
