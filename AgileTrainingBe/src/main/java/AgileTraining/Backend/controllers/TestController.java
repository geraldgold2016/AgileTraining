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


    @GetMapping("/checkAnswer") // TESTATO
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
