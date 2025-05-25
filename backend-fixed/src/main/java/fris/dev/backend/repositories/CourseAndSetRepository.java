package fris.dev.backend.repositories;

import fris.dev.backend.entities.CourseAndSet;
import fris.dev.backend.entities.TeachingActivity;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAndSetRepository extends JpaRepository<CourseAndSet, Long> {
    List<CourseAndSet> findByTeachingActivity(TeachingActivity activity);
    @Query("""
    SELECT COUNT(cs) FROM CourseAndSet cs
    JOIN cs.teachingActivity ta
    WHERE ta.user = :user
      AND cs.academicYear = :academicYear
      AND cs.term = :term
""")
    int countCoursesByUserAndTerm(@Param("user") User user, @Param("academicYear") String academicYear, @Param("term") String term);

}
