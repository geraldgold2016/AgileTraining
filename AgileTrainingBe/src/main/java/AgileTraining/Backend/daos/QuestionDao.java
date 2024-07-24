package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Option;
import AgileTraining.Backend.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question, Integer> {

    @Query(value =
            "SELECT * FROM question WHERE question.id = :id ORDER BY RAND() LIMIT 30" +
                    "JOIN courses ON question.course_id = courses.id" +
                    "WHERE courses.id = :id", nativeQuery = true)
    List<Question> getQuestionsByCourseId(Integer id);

    @Query(value = "SELECT * FROM question WHERE question.id = :questionId", nativeQuery = true)
    Question getQuestionById(Integer questionId);

    @Query(value = "SELECT * FROM options WHERE options.id = :optionId", nativeQuery = true)
    Option getOptionById(Integer optionId);


    @Query(value = "SELECT * FROM questions WHERE questions.test_id = :testId ORDER BY RAND() LIMIT 30", nativeQuery = true)
    List<Question> getQuestionsByTestId(Integer testId);
}
