
package AgileTraining.Backend.services;

import AgileTraining.Backend.daos.OptionDao;
import AgileTraining.Backend.daos.QuestionDao;

import AgileTraining.Backend.entities.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class TestService {


    @Autowired
    private QuestionDao qDao;

    @Autowired
    private OptionDao oDao;



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

}

