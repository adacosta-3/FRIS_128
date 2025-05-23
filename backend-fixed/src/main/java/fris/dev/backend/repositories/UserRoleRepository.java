package fris.dev.backend.repositories;

import fris.dev.backend.entities.RoleRank;
import fris.dev.backend.entities.User;
import fris.dev.backend.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser(User user);
    List<UserRole> findByRoleRank(RoleRank roleRank);
    List<UserRole> findByCollegeAndDepartment(String college, String department);
}


