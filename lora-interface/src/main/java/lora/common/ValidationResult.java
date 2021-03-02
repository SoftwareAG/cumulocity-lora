package lora.common;

public class ValidationResult {
    private boolean ok = true;
    private String reason = "";

    public ValidationResult(boolean ok, String reason) {
        this.ok = ok;
        this.reason = reason;
    }

    public boolean isOk() {
        return ok;
    }

    public String getReason() {
        return reason;
    }
}
