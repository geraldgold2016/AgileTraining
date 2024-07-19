package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OptionDao extends JpaRepository<Option, Integer> {

    @Query("SELECT o FROM Option o WHERE o.question.id = :questionId AND o.isCorrect = TRUE")
    Option getCorrectOption(@Param("questionId") Integer questionId);
}