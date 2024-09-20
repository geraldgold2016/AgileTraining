package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Activity;

import java.math.BigDecimal;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ActivityDao extends JpaRepository<Activity, Integer> 
{
    @Query(value = "SELECT * FROM activities WHERE activities.user_id = :userId AND activities.course_id = :courseId", nativeQuery = true)
    Activity findActivityByUserAndCourse(@Param("userId") Integer userId, @Param("courseId") Integer courseId);
 
    @Transactional
    @Modifying
    @Query(value = "UPDATE activities SET current_elapsed_time = '00:00:00', current_percentage = 0.00, total_modules_completed = total_modules_completed + 1  WHERE course_id = :courseId AND user_id = :userId", nativeQuery = true)
    void updateActivityFineVideo(@Param("userId") Integer userId, @Param("courseId") Integer courseId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE activities SET current_elapsed_time = :currentElapsedTime, current_percentage = :currentPercentage  WHERE course_id = :courseId AND user_id = :userId", nativeQuery = true)
    void updateActivityVisioneVideo(@Param("userId") Integer userId, @Param("courseId") Integer courseId, @Param("currentElapsedTime") LocalTime currentElapsedTime, @Param("currentPercentage") BigDecimal currentPercentage);

}
