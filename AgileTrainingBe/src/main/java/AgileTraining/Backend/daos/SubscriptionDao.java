package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface SubscriptionDao extends JpaRepository<Subscription, Integer> {

    @Query(value=
            "SELECT courses.course_name FROM users " +
            "JOIN subscriptions ON subscriptions.user_id = users.id " +
            "JOIN courses ON subscriptions.course_id = courses.id " +
            "WHERE users.id = :id", nativeQuery = true)
    List<Object[]> getCourses(@Param("id") Integer userId);

    @Query(value=
            "SELECT DISTINCT courses.course_name FROM courses " +
            "JOIN subscriptions ON subscriptions.course_id = courses.id " +
            "JOIN users ON subscriptions.user_id = users.id " +
            "WHERE courses.id NOT IN (SELECT courses.id " +
            "FROM courses " +
            "JOIN subscriptions ON subscriptions.course_id = courses.id " +
            "JOIN users ON subscriptions.user_id = users.id " +
            "WHERE users.id = :id);", nativeQuery = true)
    List<Object[]> getMoreCourses(@Param("id") Integer userId);




    @Query(value= "SELECT * FROM Subscriptions s WHERE s.course_id = :courseId AND s.user_id = :userId", nativeQuery = true)
    Subscription findByUserIdAndCourseId(Integer userId, Integer courseId);


    @Query(value= "SELECT * FROM Subscriptions s WHERE s.course_id = :courseId AND s.user_id = :userId", nativeQuery = true)
    Optional<Subscription> optionalFindByUserIdAndCourseId(Integer userId, Integer courseId);


/*
    SELECT DISTINCT courses.course_name FROM courses
    JOIN subscriptions ON subscriptions.course_id = courses.id
    JOIN users ON subscriptions.user_id = users.id
    WHERE courses.id NOT IN (
            SELECT courses.id
            FROM courses
            JOIN subscriptions ON subscriptions.course_id = courses.id
            JOIN users ON subscriptions.user_id = users.id
            WHERE users.username = 'ciccio'
    );
*/


}
