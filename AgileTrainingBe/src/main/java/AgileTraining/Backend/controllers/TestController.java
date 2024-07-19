package AgileTraining.Backend.controllers;


import AgileTraining.Backend.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class TestController {



    @Autowired
    private TestService tService;

//    @Autowired
//    private TestDao tDao;
//
//    @Autowired
//    private QuestionDao qDao;
//
//    @Autowired
//    private OptionDao oDao;



//@PostMapping("/submitTest")
//    public ResponseEntity<?> submit(@RequestParam Integer testResult, @RequestParam Integer testId) {
//
//    TestResults completedTest = tDao.getTestById(testId);
//
//    if (completedTest == null) {
//        return ResponseEntity.badRequest().body("Test non trovato");
//    }
//    completedTest.setTestResult(testResult);
//    completedTest.setnAttempts(completedTest.getnAttempts() + 1);
//    tDao.save(completedTest);
//    return ResponseEntity.ok().body("Punteggio salvato con successo");
//
//}

//    @GetMapping("/beginTest")
//    public ResponseEntity<?> beginTest(@RequestParam Integer courseId) {
//        return ResponseEntity.ok().body(tService.beginTest(courseId));
//    }

    @GetMapping("/checkAnswer")
    public ResponseEntity<Boolean> getCorrect(@RequestBody AnswerRequest answerRequest) {
        Boolean result = tService.checkAnswer(answerRequest.questionId, answerRequest.optionId);
        return ResponseEntity.ok().body(result);
    }


    public static class AnswerRequest {
        public Integer questionId;
        public Integer optionId;

        public Integer getOptionId() {
            return optionId;
        }

        public void setOptionId(Integer optionId) {
            this.optionId = optionId;
        }

        public Integer getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Integer questionId) {
            this.questionId = questionId;
        }
    }

}
