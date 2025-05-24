package fris.dev.backend.repositories;

import fris.dev.backend.entities.RoleRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRankRepository extends JpaRepository<RoleRank, Long> {
    Optional<RoleRank> findByRoleRankName(String roleRankName);
}