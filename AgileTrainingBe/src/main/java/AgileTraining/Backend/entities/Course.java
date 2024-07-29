package AgileTraining.Backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String courseName;
    
    @Column(length = 2000)
    private String courseDescription;
    private String category;
    private String courseImageUrl;
    private Integer duration;

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getCourseImageUrl() {
        return courseImageUrl;
    }

    public void setCourseImageUrl(String courseImageUrl) {
        this.courseImageUrl = courseImageUrl;
    }

    public Course() {
    }

    public Course(Integer courseId) {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
