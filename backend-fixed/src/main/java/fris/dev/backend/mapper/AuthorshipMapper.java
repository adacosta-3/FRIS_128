package fris.dev.backend.mapper;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.entities.Authorship;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.repositories.TeachingActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorshipMapper {

    private final TeachingActivityRepository teachingActivityRepository;

    public Authorship toEntity(AuthorshipDto dto) {
        TeachingActivity activity = teachingActivityRepository.findById(dto.getTeachingId())
                .orElseThrow(() -> new IllegalArgumentException("TeachingActivity not found"));

        return new Authorship(null, activity,
                dto.getTitle(), dto.getAuthors(), dto.getDate(), dto.getUpCourse(),
                dto.getRecommendingUnit(), dto.getPublisher(), dto.getAuthorshipType(),
                dto.getNumberOfAuthors(), dto.getSupportingDocument());
    }
}
