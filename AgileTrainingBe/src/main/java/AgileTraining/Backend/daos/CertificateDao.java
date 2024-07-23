package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CertificateDao extends JpaRepository<Certificate, Integer> {
    @Query(value=
            "SELECT * FROM certificates WHERE certificates.id = :id", nativeQuery = true)
    Certificate getCertificateById(Integer id);


    @Query(value=
            "SELECT certificate_key FROM certificates WHERE certificates.id = :id", nativeQuery = true)
    String getCertificateKeyById(Integer id);

    @Query(value=
            "SELECT * FROM certificates WHERE certificates.user_id = :userId AND certificates.course_id = :courseId", nativeQuery = true)
    Certificate getCertificateByUserANDcourseId(Integer userId, Integer courseId);
}





