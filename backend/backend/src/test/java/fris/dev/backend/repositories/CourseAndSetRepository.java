package fris.dev.backend.repositories;

import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.entities.TeachingActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAndSetRepository extends JpaRepository<CourseAndSet, Long> {
    List<CourseAndSet> findByTeachingActivity(TeachingActivity activity);
}

