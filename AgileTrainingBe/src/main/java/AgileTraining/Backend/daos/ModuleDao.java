package AgileTraining.Backend.daos;


import AgileTraining.Backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    @Query(value="SELECT * FROM modules WHERE modules.course_id = :id", nativeQuery = true)
    List<Module> getAllModules(Integer id);
}