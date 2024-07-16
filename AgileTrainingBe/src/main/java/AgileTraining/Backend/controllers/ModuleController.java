package AgileTraining.Backend.controllers;


import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ModuleController {

    @Autowired
    ModuleDao mDao;

    public static class request {
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


//    @GetMapping("/allModules")
//    public BackendResponse getAllModules(@RequestBody Course course) {
//        List<Module> modules = mDao.getAllModules(course.getId());
//        return new BackendResponse(modules);
//    }


    @GetMapping("/completedModules")
    public BackendResponse getCompletedModules(@RequestBody Course course, User user) {
        List<Module> modules = mDao.getCompletedModules();
        return new BackendResponse(modules);
    }
}
