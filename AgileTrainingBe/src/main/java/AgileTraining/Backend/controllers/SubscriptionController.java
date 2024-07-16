package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.CourseDao;

import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Subscription;
import AgileTraining.Backend.entities.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class SubscriptionController {


    @Autowired
    SubscriptionDao sDao;

    @Autowired
    private CourseDao cDao;

    @Autowired
    private UserDao uDao;

    public static class SubscriptionRequest {
        private Integer userId;
        private Integer courseId;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getCourseId() {
            return courseId;
        }

        public void setCourseId(Integer courseId) {
            this.courseId = courseId;
        }
    }

    
    @GetMapping("/subscriptions")
    public BackendResponse getCourses(@RequestBody User user) {
        List<Object[]> courses = sDao.getCourses(user.getUsername());
        return new BackendResponse(courses);
    }



    @PostMapping("/subscribeToCourse")
    public ResponseEntity<?> subscribeToCourse(@RequestBody SubscriptionRequest subscriptionRequest) {
        Optional<Course> courseOptional = cDao.findById(subscriptionRequest.getCourseId());
        Course course;
        if (courseOptional.isPresent()) {
            course = courseOptional.get();
        } else {
            return ResponseEntity.badRequest().body("Course not found");
        }
        Optional<User> userOptional = uDao.findById(subscriptionRequest.getUserId());
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }

        // TODO Aggiungere controllo per evitare che un utente si iscriva due volte allo stesso corso
        // Optional<Subscription> existingSubscription = sDao.findByUserIdAndCourseId(subscriptionRequest.getUserId(), subscriptionRequest.getCourseId());
        Subscription subscription;

            subscription = new Subscription();
            subscription.setUser(user);
            subscription.setCourse(course);
            subscription.setRegistration_date(new Date(System.currentTimeMillis()));
            sDao.save(subscription);
            return ResponseEntity.ok("Subscription updated successfully");

    }
}

//    @GetMapping("/isSubscriptionValid")
//    public BackendResponse isSubscriptionValid(@RequestBody User user) {
//        Boolean isSubscriptionValid = sDao.isSubscriptionValid(user.getId());
//        return new BackendResponse(isSubscriptionValid);
//    }

