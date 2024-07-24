package AgileTraining.Backend.services;

import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.entities.Subscription;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;


@Service
public class SubscriptionService {

    Logger logger = LoggerFactory.getLogger("infoFile");

    @Autowired
    private SubscriptionDao sDao;

        @Transactional
        public boolean isSubscriptionValid(Subscription subscription) {

        if (subscription == null) {
            logger.error("Subscription is null");
            return false;
        }
        LocalDate registrationDate = subscription.getRegistrationDate().toLocalDate();
        LocalDate currentDate = LocalDate.now();
        long yearsBetween = ChronoUnit.YEARS.between(registrationDate, currentDate);

        if (yearsBetween > 1) {
            subscription.setSubValid(false);
            sDao.save(subscription);
            return false;
        }

        return true;
    }
}

