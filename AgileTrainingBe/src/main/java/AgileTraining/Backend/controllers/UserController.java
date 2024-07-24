package AgileTraining.Backend.controllers;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;
import AgileTraining.Backend.services.UserService;
import AgileTraining.Backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserDao uDao;
    @Autowired
    BCryptPasswordEncoder encoder;


    @Autowired
    UserService userService;

    Logger logger = LoggerFactory.getLogger("infoFile");

    // TESTATO
    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@RequestBody User user) {
        logger.info("Ricevuta richiesta di registrazione per l'utente: " + user.getUsername());

        try {
            user.setPassword(encoder.encode(user.getPassword()));
        } catch (Exception e) {
            logger.error("Password non hashata");
            return ResponseEntity.status(500).body(new BackendResponse("Password non hashata"));
        }

        try {
            uDao.save(user);
            logger.info("User salvato con successo");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new BackendResponse("user non salvato"));
        }

        return ResponseEntity.status(200).body(new BackendResponse("user salvato con successo"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        logger.info("Ricevuta richiesta per ottenere l'utente con id: {}", id);
        Optional<User> u = uDao.findById(id);
        if (u.isPresent()) {
            logger.info("User trovato: " + id);
            return ResponseEntity.ok(u);
        } else {
            logger.error("User non trovato: " + id);
            return ResponseEntity.status(404).body(new BackendResponse("User non trovato"));
        }
    }

    @PostMapping("/login") // TESTATO
    public ResponseEntity<Object> loginAndPrivateArea(@RequestBody LoginRequest loginRequest, HttpSession session) {

        logger.info("Ricevuta richiesta di login per l'utente: " + loginRequest.getUsername());
        // Step 1: Effettua il login dell'user
        User u = uDao.userLogin(loginRequest.getUsername());

        if (u == null) {
            logger.error("User non trovato");
            return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
        }

        if (!encoder.matches(loginRequest.getPassword(), u.getPassword())) {
            logger.error("Password non valida");
            return ResponseEntity.status(400).body(new BackendResponse("Password non valida"));
        }

        // Step 2: Imposta l'user come loggato nella sessione
        session.setAttribute(u.getUsername(), true);

        // Step 3: Genera il token JWT
        String userToken = JwtUtils.generateToken(u.getUsername());

        // Step 4: Verifica se l'user ha accesso alla private area usando il token JWT appena generato
        Jws<Claims> claims = JwtUtils.verifyToken(userToken);

        if (claims == null) {
            logger.error("Token non valido");
            return ResponseEntity.status(400).body(new BackendResponse("Token non valido"));
        }

        Boolean isLoggedIn = (Boolean) session.getAttribute(u.getUsername());

        if (isLoggedIn == null || !isLoggedIn) {
            logger.error("User non loggato");
            return ResponseEntity.status(401).body(new BackendResponse("User non loggato"));
        }

        // Se tutte le verifiche sono passate, l'user ha accesso alla private area
        logger.info("User loggato con successo");
        return ResponseEntity.status(200).body(u.getId());
    }


    // delete user -- TESTATO
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<BackendResponse> deleteUser(@PathVariable Integer id) {
        if (uDao.findById(id) == null) {
            logger.error("User {} non trovato", id);
            return ResponseEntity.status(404).body(new BackendResponse("User non trovato"));
        }
        userService.deleteUser(id);
        logger.info("User {} eliminato con successo", id);
        return ResponseEntity.ok().body(new BackendResponse("User eliminato con successo"));
    }

    // update user -- TESTATO
    @PutMapping("/{id}/update")
    public ResponseEntity<BackendResponse> updateUser(@PathVariable Integer id, @RequestBody updateRequest updateRequest) {

        logger.info("Ricevuta richiesta di aggiornamento per l'utente: " + id);
        Optional<User> u = uDao.findById(id);

        if (u.isPresent()) {
            u.get().setEmail(updateRequest.getEmail());
            u.get().setPassword(encoder.encode(updateRequest.getPassword()));
            u.get().setProfileImageUrl(updateRequest.getProfileImageUrl());
            uDao.save(u.get());
            return ResponseEntity.status(200).body(new BackendResponse("user aggiornato!"));
        } else {
            logger.error("User {} non trovato", id);
            return ResponseEntity.status(404).body(new BackendResponse("user non trovato!"));
        }
    }


    // update user picture -- TESTATO
    @PutMapping("/{id}/newPicture")
    public ResponseEntity<BackendResponse> updatePicture(@PathVariable Integer id, @RequestParam String newProfileImageUrl) {
        logger.info("Ricevuta richiesta di aggiornamento della foto del profilo per l'utente: " + id);
        Optional<User> u = uDao.findById(id);

        if (u != null) {
            u.get().setProfileImageUrl(newProfileImageUrl);
            uDao.save(u.get());
            logger.info("Foto del profilo aggiornata correttamente per l'utente: {}", id);
            return ResponseEntity.status(200).body(new BackendResponse("Foto del profilo aggiornata correttamente!"));
        } else {
            logger.error("User {} non trovato", id);
            return ResponseEntity.status(404).body(new BackendResponse("user non trovato!"));
        }
    }

    public static class updateRequest {
        private String email;
        private String password;
        private String profileImageUrl;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
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

        /*
                @PostMapping("/login")
        public ResponseEntity<Object> loginAndPrivateArea(@RequestBody User user, HttpSession session) {

            // Step 1: Effettua il login dell'user
            User u = uDao.userLogin(user.getUsername());

            if (u == null) {
                return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
            }

            if (!encoder.matches(user.getPassword(), u.getPassword())) {
                return ResponseEntity.status(400).body(new BackendResponse("Password non valida"));
            }

            // Step 2: Imposta l'user come loggato nella sessione
            session.setAttribute(u.getUsername(), true);

            // Step 3: Genera il token JWT
            String userToken = JwtUtils.generateToken(u.getName(), u.getSurname(), u.getUsername());

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
            return ResponseEntity.status(200).body(new BackendResponse("Puoi accedere ai corsi"));
        }
        */


}
