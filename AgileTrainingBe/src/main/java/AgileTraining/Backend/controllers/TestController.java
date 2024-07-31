package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.TestResultDao;
import AgileTraining.Backend.entities.Question;
import AgileTraining.Backend.services.TestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {


    @Autowired
    private TestService tService;

    @Autowired
    private TestResultDao trDao;

    Logger logger = LoggerFactory.getLogger("infoFile");

    // salva il risultato di un test
    // testato
    @PostMapping("/submitTest")
    public ResponseEntity<?> submit(@RequestBody NewTestRequest newTestRequest, @RequestParam Integer testResult) {
        logger.info("Received request to submit test");
        tService.submitTest(testResult, newTestRequest.testId, newTestRequest.userId);
        return ResponseEntity.ok().body(new BackendResponse("Test submitted successfully"));
    }

//    @GetMapping("/beginTest")
//    public ResponseEntity<?> beginTest(@RequestParam Integer courseId) {
//        return ResponseEntity.ok().body(tService.beginTest(courseId));
//    }

    // controlla se risposta è corretta
    // testato
    @GetMapping("/checkAnswer")
    public ResponseEntity<Boolean> getCorrect(@RequestBody AnswerRequest answerRequest) {
        logger.info("Received request to check answer");
        Boolean result = tService.checkAnswer(answerRequest.questionId, answerRequest.optionId);
        return ResponseEntity.ok().body(result);
    }

    // ottiene i risultati di un test
    // testato
    @GetMapping("/{userId}/getTestResults")
    public ResponseEntity<?> getTestResults(@PathVariable Integer userId, @RequestParam Integer testId) {
        logger.info("Received request to get test results");
        return ResponseEntity.ok().body(tService.getTestResults(userId, testId));
    }

    // controlla se sono stati fatti piu di 3 tentativi
    // true = sono stati fatti piu di 3 tentativi
    // testato
    @GetMapping("/{userId}/checkAttempts")
    public ResponseEntity<?> checkAttempts(@PathVariable Integer userId, @RequestParam(name = "testId") Integer testId) {
        logger.info("Received request to check attempts");
        return ResponseEntity.ok().body(tService.checkAttempts(userId,testId));
    }

    @PostMapping("/beginTest")
    public ResponseEntity<?> beginTest(@RequestBody NewTestRequest newTestRequest) {
        logger.info("Received request to begin test.");
        return ResponseEntity.ok().body(tService.beginTest(newTestRequest.testId, newTestRequest.userId));
    }

    // ottiene 30 domande random
    @GetMapping("/getQuestions")
    public ResponseEntity<?> getQuestions(@RequestParam Integer testId) {
        logger.info("Received request to get questions");
        List<Question> questions = tService.getQuestions(testId);
        if (questions.isEmpty()) {
            logger.error("No questions found");
            return ResponseEntity.status(404).body(new BackendResponse("No questions found"));
        }
        return ResponseEntity.ok().body(questions);
    }

    // ottiene le opzioni di una domanda
    // testato
    @GetMapping("/getOptionsForOneQuestion")
    public ResponseEntity<?> getOptions(@RequestParam Integer questionId) {
        logger.info("Received request to get options");
        return ResponseEntity.ok().body(tService.getOptionsOneQuestion(questionId));
    }

    // NON TESTABILE DA BE. DA TESTARE DA FE
    @GetMapping("/getOptions")
    public ResponseEntity<?> getOptions(@RequestParam List<Question> questions) {
        logger.info("Received request to get options");
        return ResponseEntity.ok().body(tService.getOptions(questions));
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


    public static class NewTestRequest {
        public Integer testId;
        public Integer userId;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getTestId() {
            return testId;
        }

        public void setTestId(Integer testId) {
            this.testId = testId;
        }
    }

}
