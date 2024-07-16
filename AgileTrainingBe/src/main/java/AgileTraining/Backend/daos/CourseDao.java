package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseDao extends JpaRepository<Course, Integer> {


    @Query(value="SELECT * FROM courses", nativeQuery = true)
    List<Course> getAllCourses();
}
