package fris.dev.backend.serviceImpl;

import fris.dev.backend.DTO.ApprovalInstanceDto;
import fris.dev.backend.DTO.PendingApprovalDto;
import fris.dev.backend.entities.ApprovalInstance;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import fris.dev.backend.mapper.ApprovalInstanceMapper;
import fris.dev.backend.repositories.ApprovalInstanceRepository;
import fris.dev.backend.repositories.UserRepository;
import fris.dev.backend.repositories.UserRoleRepository;
import fris.dev.backend.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final ApprovalInstanceRepository approvalInstanceRepository;
    private final ApprovalInstanceMapper approvalInstanceMapper;

    @Override
    @Transactional(readOnly = true)
    public List<PendingApprovalDto> getPendingApprovalsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<UserRole> roles = userRoleRepository.findByUser(user);

        List<ApprovalInstance> allPending = new ArrayList<>();

        for (UserRole role : roles) {
            List<ApprovalInstance> instances = approvalInstanceRepository
                    .findPendingApprovalsByRoleRank(role.getRoleRank());
            allPending.addAll(instances);
        }

        return allPending.stream()
                .map(approvalInstanceMapper::toPendingApprovalDto)
                .collect(Collectors.toList());
    }
}



