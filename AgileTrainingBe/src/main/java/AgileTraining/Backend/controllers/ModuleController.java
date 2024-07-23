package AgileTraining.Backend.controllers;


import AgileTraining.Backend.daos.ModuleDao;
import AgileTraining.Backend.entities.Module;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ModuleController {

    @Autowired
    ModuleDao mDao;

    Logger logger = LoggerFactory.getLogger("infoFile");

    @GetMapping("/{courseId}/allModules")  // TESTATO
    public ResponseEntity<Object> getAllModules(@PathVariable Integer courseId) {
        logger.info("Received request to get all modules for course with ID: " + courseId);
        try {
            // Recupera i moduli dal DAO usando l'ID del corso
            List<Module> modules = mDao.getAllModules(courseId);
            // Crea una risposta contenente i moduli
            return ResponseEntity.status(200).body(modules);
        } catch (DataAccessException e) {
            logger.error("Errore nell'accesso ai dati: " + e.getMessage());
            // Gestione dell'eccezione di accesso ai dati
            return ResponseEntity.status(500).body("Errore nell'accesso ai dati: " + e.getMessage());
        } catch (Exception e) {
            // Gestione di altre eccezioni
            logger.error("Si è verificato un errore: " + e.getMessage()
            );
            return ResponseEntity.status(500).body("Si è verificato un errore: " + e.getMessage());
        }
    }
}
