package AgileTraining.Backend.controllers;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;
import AgileTraining.Backend.services.UserService;
import AgileTraining.Backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

//import org.apache.el.stream.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;



@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")

public class UserController {

    @Autowired
    UserDao uDao;
    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    UserService userService;


    Logger logger = LoggerFactory.getLogger("infoFile");






    
    // TESTATO
    // TODO : check if the user already exists
    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@RequestBody User user) {
        System.out.println("Request ricevuta: " + user);

        try {
            user.setPassword(encoder.encode(user.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new BackendResponse("Password non hashata"));
        }
        try {
            uDao.save(user);
            System.out.println("user salvato con successo");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new BackendResponse("user non salvato"));
        }

        return ResponseEntity.status(200).body(new BackendResponse("user salvato con successo"));
    }

    // get user data by id -- TESTATO

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        // Usa findById per ottenere un Optional<User>
        Optional<User> userOptional = uDao.findById(id);
        
        // Controlla se l'utente è presente e restituisci la risposta appropriata
        if (userOptional.isPresent()) {
            return ResponseEntity.ok().body(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    

    // @GetMapping("/{id}")
    // public ResponseEntity<User> getUserById(@PathVariable Integer id) {
    // User u = uDao.getUserById(id);
    // if (u != null) {
    // return ResponseEntity.ok().body(u);
    // } else {
    // return ResponseEntity.status(400).body(null);
    // }
    // }

    @PostMapping("/login")
    public ResponseEntity<Object> loginAndPrivateArea(@RequestBody LoginRequest loginRequest, HttpSession session) {

        // Step 1: Effettua il login dell'user
        User u = uDao.userLogin(loginRequest.getUsername());

        if (u == null) {
            return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
        }

        if (!encoder.matches(loginRequest.getPassword(), u.getPassword())) {
            return ResponseEntity.status(400).body(new BackendResponse("Password non valida"));
        }

        // Step 2: Imposta l'user come loggato nella sessione
        session.setAttribute(u.getUsername(), true);

        // Step 3: Genera il token JWT
        String userToken = JwtUtils.generateToken(u.getUsername());

        // Step 4: Verifica se l'user ha accesso alla private area usando il token JWT appena generato
        Jws<Claims> claims = JwtUtils.verifyToken(userToken);

        if (claims == null) {
            return ResponseEntity.status(400).body(new BackendResponse("Token non valido"));
        }

        Boolean isLoggedIn = (Boolean) session.getAttribute(u.getUsername());

        if (isLoggedIn == null || !isLoggedIn) {
            return ResponseEntity.status(401).body(new BackendResponse("User non loggato"));
        }

        // Se tutte le verifiche sono passate, l'user ha accesso alla private area
        //return ResponseEntity.status(200).body(new BackendResponse("Puoi accedere ai corsi"));
        //return ResponseEntity.status(200).body(u.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("token", userToken);
        response.put("userId", u.getId());

        return ResponseEntity.status(200).body(response);
    }
    

    @PutMapping("/{id}/update")
    public ResponseEntity<BackendResponse> updateUser(@PathVariable Integer id, @RequestBody updateRequest updateRequest) {

        logger.info("Ricevuta richiesta di aggiornamento per l'utente: " + id);
        Optional<User> u = uDao.findById(id);

        if (u.isPresent()) {
            Optional<User> existingEmail = uDao.findByEmail(updateRequest.getEmail());
            if (existingEmail.isPresent() && !existingEmail.get().getId().equals(id)){
                logger.error("Email già esistente");
                return ResponseEntity.status(400).body(new BackendResponse("Email già esistente"));
            }
            u.get().setEmail(updateRequest.getEmail());
            u.get().setProfileImageUrl(updateRequest.getProfileImageUrl());
            u.get().setResidentialAddress(updateRequest.getResidentialAddress());
            u.get().setHomeAddress(updateRequest.getHomeAddress());
            u.get().setGender(updateRequest.getGender());

            uDao.save(u.get());
            return ResponseEntity.status(200).body(new BackendResponse("user aggiornato!"));
        } else {
            logger.error("User non trovato: " + id);
            return ResponseEntity.status(404).body(new BackendResponse("user non trovato!"));
        }
    }





    // delete user -- TESTATO
    // delete user -- TESTATO
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<BackendResponse> deleteUser(@PathVariable Integer id, @RequestParam String password) {
        logger.info("Ricevuta richiesta di eliminazione per l'utente: " + id);
        Optional<User> userOptional = uDao.findById(id);
        if (userOptional.isEmpty()) {
            logger.error("User non trovato: %d".formatted(id));
            return ResponseEntity.status(404).body(new BackendResponse("User non trovato"));
        }

        if (!encoder.matches(password, userOptional.get().getPassword())) {
            logger.error("Password non valida");
            return ResponseEntity.status(400).body(new BackendResponse("Password non valida"));
        }

        userService.deleteUser(id);
        logger.info("User {} eliminato con successo", id);
        return ResponseEntity.ok().body(new BackendResponse("User eliminato con successo"));
    }




    // change password -- testato
    @PutMapping("/{id}/changePassword")
public ResponseEntity<BackendResponse> updatePassword(@PathVariable Integer id, @RequestBody PasswordRequest passwordRequest) {
    logger.info("Ricevuta richiesta di aggiornamento della password per l'utente: " + id);
    Optional<User> u = uDao.findById(id);

    if (u.isEmpty()) {
        logger.error("User {} non trovato", id);
        return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
    }

    if (!encoder.matches(passwordRequest.getOldPassword(), u.get().getPassword())) {
        logger.error("Password non valida");
        return ResponseEntity.status(400).body(new BackendResponse("Password non valida"));
    }

    if (passwordRequest.getOldPassword().equals(passwordRequest.getNewPassword())) {
        logger.error("La nuova password deve essere diversa dalla vecchia");
        return ResponseEntity.status(400).body(new BackendResponse("La nuova password deve essere diversa dalla vecchia"));
    }

    u.get().setPassword(encoder.encode(passwordRequest.getNewPassword()));
    uDao.save(u.get());
    logger.info("Password aggiornata correttamente per l'utente: {}", id);

    return ResponseEntity.status(200).body(new BackendResponse("Password aggiornata correttamente!"));
}


    // update user -- TESTATO
    // @PutMapping("/{id}/update")
    // public ResponseEntity<BackendResponse> updateUser(@PathVariable Integer id,
    //         @RequestBody updateRequest updateRequest) {
    //     User u = uDao.getUserById(id);

    //     if (u != null) {
    //         u.setEmail(updateRequest.getEmail());
    //         u.setPassword(updateRequest.getPassword());
    //         u.setProfileImageUrl(updateRequest.getProfileImageUrl());
    //         uDao.save(u);

    //         return ResponseEntity.status(200).body(new BackendResponse("user aggiornato!"));
    //     } else {
    //         return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
    //     }
    // }

   
    @PutMapping("/{id}/updateUsername")
    public ResponseEntity<BackendResponse> updateUsername(
            @PathVariable Integer id,
            @RequestBody LoginRequest loginRequest) {
    
        // Recupera l'utente dal database
        Optional<User> userOptional = uDao.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new BackendResponse("Utente non trovato!"));
        }
    
        User user = userOptional.get();
    
        // Verifica la password fornita
        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BackendResponse("Password non valida"));
        }
    
        // Aggiorna l'username
        user.setUsername(loginRequest.getUsername());
        uDao.save(user);
    
        // Restituisce una risposta di successo
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BackendResponse("Username aggiornato con successo!"));
    }
    
    @PutMapping("/{id}/updateProfilePicture")
    public ResponseEntity<BackendResponse> updateProfilePicture(
        @PathVariable Integer id,
        @RequestBody Map<String, String> updateRequest) {
    
        // Recupera l'utente dal database
        Optional<User> userOptional = uDao.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new BackendResponse("Utente non trovato!"));
        }
    
        User user = userOptional.get();
        String profileImageUrl = updateRequest.get("profileImageUrl");
        user.setProfileImageUrl(profileImageUrl);
        uDao.save(user);
    
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BackendResponse("URL dell'immagine del profilo aggiornato con successo!"));
    }
    
    @PutMapping("/{id}/newPicture")
    public ResponseEntity<BackendResponse> updatePicture(@PathVariable Integer id,
            @RequestParam String newProfileImageUrl) {
    
        // Recupera l'utente dal database
        Optional<User> userOptional = uDao.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setProfileImageUrl(newProfileImageUrl);
            uDao.save(user);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BackendResponse("Foto del profilo aggiornata correttamente!"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new BackendResponse("Utente non trovato!"));
        }
    }
    



     public static class updateRequest {
        private String email;
        private String profileImageUrl;
        private String residentialAddress;
        private String homeAddress;
        private String gender;

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getHomeAddress() {
            return homeAddress;
        }

        public void setHomeAddress(String homeAddress) {
            this.homeAddress = homeAddress;
        }

        public String getResidentialAddress() {
            return residentialAddress;
        }

        public void setResidentialAddress(String residentialAddress) {
            this.residentialAddress = residentialAddress;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getProfileImageUrl() {
            return profileImageUrl;
        }

        public void setProfileImageUrl(String profileImageUrl) {
            this.profileImageUrl = profileImageUrl;
        }
    }



    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    
    public static class PasswordRequest {
        private String oldPassword;
        private String newPassword;

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }
    }

    /*
     * @PostMapping("/login")
     * public ResponseEntity<Object> loginAndPrivateArea(@RequestBody User user,
     * HttpSession session) {
     * 
     * // Step 1: Effettua il login dell'user
     * User u = uDao.userLogin(user.getUsername());
     * 
     * if (u == null) {
     * return ResponseEntity.status(400).body(new
     * BackendResponse("user non trovato!"));
     * }
     * 
     * if (!encoder.matches(user.getPassword(), u.getPassword())) {
     * return ResponseEntity.status(400).body(new
     * BackendResponse("Password non valida"));
     * }
     * 
     * // Step 2: Imposta l'user come loggato nella sessione
     * session.setAttribute(u.getUsername(), true);
     * 
     * // Step 3: Genera il token JWT
     * String userToken = JwtUtils.generateToken(u.getName(), u.getSurname(),
     * u.getUsername());
     * 
     * // Step 4: Verifica se l'user ha accesso alla private area usando il token
     * JWT appena generato
     * Jws<Claims> claims = JwtUtils.verifyToken(userToken);
     * 
     * if (claims == null) {
     * return ResponseEntity.status(400).body(new
     * BackendResponse("Token non valido"));
     * }
     * 
     * Boolean isLoggedIn = (Boolean) session.getAttribute(u.getUsername());
     * 
     * if (isLoggedIn == null || !isLoggedIn) {
     * return ResponseEntity.status(401).body(new
     * BackendResponse("User non loggato"));
     * }
     * 
     * // Se tutte le verifiche sono passate, l'user ha accesso alla private area
     * return ResponseEntity.status(200).body(new
     * BackendResponse("Puoi accedere ai corsi"));
     * }
     */

}