package AgileTraining.Backend.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import AgileTraining.Backend.entities.Test;

public interface TestDao extends JpaRepository<Test, Integer> {

    @Query(value = "SELECT * FROM test WHERE test.id = :id", nativeQuery = true)
    Test getTestById(Integer id);

    @Query(value = "SELECT id FROM tests t WHERE course_id = :idCourse", nativeQuery = true)
    Integer getTestIdByCourseId(Integer idCourse);

}
