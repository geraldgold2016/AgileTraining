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

    public Subscription() {
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

    public Boolean getSubValid() {
        return isSubValid;
    }

    public void setSubValid(Boolean subValid) {
        isSubValid = subValid;
    }

    public Boolean getCertificateIssued() {
        return isCertificateIssued;
    }

    public void setCertificateIssued(Boolean certificateIssued) {
        isCertificateIssued = certificateIssued;
    }
}
