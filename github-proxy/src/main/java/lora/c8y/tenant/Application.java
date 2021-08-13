package lora.c8y.tenant;

public class Application {
    private String self;

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public Application self(String self) {
        this.self = self;
        return this;
    }
}
