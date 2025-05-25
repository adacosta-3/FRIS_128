package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.PublicServiceDto;
import fris.dev.backend.DTO.PublicServiceResponseDto;
import fris.dev.backend.entities.*;
import fris.dev.backend.mapper.PublicServiceMapper;
import fris.dev.backend.repositories.*;
import fris.dev.backend.service.PublicServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicServiceServiceImpl implements PublicServiceService {

    private final PublicServiceRepository repository;
    private final PublicServiceMapper mapper;
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final ApprovalPathAssignmentRepository pathAssignmentRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final UserRoleRepository userRoleRepository;
    private final PublicServiceTypeRepository serviceTypeRepository;


    @Override
    @Transactional
    public PublicService create(PublicServiceDto dto, String loggedInUsername) {
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        PublicService publicService = mapper.toEntity(dto);
        publicService.setUser(user);

        publicService = repository.save(publicService);

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setActivityType("service");
        submission.setReferenceId(publicService.getServiceId());
        submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
        submission.setCurrentVersion(1);
        submission = submissionRepository.save(submission);

        List<UserRole> roles = userRoleRepository.findByUser(user);

        if (roles.isEmpty()) {
            throw new IllegalStateException("User has no assigned roles for approval path.");
        }

        Optional<ApprovalPathAssignment> foundAssignment = Optional.empty();

        for (UserRole role : roles) {
            foundAssignment = pathAssignmentRepository.findByRoleRankAndCollegeAndDepartment(
                    role.getRoleRank(), role.getCollege(), role.getDepartment()
            );
            if (foundAssignment.isPresent()) {
                break;
            }
        }

        if (!foundAssignment.isPresent()) {
            foundAssignment = pathAssignmentRepository.findByRoleRankAndCollegeAndDepartment(
                    roles.get(0).getRoleRank(), null, null
            );
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

        return publicService;
    }

    @Override
    public List<PublicService> getByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return repository.findByUser(user);
    }

    @Override
    public List<PublicService> getApproved() {
        return repository.findByIsApprovedTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicServiceResponseDto> getApprovedPublicServicesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<PublicService> services = repository.findByUserAndIsApprovedTrue(user);

        return services.stream()
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicServiceResponseDto> getApprovedPublicServicesByUserSorted(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<PublicService> services = repository
                .findByUserAndIsApprovedTrueOrderByServiceType_TypeNameAscServiceType_SubtypeNameAsc(user);

        return services.stream()
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }

    // Implement bulk save from DTOs for CSV upload
    @Override
    @Transactional
    public void saveAllFromDto(List<PublicServiceDto> dtos, String loggedInUsername) {
        User user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (PublicServiceDto dto : dtos) {
            // Map DTO to entity and set user
            PublicService service = mapper.toEntity(dto);
            service.setUser(user);

            // Resolve and set ServiceType by ID
            PublicServiceType serviceType = serviceTypeRepository.findById(dto.getServiceTypeId())
                    .orElseThrow(() -> new IllegalArgumentException("ServiceType not found"));
            service.setServiceType(serviceType);

            // Save public service entity
            service = repository.save(service);

            // Create submission wrapper
            Submission submission = new Submission();
            submission.setUser(user);
            submission.setActivityType("service");
            submission.setReferenceId(service.getServiceId());
            submission.setSubmittedAt(new Timestamp(System.currentTimeMillis()));
            submission.setCurrentVersion(1);
            submission = submissionRepository.save(submission);

            // Find approval path assignment
            List<UserRole> roles = userRoleRepository.findByUser(user);
            if (roles.isEmpty()) throw new IllegalStateException("User has no roles");

            Optional<ApprovalPathAssignment> assignment = Optional.empty();
            for (UserRole role : roles) {
                assignment = pathAssignmentRepository
                        .findByRoleRankAndCollegeAndDepartment(role.getRoleRank(), role.getCollege(), role.getDepartment());
                if (assignment.isPresent()) break;
            }
            if (!assignment.isPresent()) {
                // fallback to global
                assignment = pathAssignmentRepository
                        .findByRoleRankAndCollegeAndDepartment(roles.get(0).getRoleRank(), null, null);
            }
            if (!assignment.isPresent()) throw new IllegalStateException("No approval path found");

            // Create approval instance
            ApprovalInstance ai = new ApprovalInstance();
            ai.setSubmission(submission);
            ai.setVersion(1);
            ai.setApprovalPath(assignment.get().getApprovalPath());
            ai.setCurrentLevel(1);
            ai.setStatus("Pending");
            ai.setLastUpdated(new Timestamp(System.currentTimeMillis()));
            ai.setManualOverride(false);
            approvalInstanceRepository.save(ai);
        }
    }
}
