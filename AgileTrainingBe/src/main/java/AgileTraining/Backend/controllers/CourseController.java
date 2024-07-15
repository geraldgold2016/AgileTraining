package AgileTraining.Backend.controllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CourseController {

    @GetMapping("/courses")
    public String getCourses() {
        return "Courses";
    }


}
