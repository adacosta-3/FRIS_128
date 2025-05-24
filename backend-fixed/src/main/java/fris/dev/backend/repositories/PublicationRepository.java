package fris.dev.backend.repositories;

import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByUser(User user);
    List<Publication> findByIsApprovedTrue();
}
