package AgileTraining.Backend.entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date registration_date;
    private Boolean is_sub_valid;
    private Boolean is_certificate_issued;

    public Subscription() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
        this.registration_date = registration_date;
    }

    public Boolean getIs_sub_valid() {
        return is_sub_valid;
    }

    public void setIs_sub_valid(Boolean is_sub_valid) {
        this.is_sub_valid = is_sub_valid;
    }

    public Boolean getIs_certificate_issued() {
        return is_certificate_issued;
    }

    public void setIs_certificate_issued(Boolean is_certificate_issued) {
        this.is_certificate_issued = is_certificate_issued;
    }
}
