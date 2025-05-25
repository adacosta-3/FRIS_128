package fris.dev.backend.repositories;

import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeachingActivityRepository extends JpaRepository<TeachingActivity, Long> {
    List<TeachingActivity> findByUser(User user);
    List<TeachingActivity> findByIsApprovedTrue();
    List<TeachingActivity> findByUserAndIsApprovedTrue(User user);
}

