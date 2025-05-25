package fris.dev.backend.repositories;

import fris.dev.backend.entities.PublicServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicServiceTypeRepository extends JpaRepository<PublicServiceType, Long> {
    List<PublicServiceType> findByTypeName(String typeName);

    @Query("SELECT pst FROM PublicServiceType pst ORDER BY pst.typeName, pst.subtypeName")
    List<PublicServiceType> findAllOrderByTypeNameAndSubtypeName();
}
