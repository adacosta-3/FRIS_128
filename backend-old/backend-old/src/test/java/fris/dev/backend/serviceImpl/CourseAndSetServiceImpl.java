package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.CourseAndSetDto;
import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.mapper.CourseAndSetMapper;
import fris.dev.backend.repositories.CourseAndSetRepository;
import fris.dev.backend.repositories.TeachingActivityRepository;
import fris.dev.backend.service.CourseAndSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseAndSetServiceImpl implements CourseAndSetService {

    private final CourseAndSetRepository repository;
    private final CourseAndSetMapper mapper;
    private final TeachingActivityRepository teachingActivityRepository;

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
}
