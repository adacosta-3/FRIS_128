package fris.dev.backend.repositories;

import fris.dev.backend.entities.ResearchExperience;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResearchExperienceRepository extends JpaRepository<ResearchExperience, Long> {
    List<ResearchExperience> findByUser(User user);
}