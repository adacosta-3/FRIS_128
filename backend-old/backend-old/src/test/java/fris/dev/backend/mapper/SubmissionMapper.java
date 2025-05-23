package fris.dev.backend.mapper;

import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class SubmissionMapper {

    private final UserRepository userRepository;

    public Submission toEntity(SubmissionDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new Submission(null, user, dto.getActivityType(), dto.getReferenceId(), new Timestamp(System.currentTimeMillis()), 1);
    }
}
