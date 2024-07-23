package AgileTraining.Backend.daos;



import AgileTraining.Backend.entities.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TestResultsDao extends JpaRepository<TestResult, Integer> {


    @Query(value= "SELECT * FROM test_results tr WHERE tr.user_id = :userId AND tr.test_id = :testId",
    nativeQuery = true)
    TestResult getTestResultsByUserIdAndTestId(@Param("userId")Integer userId,@Param("testId") Integer testId);


}
