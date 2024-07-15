package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleDao extends JpaRepository<Module, Integer> {

}
