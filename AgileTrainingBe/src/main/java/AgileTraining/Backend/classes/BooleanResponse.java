package AgileTraining.Backend.classes;

public class BooleanResponse {
    private boolean isValid;
    private String msg;

    public BooleanResponse(boolean found, String msg) {
        this.isValid = found;
        this.msg = msg;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}