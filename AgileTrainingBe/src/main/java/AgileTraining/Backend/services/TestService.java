
package AgileTraining.Backend.services;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.*;
import AgileTraining.Backend.entities.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class TestService 
{
    @Autowired
    private OptionDao oDao;

    @Autowired
    private UserDao uDao;

    @Autowired
    private TestDao tDao;

    @Autowired
    private TestResultDao trDao;

    public Boolean checkAnswer(Integer questionId, Integer optionId) 
    {
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
    public Integer newTest(Integer testId, Integer userId) 
    {
        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Test test = tDao.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test ID: " + testId));

        TestResult testResult = new TestResult();

        testResult.setUser(user);
        testResult.setTest(test);
        testResult.setResult(0);

        Integer numberAttempts = trDao.getAttempts(testId, userId);
        
        if (numberAttempts == null) 
        {
            testResult.setnAttempts(1);
        }
        else
        {
        	testResult.setnAttempts(numberAttempts + 1);        	
        }

        return trDao.save(testResult).getId();

    }

    @Transactional
    public BackendResponse submitTest(Integer testResult, Integer testResultId) 
    {
        // Trova il TestResult esistente tramite il suo ID
        TestResult testResults = trDao.findById(testResultId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid test result ID: " + testResultId));
        
        // Aggiorna i campi dell'oggetto esistente
        testResults.setResult(testResult);

        // Salva l'oggetto aggiornato nel database
        trDao.save(testResults);

        return new BackendResponse("Punteggio test salvato con successo");
    }

}

