package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseDao extends JpaRepository<Course, Integer> {
}
