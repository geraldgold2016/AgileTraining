package AgileTraining.Backend.controllers;


import AgileTraining.Backend.daos.ActivityDao;
import AgileTraining.Backend.entities.Activity;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


// TODO aggiunger logger

@RestController
@CrossOrigin
public class ActivityController {

    @Autowired
    private ActivityDao aDao;

    @Autowired
    private ActivityService activityService;

/*
    @PostMapping("/newActivity")
    public ResponseEntity<?> createActivity(
            @RequestParam Integer moduleId,
            @RequestParam Integer userId,
            @RequestParam Course courseId,
            @RequestParam Date prevTime,
            @RequestParam Boolean isCompleted) {
        return ResponseEntity.ok().body(aDao.save(new Activity(moduleId, userId, courseId, prevTime, isCompleted)));
    }
*/

    // update activity as completed
    @PutMapping("/{activityId}/complete")
        public Activity markActivityAsCompleted(@PathVariable Integer activityId) {
            return activityService.markActivityAsCompleted(activityId);
        }

    // non so quanto sia utile
    @GetMapping
    public List<Activity> getAllActivities() {
        return aDao.findAll();
    }



    // Get all activities completed by a user
    @GetMapping("/users/{userId}/completed-activities")
    public ResponseEntity<?> getCompletedActivities(@PathVariable Integer userId) {
        try {
            List<Activity> activities = activityService.getCompletedActivitiesByUserId(userId);
            if (activities.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No completed activities found for user " + userId);
            }
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching completed activities");
        }
    }



    // Create a new activity for a user
    // esempio di richiesta:
    // http://localhost:8080/newActivity?moduleId=1&userId=34&courseId=2
    @PostMapping("/newActivity")
    public ResponseEntity<?> addActivity(


/*          @RequestParam Date duration,
            @RequestParam Date prevTime,
            @RequestParam Boolean isCompleted, */

            @RequestParam Integer moduleId,
            @RequestParam Integer userId,
            @RequestParam Integer courseId) {

        // TODO AGGIUNGERE TRY AND CATCH SU MODULE E COURSE
        try {
            Activity activity = activityService.addActivity(moduleId, userId, courseId);
            if (activity.getUser() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be set for activity");
            }
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating activity: " + e.getMessage());
        }
    }
}

