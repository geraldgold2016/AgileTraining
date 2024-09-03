package AgileTraining.Backend.controllers;

import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.entities.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController 
{
    @Autowired
    CourseDao cDao;
    
    @Autowired
    SubscriptionDao sDao;

    //http://localhost:8080/allCourses
    @GetMapping("/allCourses") // TESTATO
    public ResponseEntity<Object> getAllCourses() 
    {
        List<Course> courses = cDao.getAllCourses();
        return ResponseEntity.status(200).body(courses);
    }
    
    //http://localhost:8080/{category}/Courses
    @GetMapping("/{category}/Courses") // TESTATO
    public ResponseEntity<Object> getCoursesByCategory(@PathVariable String category) 
    {
        List<Course> courses = cDao.getCoursesByCategory(category);
        return ResponseEntity.status(200).body(courses);
    }

    //http://localhost:8080/{id}/Course
    @GetMapping("/{id}/Course") // TESTATO
    public ResponseEntity<Object> getCoursesById(@PathVariable Integer id) 
    {
        Course course = cDao.getCoursesById(id);
        return ResponseEntity.status(200).body(course);
    }
    
    //http://localhost:8080/searchCourse/{name}
    @GetMapping("/searchCourse/{name}") // TESTATO
    public ResponseEntity<Object> getCoursesByName(@PathVariable String name) 
    {
    	List<Course> course = cDao.getCoursesByName(name);
        return ResponseEntity.status(200).body(course);
    }
    
    //http://localhost:8080/checkIscrizioneCorso?idCorso=1&idUtente=2
    @GetMapping("/checkIscrizioneCorso") // TESTATO
    public ResponseEntity<Object> checkIscrizioneCorso(@RequestParam Integer idCorso, @RequestParam Integer idUtente) 
    {
        List<Object[]> courses = sDao.getCourses(idUtente);
        // Estrai gli ID dei corsi dalla lista
        List<Integer> courseIds = courses.stream()
                                         .map(course -> (Integer) course[0]) //l'ID del corso è nella prima posizione dell'array
                                         .collect(Collectors.toList());

        // Verifica se l'idCorso è presente nella lista degli ID dei corsi
        boolean isIscritto = courseIds.contains(idCorso);

        // Restituisce true se l'utente è iscritto al corso, altrimenti false
        return ResponseEntity.status(200).body(isIscritto);
    }
}
