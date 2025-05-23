package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.TeachingActivityDto;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.TeachingActivityMapper;
import fris.dev.backend.repositories.TeachingActivityRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.TeachingActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeachingActivityServiceImpl implements TeachingActivityService {

    private final TeachingActivityRepository teachingActivityRepository;
    private final TeachingActivityMapper teachingActivityMapper;
    private final UserRepository userRepository;

    @Override
    public TeachingActivity submit(TeachingActivityDto dto) {
        return teachingActivityRepository.save(teachingActivityMapper.toEntity(dto));
    }

    @Override
    public List<TeachingActivity> getByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return teachingActivityRepository.findByUser(user);
    }

    @Override
    public List<TeachingActivity> getApproved() {
        return teachingActivityRepository.findByIsApprovedTrue();
    }
}

