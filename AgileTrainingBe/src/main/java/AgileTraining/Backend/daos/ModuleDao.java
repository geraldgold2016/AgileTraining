package AgileTraining.Backend.daos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import AgileTraining.Backend.entities.Module;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    @Query(value="SELECT * FROM modules WHERE modules.course_id = :id", nativeQuery = true)
    List<Module> getAllModules(Integer id);
    
    @Query(value="SELECT * FROM modules WHERE modules.course_id = :courseId order by modules.id ASC limit 1", nativeQuery = true)
    Module getFirstModule(@Param("courseId") Integer courseId);
    
    @Query(value = "SELECT COUNT(*) AS total_modules FROM modules WHERE modules.course_id = :courseId",nativeQuery = true)
    Integer getTotalModules(@Param("courseId") Integer courseId);
    
}