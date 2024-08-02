package AgileTraining.Backend.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private UserDao userDao; // Aggiungi UserDao per aggiornare il database

    private final String BUCKET_NAME = "progetto-elearning";


    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                               @PathVariable Integer userId) {
        try {
            // Usa il nome originale del file
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File name is missing");
            }
    
            // Crea un ObjectMetadata e imposta la lunghezza del contenuto
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
    
            // Carica il file su S3 con il nome originale
            amazonS3.putObject(new PutObjectRequest(BUCKET_NAME, originalFileName, file.getInputStream(), metadata));
    
            // Costruisci l'URL dell'immagine
            String fileUrl = amazonS3.getUrl(BUCKET_NAME, originalFileName).toString();
    
            // Recupera l'utente e aggiorna l'URL del profilo
            Optional<User> userOptional = userDao.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setProfileImageUrl(fileUrl);
                userDao.save(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
    
            return ResponseEntity.ok("Image uploaded and user profile updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }
    


    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();

            // Crea un ObjectMetadata e imposta la lunghezza del contenuto
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());

            amazonS3.putObject(new PutObjectRequest(BUCKET_NAME, fileName, file.getInputStream(), metadata));

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }

    @GetMapping("/get/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            S3Object s3Object = amazonS3.getObject(BUCKET_NAME, fileName);
            try (S3ObjectInputStream inputStream = s3Object.getObjectContent()) {
                try {
                    byte[] content = IOUtils.toByteArray(inputStream);
                    return ResponseEntity.ok().body(content);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<String> getProfilePictureUrl(@PathVariable Long userId) {
        // Implementa la logica per ottenere l'URL dell'immagine del profilo per
        // l'utente con l'ID specificato
        // Puoi recuperare questo URL dal database e costruirlo utilizzando il nome del
        // file
        // Ad esempio:
        String fileName = "profile_picture_" + userId + ".jpg"; // Adatta questo nome come necessario
        String url = amazonS3.getUrl(BUCKET_NAME, fileName).toString();
        return ResponseEntity.ok(url);
    }
}


