package AgileTraining.Backend.daos;

import AgileTraining.Backend.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionDao extends JpaRepository<Subscription, Integer> {
}
