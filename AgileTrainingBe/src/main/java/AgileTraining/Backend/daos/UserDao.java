package AgileTraining.Backend.daos;


import AgileTraining.Backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface UserDao extends JpaRepository<User, Integer> {


    @Query(value = "select * from users where username = :username", nativeQuery = true)
    User userLogin(@Param("username") String username);


    @Query(value = "select * from users where id = :id", nativeQuery = true)
    User getUserById(@Param("id") Integer id);

}



