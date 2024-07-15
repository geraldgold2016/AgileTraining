package AgileTraining.Backend.entities;

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
    private Date prev_time;


    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    public Activity() {
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

    public Date getPrev_time() {
        return prev_time;
    }

    public void setPrev_time(Date prev_time) {
        this.prev_time = prev_time;
    }
}
