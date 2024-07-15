package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityDao extends JpaRepository<Activity, Integer> {
}
