package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question, Integer> {

	@Query(value = "SELECT questions.id FROM questions JOIN courses ON questions.test_id = courses.id WHERE courses.id = :courseId ORDER BY RAND() LIMIT 30", nativeQuery = true)
    List<Object> getQuestionsByCourseId(@Param("courseId") Integer courseId);

    //@Query(value = "SELECT q FROM Question q JOIN q.course c WHERE c.id = :id ORDER BY RAND() LIMIT 30", nativeQuery = true)
    //List<Question> getQuestionsByCourseId(Integer id);
    
    @Query(value = "SELECT * FROM questions WHERE questions.id = :questionId", nativeQuery = true)
    Question getQuestionById(Integer questionId);
}
