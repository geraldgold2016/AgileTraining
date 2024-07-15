package AgileTraining.Backend.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "modules")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String module_name;
    private String module_description;
    private String module_video;
    private Boolean is_completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;




    public Module() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModule_name() {
        return module_name;
    }

    public void setModule_name(String module_name) {
        this.module_name = module_name;
    }

    public String getModule_description() {
        return module_description;
    }

    public void setModule_description(String module_description) {
        this.module_description = module_description;
    }

    public String getModule_video() {
        return module_video;
    }

    public void setModule_video(String module_video) {
        this.module_video = module_video;
    }

    public Boolean getIs_completed() {
        return is_completed;
    }

    public void setIs_completed(Boolean is_completed) {
        this.is_completed = is_completed;
    }
}
