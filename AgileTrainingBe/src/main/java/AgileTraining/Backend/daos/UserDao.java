package AgileTraining.Backend.daos;


import AgileTraining.Backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserDao extends JpaRepository<User, Integer> {



        @Query(value = "SELECT * FROM users WHERE username = :username", nativeQuery = true)
        User userLogin(@Param("username") String username);

        @Query(value = "SELECT * FROM users WHERE id = :id", nativeQuery = true)
        Optional<User> findById(@Param("id") Integer id);
    }

//    @Query(value = "select * from users where id = :id", nativeQuery = true)
//    User getUserById(@Param("id") Integer id);
//
//    @Query(value = "select * from users where username = :username", nativeQuery = true)
//    User userLogin(@Param("username") String username);





