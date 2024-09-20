package AgileTraining.Backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.math.BigDecimal;
import java.sql.Time;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal  currentPercentage; 

    private LocalTime currentElapsedTime;
    
    private Integer totalModules;
    
    private Integer totalModulesCompleted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

    public Activity(Integer moduleId, Integer userId, Course courseId, Time elapsedTime) 
    {}

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }


    public Activity() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

	public BigDecimal getCurrentPercentage() {
		return currentPercentage;
	}

	public void setCurrentPercentage(BigDecimal currentPercentage) {
		this.currentPercentage = currentPercentage;
	}

	public LocalTime getCurrentElapsedTime() { 
		return currentElapsedTime;
	}

	public void setCurrentElapsedTime(LocalTime currentElapsedTime) {
		this.currentElapsedTime = currentElapsedTime;
	}

	public User getUser() {
        return user;
    }
	
	public void setUser(User user) {
        this.user = user;
    }

	public Integer getTotalModules() {
		return totalModules;
	}

	public void setTotalModules(Integer totalModules) {
		this.totalModules = totalModules;
	}

	public Integer getTotalModulesCompleted() {
		return totalModulesCompleted;
	}

	public void setTotalModulesCompleted(Integer totalModulesCompleted) {
		this.totalModulesCompleted = totalModulesCompleted;
	}
    
}
