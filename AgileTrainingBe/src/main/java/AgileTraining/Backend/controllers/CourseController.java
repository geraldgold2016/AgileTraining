package AgileTraining.Backend.controllers;


import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.entities.Course;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {


    @Autowired
    CourseDao cDao;

    Logger logger = LoggerFactory.getLogger("infoFile");

    @GetMapping("/allCourses") // TESTATO
    public ResponseEntity getAllCourses() {
        logger.info("Received request to get all courses");
        List<Course> courses = cDao.getAllCourses();
        if (courses.isEmpty()) {
            logger.error("No courses found");
            return ResponseEntity.status(404).body("No courses found");
        }
        return ResponseEntity.status(200).body(courses);
    }


}
