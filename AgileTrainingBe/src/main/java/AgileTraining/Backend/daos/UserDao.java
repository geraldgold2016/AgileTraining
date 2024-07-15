package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Integer> {


}
