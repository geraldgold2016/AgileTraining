package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.TestDao;
import AgileTraining.Backend.daos.TestResultDao;
import AgileTraining.Backend.services.TestService;

import java.util.HashMap;
import java.util.Map;

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


    //http://localhost:8080/getAttempts?testResultId=1&userId=2
    @GetMapping("/getAttempts")
    public ResponseEntity<?> getAttempts(@RequestParam Integer testResultId, @RequestParam Integer userId) 
    {
        Integer nAttempts = trDao.getAttempts(testResultId, userId);
        return ResponseEntity.ok().body(nAttempts);
    }
    
    @PutMapping("/submitTest")
    public ResponseEntity<?> submit(@RequestBody SubmitRequest submitRequest) 
    {
        try 
        {
            Integer testResult = Integer.valueOf(submitRequest.getTestResult());
            Integer testResultId = Integer.valueOf(submitRequest.getTestResultId());

            tService.submitTest(testResult, testResultId);
            return ResponseEntity.ok().body(new BackendResponse("Test submitted successfully"));
        } 
        catch (NumberFormatException e) 
        {
            return ResponseEntity.badRequest().body(new BackendResponse("Invalid number format"));
        }
    }

    @PostMapping("/beginTest")
    public ResponseEntity<Map<String, Object>> beginTest(@RequestBody TestRequest testRequest) 
    {
        Integer testResultId = tService.newTest(testRequest.testId, testRequest.userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Test iniziato con successo");
        response.put("testResultId", testResultId);
        
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/checkAnswer")
    public ResponseEntity<Boolean> getCorrect(@RequestBody AnswerRequest answerRequest) 
    {
        Boolean result = tService.checkAnswer(answerRequest.questionId, answerRequest.optionId);
        return ResponseEntity.ok().body(result);
    }
    
    @GetMapping("/getTestId/{idCourse}")
    public ResponseEntity<?> getTestIdByCourseId(@PathVariable Integer idCourse) 
    {
        Integer IdTest = tDao.getTestIdByCourseId(idCourse);
       return ResponseEntity.ok(IdTest);
    }


    public static class AnswerRequest 
    {
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

    public static class TestRequest 
    {
        public Integer testId;
        public Integer userId;

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

    public static class SubmitRequest 
    {
        public Integer testResult;
        public Integer testResultId;

        public Integer getTestResult() {
            return testResult;
        }

        public void setTestResult(Integer testResult) {
            this.testResult = testResult;
        }

		public Integer getTestResultId() {
			return testResultId;
		}

		public void setTestResultId(Integer testResultId) {
			this.testResultId = testResultId;
		}
        
    }
}
