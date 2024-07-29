package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Option;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OptionDao extends JpaRepository<Option, Integer> 
{

    @Query("SELECT o FROM Option o WHERE o.question.id = :questionId AND o.isCorrect = TRUE")
    Option getCorrectOption(@Param("questionId") Integer questionId);
    
    @Query(value = "SELECT * FROM options WHERE options.id = :optionId", nativeQuery = true)
    Option getOptionById(Integer optionId);
    
    @Query(value = "SELECT options.id, options.text, options.is_correct, options.question_Id FROM options WHERE options.question_id = :questionId", nativeQuery = true)
    List<Option> getOptionsByIdQuestion(Integer questionId);
}