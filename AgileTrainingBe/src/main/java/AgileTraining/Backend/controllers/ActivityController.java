package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.ActivityDao;
import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.entities.Activity;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Module;
import AgileTraining.Backend.services.ActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

    @Autowired
    private ModuleDao mDao;

    @Autowired
    private CourseDao cDao;

    @Autowired
    private ActivityService activityService;

    Logger logger = LoggerFactory.getLogger("infoFile");

    // update activity as completed  -- TESTATO
    @PutMapping("/{activityId}/complete")
    public Activity markActivityAsCompleted(@PathVariable Integer activityId) {
        logger.info("ricevuta chiamata per completare attività con id: " + activityId);
        return activityService.markActivityAsCompleted(activityId);
    }

    // Get all activities completed by a user   -- TESTATO
    @GetMapping("/{userId}/completed-activities")
    public ResponseEntity<?> getCompletedActivities(@PathVariable Integer userId) {
        logger.info("ricevuta chiamata per ottenere attività completate per l'utente con id: " + userId);
        try {
            List<Activity> activities = activityService.getCompletedActivitiesByUserId(userId);
            if (activities.isEmpty()) {
                logger.error("nessuna attività completata trovata per l'utente " + userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No completed activities found for user " + userId);
            }
            logger.info("attività completate trovate per l'utente " + userId);
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            logger.error("Errore nel recupero delle attività completate");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching completed activities");
        }
    }


    // endpoint per aggiornare tempo -- TESTATO
    // esempio: http://localhost:8080/updateActivity?activityId=10&prevTime=20:00:01
    @PutMapping("/updateActivity")
    public ResponseEntity<?> updateActivity(@RequestParam Integer activityId,@RequestParam Time prevTime) {
        logger.info("ricevuta chiamata per aggiornare attività con id: " + activityId);
        try {
            activityService.updateActivity(activityId, prevTime);
            logger.info("attività aggiornata con successo");
            return ResponseEntity.status(200).body(new BackendResponse("Activity updated successfully"));
        } catch (IllegalArgumentException e) {
            logger.error("Errore nell'aggiornamento dell'attività");
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Errore interno del server");
        }
    }


    // Create a new activity for a user -- TESTATO
    // esempio di richiesta:
    // http://localhost:8080/newActivity?moduleId=1&userId=34&courseId=2
    @PostMapping("/newActivity")
    public ResponseEntity<?> addActivity( @RequestBody NewActivityRequest newActivityRequest) {

        logger.info("ricevuta chiamata per creare nuova attività");

        // Check if the module exists
        Optional<Module> moduleOptional = mDao.findById(newActivityRequest.getModuleId());
        if (!moduleOptional.isPresent()) {
            logger.error("Modulo non trovato");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BackendResponse("Module not found"));
        }

        // Check if the course exists
        Optional<Course> courseOptional = cDao.findById(newActivityRequest.getCourseId());
        if (!courseOptional.isPresent()) {
            logger.error("Corso non trovato");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BackendResponse("Course not found"));
        }
        try {
            Integer moduleId = newActivityRequest.getModuleId();
            Integer userId = newActivityRequest.getUserId();
            Integer courseId = newActivityRequest.getCourseId();

            Activity activity = activityService.addActivity(moduleId, userId, courseId);
            if (activity.getUser() == null) {
                logger.error("Errore nel settaggio dell'utente per l'attività");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be set for activity");
            }
            logger.info("Attività creata con successo");
            return ResponseEntity.ok(new BackendResponse("Activity created successfully"));
        } catch (Exception e) {
            logger.error("Errore nella creazione dell'attività");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating activity: " + e.getMessage());
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

}
