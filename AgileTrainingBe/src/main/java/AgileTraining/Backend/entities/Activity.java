package AgileTraining.Backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date duration;

    private Time prevTime;



    // il suo valore di default dovrebbe essere false.
    // non sono sicura che funzioni...
    @Column(columnDefinition = "boolean default false")
    private Boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

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

    public Time getPrevTime() {
        return prevTime;
    }

    public void setPrevTime(Time prevTime) {
        this.prevTime = prevTime;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
