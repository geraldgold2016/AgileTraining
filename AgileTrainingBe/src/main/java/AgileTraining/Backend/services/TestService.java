
package AgileTraining.Backend.services;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.*;

import AgileTraining.Backend.entities.*;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TestService {


    @Autowired
    private QuestionDao qDao;

    @Autowired
    private OptionDao oDao;

    @Autowired
    private TestResultDao trDao;

    @Autowired
    private TestDao tDao;

    @Autowired
    private UserDao uDao;

    Logger logger = LoggerFactory.getLogger("infoFile");

//    public Test beginTest(Integer courseId) {
//            questions = qDao.getQuestionsByCourseId(courseId);
//            for (Question question : questions) {
//                Option option = question.getOption();
//                options.add(option);
//            }
//            return new Test(questions, options);
//    }

    @Transactional
    public Boolean checkAnswer(Integer questionId, Integer optionId) {
        Optional<Option> option = oDao.findById(optionId);
        if (!option.isPresent()) {
            logger.error("Invalid option ID: {}", optionId);
            return false;
        }
        Option correctOption = oDao.getCorrectOption(questionId);
        if (correctOption == null) {
            return false;
        }
        return option.get().equals(correctOption);
    }


    @Transactional
    public BackendResponse submitTest(Integer testResult, Integer testId, Integer userId) {
        Test test = tDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));

        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        TestResult testResults = new TestResult();

        testResults.setUser(user);
        testResults.setTest(test);
        testResults.setTestResult(testResult);

        if (testResults.getnAttempts() == null) {
            testResults.setnAttempts(0);
        }
        testResults.setnAttempts(testResults.getnAttempts() + 1);

        trDao.save(testResults);

        return new BackendResponse("Punteggio test salvato con successo");
    }


    @Transactional
    public ResponseEntity<?> checkAttempts(Integer userId, Integer testId) {
        TestResult testResult = trDao.getTestResultsByUserIdAndTestId(userId, testId);
        if (testResult == null) {
            logger.error("Test non trovato");
            return ResponseEntity.status(404).body(new BackendResponse("Test non trovato"));
        }
        // Initialize nAttempts to 0 if it is null
        int nAttempts = Optional.ofNullable(testResult.getnAttempts()).orElse(0);
        if (nAttempts >= 3) {
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.ok().body(false);
    }

    @Transactional
    public ResponseEntity<?> getTestResults(Integer userId, Integer testId) {
        TestResult testResult = trDao.getTestResultsByUserIdAndTestId(userId, testId);
        if (testResult == null) {
            logger.error("Test non trovato");
            return ResponseEntity.status(400).body(new BackendResponse("Test non trovato"));
        }
        if (userId != testResult.getUser().getId()) {
            return ResponseEntity.status(400).body(new BackendResponse("User non trovato"));
        }

        Integer score = testResult.getTestResult();
        return ResponseEntity.ok().body(score);
    }

    @Transactional
    public List<Question> getQuestions(Integer testId) {
        List<Question> questions = qDao.getQuestionsByTestId(testId);
        if (questions == null) {
            logger.error("Test non trovato");
            return null;
        }
        return questions;
    }
}

