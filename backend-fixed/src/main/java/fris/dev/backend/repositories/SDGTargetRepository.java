package fris.dev.backend.repositories;

import fris.dev.backend.entities.SDG;
import fris.dev.backend.entities.SDGTarget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SDGTargetRepository extends JpaRepository<SDGTarget, Long> {
    List<SDGTarget> findBySdg(SDG sdg);
}
