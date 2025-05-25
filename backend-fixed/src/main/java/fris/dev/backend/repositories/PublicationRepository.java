package fris.dev.backend.repositories;

import fris.dev.backend.entities.Publication;
import fris.dev.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByUser(User user);
    List<Publication> findByIsApprovedTrue();
    List<Publication> findByUserAndIsApprovedTrue(User user);
    List<Publication> findByUserAndIsApprovedTrueAndPublicationType_PublicationTypeId(User user, Long publicationTypeId);

    @Query("""
    SELECT COUNT(p) FROM Publication p
    JOIN p.publicationType pt
    WHERE p.user = :user
      AND pt.typeName = 'Publication'
""")
    int countPubsByUser(@Param("user") User user);


    @Query("""
    SELECT COUNT(p) FROM Publication p
    JOIN p.publicationType pt
    WHERE p.user = :user
      AND pt.typeName = 'Project'
""")
    int countProjectsByUser(@Param("user") User user);

}
