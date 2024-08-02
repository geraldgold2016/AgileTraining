package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CertificateDao extends JpaRepository<Certificate, Integer> 
{
    @Query(value = "SELECT * FROM certificates WHERE id = :id", nativeQuery = true)
    Certificate getCertificateById(Integer id);
    
    @Query(value = "SELECT id FROM certificates WHERE course_id = :idCourse and user_id = :idUtente", nativeQuery = true)
    Integer getCertificateIdByUserAndCourse(Integer idCourse, Integer idUtente);
}
