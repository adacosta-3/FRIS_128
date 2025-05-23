package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.SubmissionMapper;
import fris.dev.backend.repositories.SubmissionRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionMapper submissionMapper;
    private final UserRepository userRepository;

    @Override
    public Submission submit(SubmissionDto dto) {
        return submissionRepository.save(submissionMapper.toEntity(dto));
    }

    @Override
    public List<Submission> getUserSubmissions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return submissionRepository.findByUser(user);
    }
}