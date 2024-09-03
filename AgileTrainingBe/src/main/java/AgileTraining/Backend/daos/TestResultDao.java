package AgileTraining.Backend.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import AgileTraining.Backend.entities.TestResult;

public interface TestResultDao extends JpaRepository<TestResult, Integer> {

    @Query(value = "SELECT * FROM test_results WHERE test_results.id = :id", nativeQuery = true)
    TestResult getTestResultById(@Param("id") Integer id);

    @Query(value = "SELECT COUNT(*) FROM test_results WHERE test_id = :testId AND user_id = :userId", nativeQuery = true)
    Integer getAttempts(@Param("testId") Integer testId, @Param("userId") Integer userId);

    @Query(value = "SELECT id FROM test_results WHERE user_id = :userId AND test_id = :testId ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Integer findLatestIdByUserIdAndTestId(@Param("userId") Integer userId, @Param("testId") Integer testId);
}
