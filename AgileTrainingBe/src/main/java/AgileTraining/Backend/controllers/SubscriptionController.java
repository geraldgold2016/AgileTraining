package AgileTraining.Backend.controllers;



import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Subscription;
import AgileTraining.Backend.entities.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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


    // endpoint per ottenere i corsi a cui l'utente è iscritto -- TESTATO
    @GetMapping("/{id}/subscriptions")
    public ResponseEntity getCourses(@PathVariable Integer id) {
        List<Object[]> courses = sDao.getCourses(id);
        return ResponseEntity.status(200).body(courses);
    }

    // endpoint per ottenere i corsi a cui l'utente non è iscritto -- TESTATO
    @GetMapping("/{id}/coursesAvailable")
    public ResponseEntity getMoreCourses(@PathVariable Integer id) {
        List<Object[]> courses = sDao.getMoreCourses(id);
        return ResponseEntity.status(200).body(courses);
    }


    //end point to mark a certificate as issued -- TESTATO
    // esempio http://localhost:8080/certificateIssued?userId=1&courseId=1
    @PostMapping("/certificateIssued")
    public ResponseEntity<?> certificate(@RequestParam Integer userId, @RequestParam Integer courseId) {
        Optional<Subscription> subscription = sDao.findByUserIdAndCourseId(userId, courseId);
        if (subscription.isPresent()) {
            Subscription s = subscription.get();
            s.setCertificateIssued(true);
            sDao.save(s);
            return ResponseEntity.status(200).body("Certificate issued successfully");
        } else {
            return ResponseEntity.badRequest().body("Subscription not found");
        }
    }


    // endpoint per iscriversi a un corso -- TESTATO
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

    @DeleteMapping("/unsubscribeFromCourse")
    public ResponseEntity<?> unsubscribeFromCourse(@RequestBody SubscriptionRequest subscriptionRequest) {
        // Controllo che l'utente e il corso esistano
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

        // Controllo se l'utente è iscritto al corso
        Optional<Subscription> existingSubscription = sDao.findByUserIdAndCourseId(user.getId(), course.getId());
        if (existingSubscription.isPresent()) {
            // Se l'iscrizione esiste, la rimuovo
            sDao.delete(existingSubscription.get());
            return ResponseEntity.status(200).body("Subscription deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Subscription not found");
        }
    }



    @PostMapping("/newTest")
    public ResponseEntity<?> newTest (@RequestBody NewTestRequest newTestRequest){
        return null;
    }

    public static class NewTestRequest{
        private Integer userId;
        private Course courseId;

        public Course getCourseId() {
            return courseId;
        }

        public void setCourseId(Course courseId) {
            this.courseId = courseId;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }
    }






}



