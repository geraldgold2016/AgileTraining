package AgileTraining.Backend.services;

import AgileTraining.Backend.classes.BackendResponse;
import AgileTraining.Backend.daos.UserDao;
import AgileTraining.Backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    @Autowired
    private UserDao uDao;

    public ResponseEntity<BackendResponse> deleteUser(Integer userId){
        Optional<User> user = uDao.findById(userId);
        if (user.isPresent()) {
            uDao.delete(user.get());
            return ResponseEntity.ok().body(new BackendResponse("User eliminato con successo"));
        }
        return ResponseEntity.badRequest().body(new BackendResponse("User non trovato"));
    }
}
