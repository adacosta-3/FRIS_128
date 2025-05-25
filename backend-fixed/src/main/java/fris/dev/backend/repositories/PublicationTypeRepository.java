package fris.dev.backend.repositories;

import fris.dev.backend.entities.PublicationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationTypeRepository extends JpaRepository<PublicationType, Long> {
    List<PublicationType> findByTypeName(String typeName);
    @Query("SELECT pt FROM PublicationType pt ORDER BY pt.typeName, pt.subtypeName")
    List<PublicationType> findAllOrderByTypeNameAndSubtypeName();
}
