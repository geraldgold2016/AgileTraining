package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.TestDao;
import AgileTraining.Backend.daos.TestResultDao;
import AgileTraining.Backend.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TestController 
{


    @Autowired
    private TestService tService;


    @Autowired
    private TestResultDao trDao;
    
    @Autowired
    private TestDao tDao;


    @GetMapping("/getAttempts")
    public ResponseEntity<?> getAttempts(@RequestParam Integer testResultId) {
        Integer nAttempts = trDao.getAttempts(testResultId);
        return ResponseEntity.ok().body(new BackendResponse(
                "Numero di tentativi: " + nAttempts));
    }


    @PostMapping("/submitTest")
    public ResponseEntity<?> submitTest(@RequestBody SubmitRequest submitRequest) {
        tService.submitTest(submitRequest.testResult, submitRequest.testId);
        return ResponseEntity.ok().body(new BackendResponse(
                "Punteggio salvato con successo"));
    }


    @PostMapping("/beginTest")
    public ResponseEntity<?> beginTest(@RequestBody TestRequest testRequest) {
        tService.newTest(testRequest.userId, testRequest.testId);
        return ResponseEntity.ok().body(new BackendResponse(
                "Test iniziato con successo"));
    }

    @GetMapping("/checkAnswer")
    public ResponseEntity<Boolean> getCorrect(@RequestBody AnswerRequest answerRequest) {
        Boolean result = tService.checkAnswer(answerRequest.questionId, answerRequest.optionId);
        return ResponseEntity.ok().body(result);
    }
    
    @GetMapping("/getTestId/{idCourse}")
    public ResponseEntity<?> getTestIdByCourseId(@PathVariable Integer idCourse) 
    {
        Integer IdTest = tDao.getTestIdByCourseId(idCourse);
       return ResponseEntity.ok(IdTest);
    }

    @GetMapping("/latestId/{userId}/{testId}")
    public ResponseEntity<?> getLatestTestResultId(@PathVariable Integer userId, @PathVariable Integer testId) 
    {
        Integer latestId = trDao.findLatestIdByUserIdAndTestId(userId, testId);
       return ResponseEntity.ok(latestId);
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

    public static class TestRequest {
        public Integer userId;
        public Integer testId;

        public Integer getUserId() {
            return userId;
        }

        public Integer getTestId() {
            return testId;
        }

        public void setTestId(Integer testId) {
            this.testId = testId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }
    }

    public static class SubmitRequest {
        public Integer testResult;
        public Integer testId;

        public Integer getTestResult() {
            return testResult;
        }

        public void setTestResult(Integer testResult) {
            this.testResult = testResult;
        }

        public Integer getTestId() {
            return testId;
        }

        public void setTestId(Integer testId) {
            this.testId = testId;
        }
    }

}
