package AgileTraining.Backend.services;

import AgileTraining.Backend.daos.ActivityDao;
import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Activity;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.Module;
import AgileTraining.Backend.entities.User;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityDao aDao;

    @Autowired
    private ModuleDao mDao;

    @Autowired
    private UserDao uDao;

    @Autowired
    private CourseDao cDao;

    Logger logger = LoggerFactory.getLogger("infoFile");

    public List<Activity> getCompletedActivitiesByUserId(Integer userId) {
        return aDao.findCompletedActivitiesByUserId(userId);
    }

    @Transactional
    public Activity addActivity(Integer moduleId, Integer userId, Integer courseId) {
        logger.info("Starting to add an activity with Module ID: {}, User ID: {}, Course ID: {}", moduleId, userId, courseId);

        Module module = mDao.findById(moduleId)
                .orElseThrow(() -> {
                    logger.error("Invalid module ID: {}", moduleId);
                    throw new IllegalArgumentException("Invalid module ID: " + moduleId);
                });
        User user = uDao.findById(userId)
                .orElseThrow(() -> {
                    logger.error("Invalid user ID: {}", userId);
                    throw new IllegalArgumentException("Invalid user ID: " + userId);
                });
        Course course = cDao.findById(courseId)
                .orElseThrow(() -> {
                    logger.error("Invalid course ID: {}", courseId);
                    throw new IllegalArgumentException("Invalid course ID: " + courseId);
                });

        Activity activity = new Activity();
        activity.setModule(module);
        activity.setUser(user);
        activity.setCourse(course);

        Activity savedActivity = aDao.save(activity);
        logger.info("Successfully added activity with ID: {}", savedActivity.getId());

        return savedActivity;
    }

    @Transactional
    public Activity markActivityAsCompleted(Integer activityId) {
        Activity activity = aDao.findById(activityId)
                .orElseThrow(() -> {
                    String errorMessage = "Activity non trovata: " + activityId;
                    logger.error(errorMessage);
                    throw new IllegalArgumentException(errorMessage);
                });
        activity.setIsCompleted(true);
        logger.info("Activity segnata come completata {}", activityId);
        return aDao.save(activity);
    }

    @Transactional
    public Activity updateActivity(Integer activityId, Time prevTime) {
        Activity activity = aDao.findById(activityId)
                .orElseThrow(() -> {
                    String errorMessage = "Activity non trovata: " + activityId;
                    logger.error(errorMessage);
                    throw new IllegalArgumentException(errorMessage);
                });
        activity.setPrevTime(prevTime);
        logger.info("Activity aggiornata con successo: {}", activityId);
        return aDao.save(activity);
    }
}
