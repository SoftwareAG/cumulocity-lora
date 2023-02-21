package lora.ns.chirpstack;

import org.junit.jupiter.api.Test;

import lora.ns.DeviceData;

/**
 * Unit test for simple App.
 */
public class AppTest {
    /**
     * Rigorous Test :-)
     */
    /*
     * @Test
     * public void shouldAnswerWithTrue() {
     * Properties properties = new Properties();
     * properties.setProperty("address", "45.87.250.4");
     * properties.setProperty("port", "8080");
     * properties.setProperty("ssl", "false");
     * properties.setProperty("apikey",
     * "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6IjhkMGUzZmU1LTQ2OTUtNGVhMy05Nzk5LWU3NGE5MjFjYzVjMCIsInR5cCI6ImtleSJ9.3sV5FWGAXCkUkSfP8TrI3EWZGy49i00YhqL1L-ka-k8"
     * );
     * properties.setProperty("tenantid", "52f14cd4-c6f1-4fbd-8f87-4025e1d49242");
     * 
     * ChirpstackConnector connector = new ChirpstackConnector(properties);
     * System.out.println("List of applications: " + connector.getApplications());
     * System.out.println("List of device profiles: " +
     * connector.getDeviceProfiles());
     * properties.setProperty("application",
     * connector.getApplications().get(0).getId());
     * connector = new ChirpstackConnector(properties);
     * DeviceProvisioning deviceProvisioning = new DeviceProvisioning();
     * deviceProvisioning.setDevEUI("70B3D56371385764");
     * deviceProvisioning.setAppKey("FA40269C2E066EBB32B6A1A642972AF7");
     * deviceProvisioning.setName("Test device");
     * deviceProvisioning.setAdditionalProperties(new Properties());
     * deviceProvisioning.getAdditionalProperties().setProperty("deviceprofile",
     * connector.getDeviceProfiles().get(0).getId());
     * connector.provisionDevice(deviceProvisioning);
     * }
     */

    @Test
    public void testUplink() {
        String event = "";
        ChirpstackIntegrationService service = new ChirpstackIntegrationService();
        DeviceData data = service.processUplinkEvent(event);
        System.out.println(data);
    }
}
