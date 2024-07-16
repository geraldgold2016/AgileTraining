package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    List<java.lang.Module> getCompletedModules();
}

/*
@Query(value="SELECT courses.course_name FROM users " +
        "JOIN subscriptions ON subscriptions.user_id = users.id " +
        "JOIN courses ON subscriptions.course_id = courses.id " +
        "WHERE users.username = :username", nativeQuery = true)
List<Object[]> getCourses(@Param("username") String username);
*/
