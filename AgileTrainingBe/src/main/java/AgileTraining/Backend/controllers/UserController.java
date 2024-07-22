package AgileTraining.Backend.controllers;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;
import AgileTraining.Backend.services.UserService;
import AgileTraining.Backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;




@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserDao uDao;
    @Autowired
    BCryptPasswordEncoder encoder;


    @Autowired
    UserService userService;

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
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User u = uDao.getUserById(id);
        if (u != null) {
            return ResponseEntity.ok().body(u);
        } else {
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/login") // TESTATO
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
        return ResponseEntity.status(200).body(new BackendResponse("Puoi accedere ai corsi"));
    }


    // delete user -- TESTATO
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<BackendResponse>  deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body(new BackendResponse("User eliminato con successo"));
    }
    // update user -- TESTATO
    @PutMapping("/{id}/update")
    public ResponseEntity<BackendResponse> updateUser(@PathVariable Integer id, @RequestBody updateRequest updateRequest) {
        User u = uDao.getUserById(id);

        if (u != null) {
            u.setEmail(updateRequest.getEmail());
            u.setPassword(updateRequest.getPassword());
            u.setProfileImageUrl(updateRequest.getProfileImageUrl());
            uDao.save(u);

            return ResponseEntity.status(200).body(new BackendResponse("user aggiornato!"));
        } else {
            return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
        }
    }


    // update user picture -- TESTATO
    @PutMapping("/{id}/newPicture")
    public ResponseEntity<BackendResponse> updatePicture(@PathVariable Integer id, @RequestParam String newProfileImageUrl) {
        User u = uDao.getUserById(id);

        if (u != null) {
            u.setProfileImageUrl(newProfileImageUrl);
            uDao.save(u);
            return ResponseEntity.status(200).body(new BackendResponse("Foto del profilo aggiornata correttamente!"));
        } else {
            return ResponseEntity.status(400).body(new BackendResponse("user non trovato!"));
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

















