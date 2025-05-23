package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.entities.Authorship;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.mapper.AuthorshipMapper;
import fris.dev.backend.repositories.AuthorshipRepository;
import fris.dev.backend.repositories.TeachingActivityRepository;
import fris.dev.backend.service.AuthorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorshipServiceImpl implements AuthorshipService {

    private final AuthorshipRepository repository;
    private final AuthorshipMapper mapper;
    private final TeachingActivityRepository teachingActivityRepository;

    @Override
    public Authorship add(AuthorshipDto dto) {
        return repository.save(mapper.toEntity(dto));
    }

    @Override
    public List<Authorship> getByTeachingId(Long teachingId) {
        TeachingActivity activity = teachingActivityRepository.findById(teachingId)
                .orElseThrow(() -> new IllegalArgumentException("TeachingActivity not found"));
        return repository.findByTeachingActivity(activity);
    }
}
