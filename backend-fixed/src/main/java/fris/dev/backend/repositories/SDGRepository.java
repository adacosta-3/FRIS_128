package fris.dev.backend.repositories;

import fris.dev.backend.entities.SDG;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SDGRepository extends JpaRepository<SDG, Long> {
    // Optionally add custom queries here
}
