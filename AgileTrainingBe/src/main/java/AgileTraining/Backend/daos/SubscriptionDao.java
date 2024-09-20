package AgileTraining.Backend.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import AgileTraining.Backend.entities.Subscription;


public interface SubscriptionDao extends JpaRepository<Subscription, Integer> {

    @Query(value=
            "SELECT courses.id, courses.category, courses.course_description, courses.course_image_url, courses.course_name " +
            "FROM users " +
            "JOIN subscriptions ON subscriptions.user_id = users.id " +
            "JOIN courses ON subscriptions.course_id = courses.id " +
            "WHERE users.id = :id", nativeQuery = true)
    List<Object[]> getCourses(@Param("id") Integer userId);

    @Query(value=
    		"SELECT courses.id, courses.category, courses.course_description, courses.course_image_url, courses.course_name " +
    		"FROM courses " +
    		"LEFT JOIN subscriptions ON subscriptions.course_id = courses.id " +
    		"AND subscriptions.user_id = :id " +
    		"WHERE subscriptions.user_id IS NULL", nativeQuery = true)
    List<Object[]> getMoreCourses(@Param("id") Integer userId);


    @Query("SELECT s FROM Subscription s WHERE s.user.id = :userId AND s.course.id = :courseId")
    Optional<Subscription> findByUserIdAndCourseId(Integer userId, Integer courseId);

}
