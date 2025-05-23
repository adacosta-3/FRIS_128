package fris.dev.backend.repositories;

import fris.dev.backend.entities.Authorship;
import fris.dev.backend.entities.TeachingActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorshipRepository extends JpaRepository<Authorship, Long> {
    List<Authorship> findByTeachingActivity(TeachingActivity activity);
}

