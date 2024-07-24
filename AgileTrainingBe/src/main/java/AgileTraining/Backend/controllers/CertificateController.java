package AgileTraining.Backend.controllers;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.classes.BooleanResponse;
import AgileTraining.Backend.daos.CertificateDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Certificate;
import AgileTraining.Backend.services.CertificateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class CertificateController {


    @Autowired
    CertificateDao cDao;

    @Autowired
    UserDao uDao;

    @Autowired
    CertificateService certificateService;

    Logger logger = LoggerFactory.getLogger("infoFile");

    // ottiene la chiave del certificato
    // testato
    @GetMapping("/getCertificateKey")
    public ResponseEntity<?> getCertificateKey(@RequestParam Integer id) {
        logger.info("Ricevuta richiesta per ottenere la chiave del certificato con id: " + id);
        if (cDao.getCertificateKeyById(id) == null) {
            logger.error("Certificato non trovato");
            return ResponseEntity.status(404).body(new BackendResponse("Certificate not found"));
        }
        String key = cDao.getCertificateKeyById(id);
        return ResponseEntity.ok().body(key);
    }

    // controlla se esiste un certificato per un utente e un corso
    // testato
    @GetMapping("/isCertificateIssued")
    public ResponseEntity<?>  isCertificateIssued(@RequestParam Integer userId, @RequestParam Integer courseId) {
        logger.info("Ricevuta richiesta per controllare se esiste un certificato per l'utente con id: " + userId + " e il corso con id: " + courseId);
        Certificate certificate = cDao.getCertificateByUserANDcourseId(userId, courseId);
        if (certificate == null) {
            logger.info("Certificato non emesso");
            return ResponseEntity.ok().body(new BooleanResponse(false,"Certificate not issued"));
        } else {
            return ResponseEntity.ok().body(new BooleanResponse(true, "Certificate issued"));
        }
    }

    // crea un nuovo certificato nel database
    //testato
    @PostMapping("/issueCertificate")
    public ResponseEntity<BackendResponse> issueCertificate(@RequestBody CertificateRequest certificateRequest) {
        logger.info("Ricevuta richiesta per creare un nuovo certificato per l'utente con id: " + certificateRequest.userId + " e il corso con id: " + certificateRequest.courseId);
        Certificate certificate = certificateService.newCertificate(certificateRequest.userId, certificateRequest.courseId);
        if (certificate == null) {
            logger.error("Errore nella creazione del certificato");
            return ResponseEntity.status(500).body(new BackendResponse("Error creating certificate"));
        }
        return ResponseEntity.ok().body(new BackendResponse("Certificate issued successfully"));
    }

    public static class CertificateRequest {
        public Integer userId;
        public Integer courseId;

        public Integer getCourseId() {
            return courseId;
        }

        public void setCourseId(Integer courseId) {
            this.courseId = courseId;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }
    }
}