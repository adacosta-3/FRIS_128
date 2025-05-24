package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.AuthorshipDto;
import fris.dev.backend.entities.Authorship;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.AuthorshipMapper;
import fris.dev.backend.repositories.AuthorshipRepository;
import fris.dev.backend.repositories.TeachingActivityRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.AuthorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorshipServiceImpl implements AuthorshipService {

    private final AuthorshipRepository repository;
    private final AuthorshipMapper mapper;
    private final TeachingActivityRepository teachingActivityRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Authorship addAuthorship(AuthorshipDto dto, String loggedInUsername) {
        // Verify logged in user
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        TeachingActivity teachingActivity = teachingActivityRepository.findById(dto.getTeachingId())
                .orElseThrow(() -> new IllegalArgumentException("Teaching activity not found"));

        if (!teachingActivity.getUser().getUserId().equals(user.getUserId())) {
            throw new AccessDeniedException("You do not own this teaching activity.");
        }

        // Map and save
        Authorship authorship = mapper.toEntity(dto);
        return repository.save(authorship);
    }

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
