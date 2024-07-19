package AgileTraining.Backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "test_results")
public class TestResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    private Integer testResult;

    private Integer nAttempts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getnAttempts() {
        return nAttempts;
    }

    public void setnAttempts(Integer nAttempts) {
        this.nAttempts = nAttempts;
    }

    public Integer getTestResult() {
        return testResult;
    }

    public void setTestResult(Integer testResult) {
        this.testResult = testResult;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}