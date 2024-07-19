package AgileTraining.Backend.controllers;



import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.entities.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class CourseController {


    @Autowired
    CourseDao cDao;

    @GetMapping("/allCourses") // TESTATO
    public ResponseEntity getAllCourses() {
        List<Course> courses = cDao.getAllCourses();
        return ResponseEntity.status(200).body(courses);
    }


}
