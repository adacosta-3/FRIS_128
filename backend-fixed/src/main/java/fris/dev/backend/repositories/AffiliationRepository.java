package fris.dev.backend.repositories;

import fris.dev.backend.entities.Affiliation;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface AffiliationRepository extends JpaRepository<Affiliation, Long> {
    List<Affiliation> findByUser(User user);
}
