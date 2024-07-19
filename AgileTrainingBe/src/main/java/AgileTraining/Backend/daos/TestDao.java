package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TestDao extends JpaRepository<Test, Integer> {

    @Query(value=
            "SELECT * FROM test WHERE test.id = :id", nativeQuery = true)
    Test getTestById(Integer id);



}
