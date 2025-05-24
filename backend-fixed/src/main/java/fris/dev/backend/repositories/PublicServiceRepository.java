package fris.dev.backend.repositories;

import fris.dev.backend.entities.PublicService;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicServiceRepository extends JpaRepository<PublicService, Long> {
    List<PublicService> findByUser(User user);
    List<PublicService> findByIsApprovedTrue();
    List<PublicService> findByUserAndIsApprovedTrue(User user);
    List<PublicService> findByUserAndIsApprovedTrueOrderByServiceType_TypeNameAscServiceType_SubtypeNameAsc(User user);


}
