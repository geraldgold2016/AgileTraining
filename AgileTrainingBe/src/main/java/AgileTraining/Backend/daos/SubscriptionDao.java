package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SubscriptionDao extends JpaRepository<Subscription, Integer> {

    @Query(value="SELECT courses.course_name FROM users " +
            "JOIN subscriptions ON subscriptions.user_id = users.id " +
            "JOIN courses ON subscriptions.course_id = courses.id " +
            "WHERE users.username = :username", nativeQuery = true)
    List<Object[]> getCourses(@Param("username") String username);

    @Query(value="SELECT CASE WHEN CURRENT_DATE - registration_date <= 90 THEN TRUE ELSE FALSE END AS is_subscription_valid " +
            "FROM subscriptions " +
            "WHERE user_id = :id) ", nativeQuery = true)
    Boolean isSubscriptionValid(@Param("id") Integer userId);





//    @Query(value="SELECT CASE WHEN CURRENT_DATE - registration_date <= 90 THEN TRUE ELSE FALSE END AS is_subscription_valid " +
//            "FROM subscriptions " +
//            "WHERE user_id = :id) ", nativeQuery = true)
//    Boolean isSubscriptionValid(@Param("id") Integer userId, Integer courseId);
}
