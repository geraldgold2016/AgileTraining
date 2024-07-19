package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CertificateDao extends JpaRepository<Certificate, Integer> {
    @Query(value=
            "SELECT * FROM certificate WHERE certificate.id = :id", nativeQuery = true)
    Certificate getCertificateById(Integer id);
}
