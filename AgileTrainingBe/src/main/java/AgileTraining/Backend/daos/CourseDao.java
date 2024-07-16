package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseDao extends JpaRepository<Course, Integer> {


    // TODO - Implementare la query per ottenere i corsi completati dall'utente
    @Query(value="SELECT * FROM courses", nativeQuery = true)

    /*
    *   WHERE username = :username", nativeQuery = true)
    *
    *
    */


    List<Object[]> getCompletedCourses(@Param("username") String username);


    @Query(value="SELECT * FROM courses", nativeQuery = true)
    List<Course> getAllCourses();
}
