package AgileTraining.Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.CertificateDao;
import AgileTraining.Backend.daos.CourseDao;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.Certificate;
import AgileTraining.Backend.entities.Course;
import AgileTraining.Backend.entities.User;


@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class CertificateController 
{
	@Autowired
	CertificateDao ceDao;
	
	@Autowired
	UserDao uDao;
	
	@Autowired
	CourseDao coDao;
	
    @PostMapping("/createCertificate")
    public ResponseEntity<?> createCertificate(@RequestBody CertificateDto certificateDto) 
    {
        try 
        {
            // Recupera l'utente e il corso usando gli ID forniti nel DTO
            User user = uDao.getUserById(certificateDto.getUserId());
            if (user == null)
            {
                return ResponseEntity.status(400).body(new BackendResponse("user non trovato"));
            }
            Course course = coDao.getCoursesById(certificateDto.getCourseId());
            if (course == null)
            {
                return ResponseEntity.status(400).body(new BackendResponse("corso non trovato"));
            }

            // Crea un nuovo oggetto Certificate e imposta i valori
            Certificate certificate = new Certificate();
            certificate.setUser(user);
            certificate.setCourse(course);
            certificate.setIsIssued(certificateDto.getIsIssued());
            certificate.setCertificateKey(certificateDto.getCertificateKey());
            certificate.setTestDate(certificateDto.getTestDate());

            // Salva il certificato
            ceDao.save(certificate);

            // Risposta di successo
            return ResponseEntity.status(200).body(new BackendResponse("Certificate created successfully"));
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.status(500).body(new BackendResponse(e.getMessage()));
        }
    }
    
    //http://localhost:8080/getCertificate?idCorso=1&idUtente=2
    @GetMapping("/getCertificate")
    public ResponseEntity<?> getCertificate(@RequestParam Integer idCorso, @RequestParam Integer idUtente) 
    {
        try 
        {
        	Integer idcertificate = ceDao.getCertificateIdByUserAndCourse(idCorso, idUtente);
            Certificate certificate = ceDao.getCertificateById(idcertificate);
            if (certificate == null)
            {
                return ResponseEntity.status(404).body(new BackendResponse("Certificate not found"));
            }
            
            CertificateDto certificateDto = new CertificateDto();
            certificateDto.setUserId(certificate.getUser().getId());
            certificateDto.setCourseId(certificate.getCourse().getId());
            certificateDto.setIsIssued(certificate.getIsIssued());
            certificateDto.setCertificateKey(certificate.getCertificateKey());
            certificateDto.setTestDate(certificate.getTestDate());

            return ResponseEntity.status(200).body(certificateDto);
        } 
        catch (Exception e) 
        {
            return ResponseEntity.status(500).body(new BackendResponse(e.getMessage()));
        }
    }
    
    //http://localhost:8080/checkCertificate?idCorso=1&idUtente=2
    @GetMapping("/checkCertificate")
    public ResponseEntity<?> checkCertificate(@RequestParam Integer idCorso, @RequestParam Integer idUtente) 
    {
        try 
        {
        	Integer idcertificate = ceDao.getCertificateIdByUserAndCourse(idCorso, idUtente);
        	Boolean certificateExists;
            if (idcertificate == null)
            {
            	certificateExists = false;
                return ResponseEntity.status(200).body(certificateExists);
            }
            certificateExists = true;
           
            return ResponseEntity.status(200).body(certificateExists);
        } 
        catch (Exception e) 
        {
            return ResponseEntity.status(500).body(new BackendResponse(e.getMessage()));
        }
    }
    
    public static class CertificateDto 
    {
        private Integer userId;
        private Integer courseId;
        private Boolean isIssued;
        private String certificateKey;
        private String testDate;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getCourseId() {
            return courseId;
        }

        public void setCourseId(Integer courseId) {
            this.courseId = courseId;
        }

        public Boolean getIsIssued() {
            return isIssued;
        }

        public void setIsIssued(Boolean isIssued) {
            this.isIssued = isIssued;
        }

        public String getCertificateKey() {
            return certificateKey;
        }

        public void setCertificateKey(String certificateKey) {
            this.certificateKey = certificateKey;
        }

        public String getTestDate() {
            return testDate;
        }

        public void setTestDate(String testDate) {
            this.testDate = testDate;
        }
    }

}
