package fris.dev.backend.repositories;

import fris.dev.backend.entities.ApprovalPathAssignment;
import fris.dev.backend.entities.RoleRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApprovalPathAssignmentRepository extends JpaRepository<ApprovalPathAssignment, Long> {
    Optional<ApprovalPathAssignment> findByRoleRankAndCollegeAndDepartment(
            RoleRank roleRank, String college, String department
    );
}

