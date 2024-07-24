package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BooleanResponse;
import AgileTraining.Backend.daos.CourseDao;

import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Subscription;
import AgileTraining.Backend.entities.User;
import AgileTraining.Backend.services.SubscriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SubscriptionController {


    @Autowired
    SubscriptionDao sDao;

    @Autowired
    private CourseDao cDao;

    @Autowired
    private UserDao uDao;

    @Autowired
    private SubscriptionService subscriptionService;

    Logger logger = LoggerFactory.getLogger("infoFile");

    // ottiene i corsi a cui l'utente è iscritto -- TESTATO
    @GetMapping("/{id}/subscriptions")
    public ResponseEntity getCourses(@PathVariable Integer id) {
        logger.info("Received request to get courses for user with ID: " + id);
        List<Object[]> courses = sDao.getCourses(id);

        if (courses.isEmpty()) {
            logger.error("No courses found");
            return ResponseEntity.status(400).body("No courses found");
        }
        return ResponseEntity.ok(courses);
    }

    // verifica se un utente è iscritto a uno specifico corso -- TESTATO
    @GetMapping("/{id}/{courseId}/subscription")
    public ResponseEntity<BooleanResponse> getSubscription(
            @PathVariable Integer id,
            @PathVariable Integer courseId) {
        logger.info("Received request to check if user with ID: " + id + " is subscribed to course with ID: " + courseId);
        Subscription subscription = sDao.findByUserIdAndCourseId(id, courseId);

        if (subscription != null) {
            return ResponseEntity.ok(new BooleanResponse(true, "Subscription found"));
        } else {
            return ResponseEntity.ok(new BooleanResponse(false, "Subscription not found"));
        }
    }

    // ottiene i corsi a cui l'utente non è iscritto -- TESTATO
    @GetMapping("/{id}/coursesAvailable")
    public ResponseEntity getMoreCourses(@PathVariable Integer id) {
        logger.info("Received request to get courses not subscribed by user with ID: " + id);
        List<Object[]> courses = sDao.getMoreCourses(id);
        if (courses.isEmpty()) {
            logger.error("No courses found");
            return ResponseEntity.status(400).body("No courses found");
        }
        return ResponseEntity.status(200).body(courses);
    }



    //   !!! LO FA GIA IL CERTIFICATE CONTROLLER  !!!
    // segna un certificato come emesso -- TESTATO
    // esempio http://localhost:8080/certificateIssued?userId=1&courseId=1
    @PostMapping("/certificateIssued")
    public ResponseEntity<?> certificate(@RequestParam Integer userId, @RequestParam Integer courseId) {
        logger.info("Received request to issue certificate for user with ID: " + userId + " for course with ID: " + courseId);
        Subscription s = sDao.findByUserIdAndCourseId(userId, courseId);
        if (s != null) {
            s.setCertificateIssued(true);
            sDao.save(s);
            logger.info("Certificate issued successfully");
            return ResponseEntity.status(200).body("Certificate issued successfully");
        } else {
            logger.error("Subscription not found");
            return ResponseEntity.badRequest().body("Subscription not found");
        }
    }

    // permette di iscriversi a un corso -- TESTATO
    @PostMapping("/subscribeToCourse")
    public ResponseEntity<?> subscribeToCourse(@RequestBody SubscriptionRequest subscriptionRequest) {
    logger.info("Received request to subscribe user with ID: " + subscriptionRequest.getUserId() + " to course with ID: " + subscriptionRequest.getCourseId());
        // controllo che l'utente e il corso esistano
        Optional<Course> courseOptional = cDao.findById(subscriptionRequest.getCourseId());
        Course course;
        if (courseOptional.isPresent()) {
            course = courseOptional.get();
        } else {
            logger.error("Course not found");
            return ResponseEntity.badRequest().body("Course not found");
        }
        Optional<User> u = uDao.findById(subscriptionRequest.getUserId());

        if (u.isEmpty()) {
            logger.error("User not found");
            return ResponseEntity.badRequest().body("User not found");
        }

        // Check if the user is already subscribed to the course
        Optional<Subscription> existingSubscription = sDao.optionalFindByUserIdAndCourseId(u.get().getId(), course.getId());
        if (existingSubscription.isPresent()) {
            logger.error("User is already subscribed to this course");
            return ResponseEntity.badRequest().body("User is already subscribed to this course");
        }

        Subscription subscription;

        subscription = new Subscription();
        subscription.setUser(u.orElse(null));
        subscription.setCourse(course);
        // aggiungo la data di registrazione
        subscription.setRegistrationDate(new Date(System.currentTimeMillis()));
        sDao.save(subscription);
        logger.info("User subscribed to course successfully");
        return ResponseEntity.status(200).body("Subscription updated successfully");

    }

    // verifica se l'iscrizione è attiva -- TESTATO
    @GetMapping("/{userId}/{courseId}/isSubscriptionActive")
    public ResponseEntity<?> validateSubscription(@PathVariable Integer userId, @PathVariable Integer courseId) {
        logger.info("Received request to check if subscription is valid for user with ID: " + userId + " to course with ID: " + courseId);
        Subscription s = sDao.findByUserIdAndCourseId(userId, courseId);
        boolean isValid = subscriptionService.isSubscriptionValid(s);

        if (isValid) {
            return ResponseEntity.ok(new BooleanResponse(true, "Subscription is valid."));
        } else {
            return ResponseEntity.status(400).body(new BooleanResponse(false,"Subscription is not valid."));
        }
    }


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

}




