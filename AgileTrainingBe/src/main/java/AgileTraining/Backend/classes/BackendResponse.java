package AgileTraining.Backend.classes;

import AgileTraining.Backend.entities.Module;

import java.util.List;

public class BackendResponse {

    private List<?> lista;
    private String s;

    public BackendResponse(Boolean isSubscriptionValid) {

    }

    public List<?> getLista() {
        return lista;
    }

    public void setLista(List<?> lista) {
        this.lista = lista;
    }

    public BackendResponse(String s) {
        this.s = s;
    }

    public BackendResponse(List<?> lista) {
        this.lista = lista;
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }
}
