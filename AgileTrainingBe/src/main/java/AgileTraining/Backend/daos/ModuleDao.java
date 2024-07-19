package AgileTraining.Backend.daos;


import AgileTraining.Backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    @Query(value="SELECT * FROM modules WHERE modules.course_id = :id", nativeQuery = true)

    List<Module> getAllModules(Integer id);



//    List<java.lang.Module> getAllModulesByCourseId(Course courseId);
}

/*
@Query(value="SELECT courses.course_name FROM users " +
        "JOIN subscriptions ON subscriptions.user_id = users.id " +
        "JOIN courses ON subscriptions.course_id = courses.id " +
        "WHERE users.username = :username", nativeQuery = true)
List<Object[]> getCourses(@Param("username") String username);
*/
