package fris.dev.backend.mapper;

import fris.dev.backend.DTO.EducationalBackgroundDto;
import fris.dev.backend.entities.EducationalBackground;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EducationalBackgroundMapper {

    private final UserRepository userRepository;

    public EducationalBackground toEntity(EducationalBackgroundDto dto, String username) {
        EducationalBackground eb = new EducationalBackground();
        if (dto.getEduId() != null) {
            eb.setEduId(dto.getEduId());
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        eb.setUser(user);

        eb.setDegree(dto.getDegree());
        eb.setSchool(dto.getSchool());
        eb.setGraduationYear(dto.getGraduationYear());
        eb.setDegreeType(dto.getDegreeType());

        return eb;
    }

    public EducationalBackgroundDto toDto(EducationalBackground entity) {
        return new EducationalBackgroundDto(
                entity.getEduId(),
                entity.getDegree(),
                entity.getSchool(),
                entity.getGraduationYear(),
                entity.getDegreeType()
        );
    }
}

