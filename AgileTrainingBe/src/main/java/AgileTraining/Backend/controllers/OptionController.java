package AgileTraining.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import AgileTraining.Backend.daos.OptionDao;
import AgileTraining.Backend.entities.Option;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OptionController 
{
    @Autowired
    private OptionDao ODao;
    
    @GetMapping("{questionId}/getOptions")
    public ResponseEntity<Object> getOptionsByIdQuestion(@PathVariable Integer questionId) 
    {
        List<Option> risposte = ODao.getOptionsByIdQuestion(questionId);
        return ResponseEntity.ok().body(risposte);
    }
    
}
