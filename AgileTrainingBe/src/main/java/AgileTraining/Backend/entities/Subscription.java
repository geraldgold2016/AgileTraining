package AgileTraining.Backend.entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date registrationDate;
    private Boolean isSubValid;
    private Boolean isCertificateIssued;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    public Subscription() {
    }

    public Boolean getSubValid() {
        return isSubValid;
    }

    public void setSubValid(Boolean subValid) {
        isSubValid = subValid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public User getUser() {
        return user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setUser(User user) {
        this.user = user;
    }

/*
    public Boolean getSubValid() {
        return isSubValid;
    }

    public void setSubValid(Boolean subValid) {
        isSubValid = subValid;
    }
*/

    public Boolean getCertificateIssued() {
        return isCertificateIssued;
    }

    public void setCertificateIssued(Boolean certificateIssued) {
        isCertificateIssued = certificateIssued;
    }

}
