package lora.ns.ttn;

import org.junit.jupiter.api.Test;

import lora.ns.DeviceData;

public class TestIntegration {
    /*@Test
    public void testProvisioning() {
        Properties properties = new Properties();
        properties.setProperty("address", "eu1.cloud.thethings.network");
        properties.setProperty("appid", "test-lora-framework");
        properties.setProperty("apikey",
                "NNSXS.DQIOWQ5S2R3QEOUPD3DC5MVZWES4FM4C73AUZAQ.L5QM76OI5AB7T2LCJEORZJTIT6MFGTGOBV5CL256GLCTTZKP7YDQ");
        TTNConnector connector = new TTNConnector(properties);
        DeviceProvisioning deviceProvisioning = new DeviceProvisioning();
        deviceProvisioning.setName("test");
        deviceProvisioning.setDevEUI("AABCDE0ABCDEF123");
        deviceProvisioning.setAppEUI("0ABCDE0ABCDE0ABC");
        deviceProvisioning.setAppKey("0ABCDE0ABCDE0ABC0ABCDE0ABCDE0ABC");
        connector.provisionDevice(deviceProvisioning);
    }*/

    /*@Test
    public void testDownlink() {
        Properties properties = new Properties();
        properties.setProperty("address", "eu1.cloud.thethings.network");
        properties.setProperty("appid", "test-lora-framework");
        properties.setProperty("apikey",
                "NNSXS.DQIOWQ5S2R3QEOUPD3DC5MVZWES4FM4C73AUZAQ.L5QM76OI5AB7T2LCJEORZJTIT6MFGTGOBV5CL256GLCTTZKP7YDQ");
        TTNConnector connector = new TTNConnector(properties);
        connector.sendDownlink(new DownlinkData("0018B20000001437", 1, "01"));
    }*/

    @Test
    public void testUplink() {
        TTNIntegrationService service = new TTNIntegrationService();
        DeviceData deviceData = service.processUplinkEvent("{\"uplink_message\": {\"rx_metadata\": [{\"snr\": 11.2}]}}}");
        System.out.println(deviceData.getMeasurements().get(0).toJSON());
    }
}
