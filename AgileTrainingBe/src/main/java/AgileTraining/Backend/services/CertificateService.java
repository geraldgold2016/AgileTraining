package AgileTraining.Backend.services;

import AgileTraining.Backend.daos.CertificateDao;
import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.SubscriptionDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.*;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;



import java.util.UUID;

    @Service
    public class CertificateService {

        @Autowired
        private CertificateDao crtDao;

        @Autowired
        private UserDao uDao;

        @Autowired
        private CourseDao cDao;

        @Autowired
        private SubscriptionDao sDao;

        Logger logger = LoggerFactory.getLogger("infoFile");

        @Transactional
        public Certificate newCertificate(Integer userId, Integer courseId) {
            logger.info("Creating new certificate for user ID: {} and course ID: {}", userId, courseId);

            User user = uDao.findById(userId)
                    .orElseThrow(() -> {
                        logger.error("Invalid user ID: {}", userId);
                        throw new IllegalArgumentException("Invalid user ID: " + userId);
                    });
            Course course = cDao.findById(courseId)
                    .orElseThrow(() -> {
                        logger.error("Invalid course ID: {}", courseId);
                        throw new IllegalArgumentException("Invalid course ID: " + courseId);
                    });

            Certificate certificate = new Certificate();
            certificate.setCourse(course);
            certificate.setUser(user);
            certificate.setCertificateKey(generateUniqueKey());

            crtDao.save(certificate);
            logger.info("Certificate created with key: {}", certificate.getCertificateKey());

            updateSubscription(userId, courseId);
            logger.info("Subscription updated for user ID: {} and course ID: {}", userId, courseId);

            return certificate;
        }

        private String generateUniqueKey() {
            return UUID.randomUUID().toString();
        }


        @Transactional
        public void updateSubscription(Integer userId, Integer courseId) {
            Subscription s = sDao.findByUserIdAndCourseId(userId, courseId);
            if (s != null) {
                s.setCertificateIssued(true);
                sDao.save(s);
            }
        }
    }



