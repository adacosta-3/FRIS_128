package fris.dev.backend.mapper;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeachingActivityMapper {

    private final UserRepository userRepository;

    public TeachingActivity toEntity(TeachingActivityDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new TeachingActivity(null, user, dto.getType(), dto.getDescription(), dto.getAcademicYear(), false);
    }
}
