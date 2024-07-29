
package AgileTraining.Backend.services;

import AgileTraining.Backend.daos.*;

import AgileTraining.Backend.entities.*;

import AgileTraining.Backend.entities.Module;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class TestService {


    @Autowired
    private QuestionDao qDao;

    @Autowired
    private OptionDao oDao;

    @Autowired
    private UserDao uDao;

    @Autowired
    private TestDao tDao;

    @Autowired
    private TestResultDao trDao;


//    public Test beginTest(Integer courseId) {
//            questions = qDao.getQuestionsByCourseId(courseId);
//            for (Question question : questions) {
//                Option option = question.getOption();
//                options.add(option);
//            }
//            return new Test(questions, options);
//    }

    public Boolean checkAnswer(Integer questionId, Integer optionId) {
        Optional<Option> option = oDao.findById(optionId);
        if (!option.isPresent()) {
            return false;
        }
        Option correctOption = oDao.getCorrectOption(questionId);
        if (correctOption == null) {
            return false;
        }
        return option.get().equals(correctOption);
    }

    @Transactional
    public Integer newTest(Integer userId, Integer testId) {
        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Test test = tDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));

        TestResult testResult = new TestResult();

        testResult.setUser(user);
        testResult.setTest(test);

        return trDao.save(testResult).getId();

    }


    @Transactional
    public void submitTest(Integer testResult, Integer testId) {
        TestResult completedTest = trDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));
        completedTest.setResult(testResult);
        /*
        Integer numberAttempts = completedTest.getnAttempts();
        if (numberAttempts == null)
        {
            completedTest.setnAttempts(1);
        }
        else if (numberAttempts > 0)
        {
        	completedTest.setnAttempts(numberAttempts + 1);
        }
*/
        trDao.save(completedTest);
    }


}

