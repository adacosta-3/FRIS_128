package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.CourseAndSetMapper;
import fris.dev.backend.repositories.CourseAndSetRepository;
import fris.dev.backend.repositories.TeachingActivityRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.CourseAndSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseAndSetServiceImpl implements CourseAndSetService {

    private final CourseAndSetRepository repository;
    private final CourseAndSetMapper mapper;
    private final TeachingActivityRepository teachingActivityRepository;
    private final UserRepository userRepository;

    @Override
    public CourseAndSet add(CourseAndSetDto dto) {
        return repository.save(mapper.toEntity(dto));
    }

    @Override
    public List<CourseAndSet> getByTeachingId(Long teachingId) {
        TeachingActivity activity = teachingActivityRepository.findById(teachingId)
                .orElseThrow(() -> new IllegalArgumentException("TeachingActivity not found"));
        return repository.findByTeachingActivity(activity);
    }

    @Override
    @Transactional
    public CourseAndSet addCourseSet(CourseAndSetDto dto, String loggedInUsername) {
        // Verify the logged-in user owns the referenced teaching activity
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        TeachingActivity teachingActivity = teachingActivityRepository.findById(dto.getTeachingId())
                .orElseThrow(() -> new IllegalArgumentException("Teaching activity not found"));

        if (!teachingActivity.getUser().getUserId().equals(user.getUserId())) {
            throw new AccessDeniedException("You do not own this teaching activity.");
        }

        // Map and save
        CourseAndSet courseAndSet = mapper.toEntity(dto);
        return repository.save(courseAndSet);
    }
}