package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TestResultDao extends JpaRepository<TestResult, Integer> {
    @Query(value=
            "SELECT * FROM test_results WHERE test_results.id = :id", nativeQuery = true)
    TestResult getTestResultById(Integer id);


    @Query(value=
            "SELECT n_attempts FROM test_results WHERE test_results.id = :testResultId", nativeQuery = true)
    Integer getAttempts(Integer testResultId);
}
