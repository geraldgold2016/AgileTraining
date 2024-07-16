package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.CourseDao;

import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Subscription;
import AgileTraining.Backend.entities.User;
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

    public static class UserIdRequest {

        private Integer userId;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

    }

    // endpoint per ottenere i corsi a cui l'utente è iscritto
    @GetMapping("/subscriptions")
    public ResponseEntity getCourses(@RequestBody UserIdRequest userIdRequest) {
        List<Object[]> courses = sDao.getCourses(userIdRequest.getUserId());
        return ResponseEntity.status(200).body(courses);
    }

    // endpoint per ottenere i corsi a cui l'utente non è iscritto
    @GetMapping("/coursesAvailable")
    public ResponseEntity getMoreCourses(@RequestBody UserIdRequest userIdRequest) {
        List<Object[]> courses = sDao.getMoreCourses(userIdRequest.getUserId());
        return ResponseEntity.status(200).body(courses);
    }


    // endpoint per iscriversi a un corso
    @PostMapping("/subscribeToCourse")
    public ResponseEntity<?> subscribeToCourse(@RequestBody SubscriptionRequest subscriptionRequest) {

        // controllo che l'utente e il corso esistano
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


        // Check if the user is already subscribed to the course
        Optional<Subscription> existingSubscription = sDao.findByUserIdAndCourseId(user.getId(), course.getId());
        if (existingSubscription.isPresent()) {
            return ResponseEntity.badRequest().body("User is already subscribed to this course");
        }

        Subscription subscription;

            subscription = new Subscription();
            subscription.setUser(user);
            subscription.setCourse(course);
            // aggiungo la data di registrazione
            subscription.setRegistrationDate(new Date(System.currentTimeMillis()));
            sDao.save(subscription);
            return ResponseEntity.status(200).body("Subscription updated successfully");

    }
}

/*
    @GetMapping("/isSubscriptionValid")
    public BackendResponse isSubscriptionValid(@RequestBody User user) {
        Boolean isSubscriptionValid = sDao.isSubscriptionValid(user.getId());
        return new BackendResponse(isSubscriptionValid);
    }
*/

