package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class SubscriptionController {


    @Autowired
    SubscriptionDao sDao;

    @GetMapping("/subscriptions")
    public BackendResponse getCourses(@RequestBody User user) {
        List<Object[]> courses = sDao.getCourses(user.getUsername());
        return new BackendResponse(courses);
    }


//    @GetMapping("/isSubscriptionValid")
//    public BackendResponse isSubscriptionValid(@RequestBody User user, Course course) {
//        Boolean isSubscriptionValid = sDao.isSubscriptionValid(user.getId(), course.getId());
//        return new BackendResponse(isSubscriptionValid);
//    }
//}

//    @GetMapping("/isSubscriptionValid")
//    public BackendResponse isSubscriptionValid(@RequestBody User user) {
//        Boolean isSubscriptionValid = sDao.isSubscriptionValid(user.getId());
//        return new BackendResponse(isSubscriptionValid);
//    }
}
