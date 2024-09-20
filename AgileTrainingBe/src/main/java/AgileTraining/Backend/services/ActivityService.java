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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
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


    @Transactional
    public Activity addActivity(Integer moduleId, Integer userId, Integer courseId) {
        Module module = mDao.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid module ID: " + moduleId));
        User user = uDao.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Course course = cDao.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid course ID: " + courseId));

        Activity activity = new Activity();
        activity.setUser(user);
        activity.setCourse(course);

        return aDao.save(activity);
    }


    @Transactional
    public Activity markActivityAsCompleted(Integer activityId) {
        Activity activity = aDao.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid activity ID: " + activityId));

        return aDao.save(activity);
    }


    @Transactional
    public Activity updateActivity(Integer activityId, LocalTime prevTime){
        Activity activity = aDao.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity non trovata: " + activityId));
        activity.setCurrentElapsedTime(prevTime);
        return aDao.save(activity);
    }
}
