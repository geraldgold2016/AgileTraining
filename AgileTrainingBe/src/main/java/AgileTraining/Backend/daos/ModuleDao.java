package AgileTraining.Backend.daos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import AgileTraining.Backend.entities.Module;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    @Query(value="SELECT * FROM modules WHERE modules.course_id = :id", nativeQuery = true)
    List<Module> getAllModules(Integer id);
}