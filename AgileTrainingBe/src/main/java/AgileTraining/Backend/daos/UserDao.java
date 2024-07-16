package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Subscription;
import AgileTraining.Backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import static org.hibernate.FetchMode.JOIN;

public interface UserDao extends JpaRepository<User, Integer> {


    @Query(value = "select * from users where username = :username", nativeQuery = true)
    User userLogin(@Param("username") String username);

}



