package AgileTraining.Backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date duration;

    private Date prevTime;



    // il suo valore di default dovrebbe essere false.
    // non sono sicura che funzioni...
    @Column(columnDefinition = "boolean default false")
    private Boolean isCompleted = false;


    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

    public Activity(Integer moduleId, Integer userId, Course courseId, java.util.Date prevTime, Boolean isCompleted) {
    }

    public Course getCourse() {
        return course;
    }

    public User getUser() {
        return user;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Activity() {
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDuration() {
        return duration;
    }

    public void setDuration(Date duration) {
        this.duration = duration;
    }

    public Date getPrevTime() {
        return prevTime;
    }

    public void setPrevTime(Date prevTime) {
        this.prevTime = prevTime;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setIsCompleted(Boolean isCompleted) {
    }
}
