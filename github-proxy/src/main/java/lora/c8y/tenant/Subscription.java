package lora.c8y.tenant;

public class Subscription {
    private Application application;

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Subscription application(Application application) {
        this.application = application;
        return this;
    }
}
