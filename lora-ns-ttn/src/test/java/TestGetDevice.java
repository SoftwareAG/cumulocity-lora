import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import com.google.common.io.BaseEncoding;
import com.google.protobuf.ByteString;
import com.google.protobuf.FieldMask;

import org.junit.jupiter.api.Test;

import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lora.ns.ttn.BearerToken;
import ttn.lorawan.v3.ApplicationOuterClass.Application;
import ttn.lorawan.v3.ApplicationOuterClass.Applications;
import ttn.lorawan.v3.ApplicationOuterClass.ListApplicationsRequest;
import ttn.lorawan.v3.ApplicationRegistryGrpc;
import ttn.lorawan.v3.ApplicationRegistryGrpc.ApplicationRegistryBlockingStub;
import ttn.lorawan.v3.ApplicationWebhookRegistryGrpc;
import ttn.lorawan.v3.ApplicationWebhookRegistryGrpc.ApplicationWebhookRegistryBlockingStub;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhook;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhook.Message;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhookIdentifiers;
import ttn.lorawan.v3.ApplicationserverWeb.ApplicationWebhookTemplateIdentifiers;
import ttn.lorawan.v3.ApplicationserverWeb.SetApplicationWebhookRequest;
import ttn.lorawan.v3.EndDeviceOuterClass.EndDevice;
import ttn.lorawan.v3.EndDeviceOuterClass.GetEndDeviceIdentifiersForEUIsRequest;
import ttn.lorawan.v3.EndDeviceOuterClass.GetEndDeviceRequest;
import ttn.lorawan.v3.EndDeviceRegistryGrpc;
import ttn.lorawan.v3.EndDeviceRegistryGrpc.EndDeviceRegistryBlockingStub;
import ttn.lorawan.v3.Identifiers.ApplicationIdentifiers;
import ttn.lorawan.v3.Identifiers.EndDeviceIdentifiers;

public class TestGetDevice {
    @Test
    public void testGetDevice() {
        ManagedChannel managedChannel = null;
        /*
         * try { managedChannel =
         * NettyChannelBuilder.forAddress("softwareag.eu1.cloud.thethings.industries",
         * 8884) .sslContext(GrpcSslContexts.forClient().trustManager(
         * InsecureTrustManagerFactory.INSTANCE).build()) .build(); } catch
         * (SSLException e) { e.printStackTrace(); }
         */
        managedChannel = NettyChannelBuilder.forAddress("softwareag.eu1.cloud.thethings.industries", 1884)
                .usePlaintext().build();

        EndDeviceRegistryBlockingStub service = EndDeviceRegistryGrpc.newBlockingStub(managedChannel)
                .withCallCredentials(new BearerToken("NNSXS.OK5MI3MIKFEMX25CUAZMH7TUQLFP5GXZWL7O3BY.VXSI22QZ6TJ5UDWREYFVOTBTUNJILGFQVKFIGBTNOL77J3CIVVFA"));
        GetEndDeviceIdentifiersForEUIsRequest request = GetEndDeviceIdentifiersForEUIsRequest.newBuilder()
                .setDevEui(ByteString.copyFrom(BaseEncoding.base16().decode("70B3D56371385CA9")))
                .build();
        EndDeviceIdentifiers identifiers = service.getIdentifiersForEUIs(request);

        System.out.println(identifiers.getDeviceId());

        EndDevice device = service.get(GetEndDeviceRequest.newBuilder().setEndDeviceIds(identifiers).build());
        System.out.println(device.getName());
    }

    @Test
    public void testWebhook() {
        ManagedChannel managedChannel = NettyChannelBuilder.forAddress("softwareag.eu1.cloud.thethings.industries", 1884)
        .usePlaintext().build();

        BearerToken token = new BearerToken("NNSXS.OK5MI3MIKFEMX25CUAZMH7TUQLFP5GXZWL7O3BY.VXSI22QZ6TJ5UDWREYFVOTBTUNJILGFQVKFIGBTNOL77J3CIVVFA");

		ApplicationWebhookRegistryBlockingStub service = ApplicationWebhookRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		ApplicationWebhook webhook = ApplicationWebhook.newBuilder()
			.setIds(ApplicationWebhookIdentifiers.newBuilder()
				.setWebhookId("test")
				.setApplicationIds(ApplicationIdentifiers.newBuilder().setApplicationId("softwareag").build())
				.build())
            .setBaseUrl("https://blahblah.blah.com/webhooks")
			.setUplinkMessage(Message.newBuilder().setPath("/uplink").build())
			.setDownlinkAck(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkNack(Message.newBuilder().setPath("/downlink").build())
			.setDownlinkSent(Message.newBuilder().setPath("/downlink").build())
			.setFormat("json")
            .putHeaders("Authorization", "Basic " + Base64.getEncoder().encodeToString(("noone:noone").getBytes()))
			.build();
            service.set(SetApplicationWebhookRequest.newBuilder()
                .setWebhook(webhook)
                .setFieldMask(FieldMask.newBuilder()
                    .addPaths("base_url")
                    .addPaths("downlink_ack")
                    .addPaths("downlink_api_key")
                    .addPaths("downlink_failed")
                    .addPaths("downlink_nack")
                    .addPaths("downlink_queued")
                    .addPaths("downlink_sent")
                    .addPaths("format")
                    .addPaths("headers")
                    .addPaths("ids")
                    .addPaths("ids.application_ids")
                    .addPaths("ids.application_ids.application_id")
                    .addPaths("ids.webhook_id")
                    .addPaths("join_accept")
                    .addPaths("location_solved")
                    .addPaths("service_data")
                    .addPaths("uplink_message")
                    .build())
                .build());
    }

    @Test
    public void getApplications() {
        ManagedChannel managedChannel = NettyChannelBuilder.forAddress("softwareag.eu1.cloud.thethings.industries", 1884)
        .usePlaintext().build();

        BearerToken token = new BearerToken("NNSXS.OK5MI3MIKFEMX25CUAZMH7TUQLFP5GXZWL7O3BY.VXSI22QZ6TJ5UDWREYFVOTBTUNJILGFQVKFIGBTNOL77J3CIVVFA");

        List<Application> result = new ArrayList<>();

		ApplicationRegistryBlockingStub service = ApplicationRegistryGrpc.newBlockingStub(managedChannel).withCallCredentials(token);
		Applications apps = service.list(ListApplicationsRequest.newBuilder().build());
		result = apps.getApplicationsList();
		for (Application app : result) {
			System.out.println(app.getName());
		}

    }
}