package AgileTraining.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import AgileTraining.Backend.daos.QuestionDao;
import AgileTraining.Backend.entities.Question;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController 
{
    @Autowired
    private QuestionDao QDao;
    
    @GetMapping("/{courseId}/getQuestions")
    public ResponseEntity<Object> getQuestionByCourseId(@PathVariable Integer courseId) 
    {
        List<Object> questions = QDao.getQuestionsByCourseId(courseId);
        return ResponseEntity.ok().body(questions);
    }
    @GetMapping("/{questionId}/getQuestion")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer questionId) 
    {
        Question question = QDao.getQuestionById(questionId);
        return ResponseEntity.ok().body(question);
    }
}
