package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Activity;
import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActivityDao extends JpaRepository<Activity, Integer> {


    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId AND a.isCompleted = true")
    List<Activity> findCompletedActivitiesByUserId(@Param("userId") Integer userId);
}
