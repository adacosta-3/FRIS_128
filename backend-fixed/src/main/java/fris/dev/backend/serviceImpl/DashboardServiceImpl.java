package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.DashboardDto;
import fris.dev.backend.entities.User;
import fris.dev.backend.repositories.CourseAndSetRepository;
import fris.dev.backend.repositories.PublicationRepository;
import fris.dev.backend.repositories.SubmissionRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final PublicationRepository publicationRepository;
    private final CourseAndSetRepository courseAndSetRepository;
    private final SubmissionRepository submissionRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardDto getDashboardCounts(String username, String academicYear, String term) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        int totalPubs = publicationRepository.countPubsByUser(user);
        int totalProjects = publicationRepository.countProjectsByUser(user);
        int coursesCount = courseAndSetRepository.countCoursesByUserAndTerm(user, academicYear, term);
        int pendingSubs = submissionRepository.countPendingSubmissionsByUser(user);

        return new DashboardDto(totalPubs, totalProjects, coursesCount, pendingSubs);
    }

}
