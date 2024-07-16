package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModuleDao extends JpaRepository<Module, Integer> {


    @Query(value = "SELECT * FROM modules" +
            "JOIN courses ON modules.course_id = courses.id " +
            "WHERE courses.id = :id", nativeQuery = true)
    default List<Module> getAllModules(@Param("id") Integer id) {
        return null;
    }
}

//    @Query(value="SELECT * FROM modules"+
//            "JOIN courses ON modules.course_id" +
//            "JOIN users ON users.id"+
//            "WHERE username = :username " +
//            "WHERE courses.id = :id", nativeQuery = true)
//    )
//    List<Module> getCompletedModules(@Param("id")Integer id), @Param("id") Integer id);
//}



/*
@Query(value="SELECT courses.course_name FROM users " +
        "JOIN subscriptions ON subscriptions.user_id = users.id " +
        "JOIN courses ON subscriptions.course_id = courses.id " +
        "WHERE users.username = :username", nativeQuery = true)
List<Object[]> getCourses(@Param("username") String username);
*/
