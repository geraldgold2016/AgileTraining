package AgileTraining.Backend.services;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.*;

import AgileTraining.Backend.entities.*;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TestService {


    Logger logger = LoggerFactory.getLogger("infoFile");
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

        Integer score = testResult.getResult();
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

    @Transactional
    public List<Option> getOptions(List<Question> questions) {
        List<Option> allOptions = new ArrayList<>();

        logger.info("Inizio recupero opzioni per le domande");

        for (Question question : questions) {
            List<Option> options = oDao.getOptionsByQuestionId(question.getId());
            if (options.isEmpty()) {
                logger.error("Opzioni non trovate per la domanda con ID: " + question.getId());
            } else {
                allOptions.addAll(options);
            }
        }

        if (allOptions.isEmpty()) {
            logger.error("Nessuna opzione trovata.");
            return null;
        }

        logger.info("Opzioni trovate");
        return allOptions;
    }


    @Transactional
    public List<Option> getOptionsOneQuestion(Integer questionId) {

        List<Option> options = oDao.getOptionsOneQuestion(questionId);

        if (options.isEmpty()) {
            logger.error("Opzioni non trovate");
            return null;
        }
        return options;
    }


    @Transactional
    public BackendResponse submitTest(Integer testResult, Integer testId, Integer userId) {
        Test test = tDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));

        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        TestResult testResults = trDao.getTestResultsByUserIdAndTestId(userId, testId);

        if (testResults == null) {
            throw new IllegalArgumentException("Test results not found for user ID: " + userId + " and test ID: " + testId);
        }

        testResults.setResult(testResult);
        trDao.save(testResults);

        return new BackendResponse("Punteggio test salvato con successo");
    }

    @Transactional
    public BackendResponse beginTest(Integer testId, Integer userId) {
        Test test = tDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));

        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        TestResult testResults = new TestResult();
        testResults.setUser(user);
        testResults.setTest(test);

        if (testResults.getnAttempts() == null) {
            testResults.setnAttempts(0);
        }
        testResults.setnAttempts(testResults.getnAttempts() + 1);
        trDao.save(testResults);

        return new BackendResponse("Test iniziato con successo");
    }
}
