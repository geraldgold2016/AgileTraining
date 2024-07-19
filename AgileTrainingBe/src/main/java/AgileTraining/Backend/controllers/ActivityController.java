package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.ActivityDao;
import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.entities.Activity;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Module;
import AgileTraining.Backend.services.ActivityService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
public class ActivityController {

    @Autowired
    private ActivityDao aDao;

    @Autowired
    private ModuleDao mDao;

    @Autowired
    private CourseDao cDao;

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

    // update activity as completed  -- TESTATO
    @PutMapping("/{activityId}/complete")
    public Activity markActivityAsCompleted(@PathVariable Integer activityId) {
        return activityService.markActivityAsCompleted(activityId);
    }


    // Get all activities completed by a user   -- TESTATO
    @GetMapping("/{userId}/completed-activities")
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


    // endpoint per aggiornare tempo -- TESTATO
    // esempio: http://localhost:8080/updateActivity?activityId=10&prevTime=20:00:01
    @PutMapping("/updateActivity")
    public ResponseEntity<?> updateActivity(@RequestParam Integer activityId,@RequestParam Time prevTime) {
        try {
            Activity updatedActivity = activityService.updateActivity(activityId, prevTime);
            return ResponseEntity.status(200).body(updatedActivity);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Errore interno del server");
        }
    }

    public static class NewActivityRequest {
        private Integer moduleId;
        private Integer userId;
        private Integer courseId;

        public Integer getCourseId() {
            return courseId;
        }

        public void setCourseId(Integer courseId) {
            this.courseId = courseId;
        }

        public Integer getModuleId() {
            return moduleId;
        }

        public void setModuleId(Integer moduleId) {
            this.moduleId = moduleId;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }
    }

    // Create a new activity for a user -- TESTATO
    // esempio di richiesta:
    // http://localhost:8080/newActivity?moduleId=1&userId=34&courseId=2
    @PostMapping("/newActivity")
    public ResponseEntity<?> addActivity( @RequestBody NewActivityRequest newActivityRequest) {

        // Check if the module exists
        Optional<Module> moduleOptional = mDao.findById(newActivityRequest.getModuleId());
        if (!moduleOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BackendResponse("Module not found"));
        }

        // Check if the course exists
        Optional<Course> courseOptional = cDao.findById(newActivityRequest.getCourseId());
        if (!courseOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BackendResponse("Course not found"));
        }
        try {
            Integer moduleId = newActivityRequest.getModuleId();
            Integer userId = newActivityRequest.getUserId();
            Integer courseId = newActivityRequest.getCourseId();

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
