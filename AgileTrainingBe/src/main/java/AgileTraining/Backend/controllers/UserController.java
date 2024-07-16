package AgileTraining.Backend.controllers;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;
import AgileTraining.Backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
    @CrossOrigin(origins = "http://localhost:4200")
    public class UserController {

        @Autowired
        UserDao uDao;
        @Autowired
        BCryptPasswordEncoder encoder;


        @GetMapping("/users")
        public ResponseEntity<List<User>> getAllUsers() {

            return ResponseEntity.status(200).body(uDao.findAll());
        }


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
                System.out.println("user salvato con successo"); // Log per salvataggio
            } catch (Exception e) {
                return ResponseEntity.status(500).body(new BackendResponse("user non salvato"));
            }

            return ResponseEntity.status(200).body(user);
        }


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
    }
