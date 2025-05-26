package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicationDto;
import fris.dev.backend.DTO.PublicationResponseDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.PublicationMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.PublicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicationServiceImpl implements PublicationService {

    private final PublicationRepository publicationRepository;
    private final PublicationMapper publicationMapper;
    private final UserRepository userRepository;
    private final PublicationTypeRepository publicationTypeRepository;
    private final SDGRepository sdgRepository;
    private final SDGTargetRepository sdgTargetRepository;
    private final SubmissionRepository submissionRepository;
    private final ApprovalPathAssignmentRepository pathAssignmentRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public Publication submitPublication(PublicationDto dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Publication publication = publicationRepository.save(publicationMapper.toEntity(dto));

        Submission submission = new Submission();
        submission.setUser(publication.getUser());
        submission.setActivityType("publication");
        submission.setReferenceId(publication.getPublicationId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

//        User user = publication.getUser();
//        List<UserRole> roles = userRoleRepository.findByUser(user);
        List<UserRole> roles = userRoleRepository.findByUser(publication.getUser());


        if (roles.isEmpty()) {
            throw new IllegalStateException("User has no assigned roles. Cannot assign approval path.");
        }

        Optional<ApprovalPathAssignment> foundAssignment = Optional.empty();

        for (UserRole role : roles) {
            foundAssignment = pathAssignmentRepository
                    .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
            if (foundAssignment.isPresent()) {
                break;
            }
        }

        if (!foundAssignment.isPresent()) {
            RoleRank defaultRole = roles.get(0).getRoleRank();
            foundAssignment = pathAssignmentRepository.findByRoleRankAndCollegeAndDepartment(defaultRole, null, null);
        }

        if (!foundAssignment.isPresent()) {
            throw new IllegalStateException("No approval path assignment found for user's role and unit.");
        }

        ApprovalPath approvalPath = foundAssignment.get().getApprovalPath();

        ApprovalInstance instance = new ApprovalInstance();
        instance.setSubmission(submission);
        instance.setVersion(1);
        instance.setApprovalPath(approvalPath);
        instance.setCurrentLevel(1);
        instance.setStatus("Pending");
        instance.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        instance.setManualOverride(false);
        approvalInstanceRepository.save(instance);

        return publication;
    }

    @Override
    public List<Publication> getUserPublications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return publicationRepository.findByUser(user);
    }

    @Override
    public List<Publication> getApprovedPublications() {
        return publicationRepository.findByIsApprovedTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationResponseDto> getApprovedPublicationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Publication> publications = publicationRepository.findByUserAndIsApprovedTrue(user);

        return publications.stream()
                .map(publicationMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationResponseDto> getApprovedPublicationsByUserAndType(Long userId, Long publicationTypeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Publication> publications;

        if (publicationTypeId != null) {
            publications = publicationRepository.findByUserAndIsApprovedTrueAndPublicationType_PublicationTypeId(user, publicationTypeId);
        } else {
            publications = publicationRepository.findByUserAndIsApprovedTrue(user);
        }

        return publications.stream()
                .map(publicationMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void saveAllFromDto(List<PublicationDto> dtos, String loggedInUsername) {
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (PublicationDto dto : dtos) {
            // Ignore dto.getUserId(), override with logged-in user
            dto.setUserId(user.getUserId());

            submitPublication(dto, loggedInUsername);  // this method already uses dto.userId to set User
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationResponseDto> getApprovedPublicationsByType(String username, String typeName) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Publication> publications = publicationRepository.findApprovedByUserAndTypeName(user, typeName);

        return publications.stream()
                .map(publicationMapper::toResponseDto)
                .collect(Collectors.toList());
    }

}
