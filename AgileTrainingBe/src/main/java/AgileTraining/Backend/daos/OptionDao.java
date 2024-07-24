package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OptionDao extends JpaRepository<Option, Integer> {

    @Query(value= "SELECT * FROM Options WHERE question_id = :questionId AND isCorrect = TRUE", nativeQuery = true)
    Option getCorrectOption(@Param("questionId") Integer questionId);

    @Query(value= "SELECT * FROM Options WHERE question_id = :questionId", nativeQuery = true)
    List<Option> getOptionsByQuestionId(@Param("questionId") Integer questionId);

    @Query(value= "SELECT * FROM Options WHERE question_id = :questionId", nativeQuery = true)
    List<Option> getOptionsOneQuestion(@Param("questionId") Integer questionId);
}
