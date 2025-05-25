package fris.dev.backend.repositories;

import fris.dev.backend.entities.ResearchInterest;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResearchInterestRepository extends JpaRepository<ResearchInterest, Long> {
    List<ResearchInterest> findByUser(User user);
}
