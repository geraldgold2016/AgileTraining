package AgileTraining.Backend.controllers;

import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.entities.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController 
{
    @Autowired
    CourseDao cDao;

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
}
