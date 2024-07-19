package AgileTraining.Backend.controllers;


import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.entities.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ModuleController {

    @Autowired
    ModuleDao mDao;


    @GetMapping("/{courseId}/allModules")  // TESTATO
    public ResponseEntity<Object> getAllModules(@PathVariable Integer courseId) {
        try {
            // Recupera i moduli dal DAO usando l'ID del corso
            List<Module> modules = mDao.getAllModules(courseId);

            // Crea una risposta contenente i moduli
            return ResponseEntity.status(200).body(modules);
        } catch (DataAccessException e) {
            // Gestione delle eccezioni relative all'accesso ai dati
            return ResponseEntity.status(500).body("Errore nell'accesso ai dati: " + e.getMessage());
        } catch (Exception e) {
            // Gestione di altre eccezioni
            return ResponseEntity.status(500).body("Si è verificato un errore: " + e.getMessage());
        }
    }
}
