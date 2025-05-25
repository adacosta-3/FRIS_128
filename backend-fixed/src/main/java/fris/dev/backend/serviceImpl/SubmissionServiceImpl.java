package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.SubmissionDto;
import fris.dev.backend.entities.Submission;
import fris.dev.backend.entities.User;
import fris.dev.backend.mapper.SubmissionMapper;
import fris.dev.backend.repositories.SubmissionRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    @Override
    public List<SubmissionDto> getPendingSubmissionsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUser(user);
        return submissions.stream()
                .map(submissionMapper::toDto)  // Create a suitable SubmissionDto including linked info
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SubmissionDto> getPendingSubmissionsForUserByType(String username, String activityType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Submission> submissions = submissionRepository.findPendingSubmissionsByUserAndActivityType(user, activityType);

        return submissions.stream()
                .map(submissionMapper::toDto)
                .collect(Collectors.toList());
    }


}