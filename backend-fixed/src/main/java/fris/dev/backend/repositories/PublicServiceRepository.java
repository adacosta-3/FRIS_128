package fris.dev.backend.repositories;

import fris.dev.backend.entities.PublicService;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicServiceRepository extends JpaRepository<PublicService, Long> {
    List<PublicService> findByUser(User user);
    List<PublicService> findByIsApprovedTrue();
    List<PublicService> findByUserAndIsApprovedTrue(User user);
    List<PublicService> findByUserAndIsApprovedTrueOrderByServiceType_TypeNameAscServiceType_SubtypeNameAsc(User user);

    @Query("""
    SELECT ps FROM PublicService ps
    JOIN ps.serviceType pst
    WHERE ps.user = :user
      AND ps.isApproved = TRUE
      AND pst.typeName = :typeName
""")
    List<PublicService> findApprovedByUserAndTypeName(
            @Param("user") User user,
            @Param("typeName") String typeName);


}
