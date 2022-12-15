package lora.ns.liveobjects;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;

import lombok.extern.slf4j.Slf4j;
import lora.codec.downlink.DownlinkData;
import lora.ns.connector.LNSAbstractConnector;
import lora.ns.connector.LNSResponse;
import lora.ns.device.DeviceProvisioning;
import lora.ns.device.EndDevice;
import lora.ns.gateway.Gateway;
import lora.ns.gateway.GatewayProvisioning;
import lora.ns.liveobjects.rest.LiveObjectsService;
import lora.ns.liveobjects.rest.model.ActionPolicy;
import lora.ns.liveobjects.rest.model.ActionTriggers;
import lora.ns.liveobjects.rest.model.Actions;
import lora.ns.liveobjects.rest.model.HttpPushAction;
import lora.ns.liveobjects.rest.model.LoraNetworkFilter;
import lora.ns.liveobjects.rest.model.LoraNetworkFilter.MessageType;
import lora.ns.liveobjects.rest.model.LoraNetworkTrigger;
import retrofit2.Response;

@Slf4j
public class LiveObjectsConnector extends LNSAbstractConnector {

	private LiveObjectsService service;

	public LiveObjectsConnector(Properties properties) {
		super(properties);
	}

	public LiveObjectsConnector(ManagedObjectRepresentation instance) {
		super(instance);
	}

	@Override
	protected void init() {
		// Configure LNS API access here
	}

	@Override
	public LNSResponse<List<EndDevice>> getDevices() {
		return new LNSResponse<List<EndDevice>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<EndDevice> getDevice(String devEui) {
		return new LNSResponse<EndDevice>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<String> sendDownlink(DownlinkData operation) {
		return new LNSResponse<String>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> provisionDevice(DeviceProvisioning deviceProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> configureRoutings(String url, String tenant, String login, String password) {
		LNSResponse<Void> response = new LNSResponse<Void>().withOk(true);
		String authorization = "Basic "
				+ Base64.getEncoder().encodeToString((tenant + "/" + login + ":" + password).getBytes());
		try {
			Response<ActionPolicy> result = service.createActionPolicy(new ActionPolicy()
					.withId(null)
					.withName("Cumulocity webhook for tenant " + tenant)
					.withEnabled(true)
					.withActions(new Actions()
							.withHttpPush(new HttpPushAction()
									.withWebhookUrl(url + "/uplink")
									.withHeaders(Map.of("Authorization", authorization))))
					.withTriggers(new ActionTriggers()
							.withLoraNetwork(new LoraNetworkTrigger()
									.withFilter(new LoraNetworkFilter()
											.withMessageTypes(List.of(MessageType.UNCONFIRMED_DATA_UP,
													MessageType.CONFIRMED_DATA_UP))))))
					.execute();
			if (!result.isSuccessful()) {
				response.setOk(false);
				response.setMessage(result.errorBody().string());
			} else {
				this.setProperty("uplinkRouteId", result.body().getId());
				result = service.createActionPolicy(new ActionPolicy()
						.withId(null)
						.withName("Cumulocity webhook for tenant " + tenant)
						.withEnabled(true)
						.withActions(new Actions()
								.withHttpPush(new HttpPushAction()
										.withWebhookUrl(url + "/downlink")
										.withHeaders(Map.of("Authorization", authorization))))
						.withTriggers(new ActionTriggers()
								.withLoraNetwork(new LoraNetworkTrigger()
										.withFilter(new LoraNetworkFilter()
												.withMessageTypes(List.of(MessageType.CONFIRMED_DATA_DOWN,
														MessageType.UNCONFIRMED_DATA_DOWN))))))
						.execute();
				if (!result.isSuccessful()) {
					response.setOk(false);
					response.setMessage(result.errorBody().string());
				} else {
					this.setProperty("downlinkRouteId", result.body().getId());
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			response.withOk(false).withMessage(e.getMessage());
		}
		return response;
	}

	@Override
	public LNSResponse<Void> removeRoutings() {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> deprovisionDevice(String deveui) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<List<Gateway>> getGateways() {
		return new LNSResponse<List<Gateway>>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> provisionGateway(GatewayProvisioning gatewayProvisioning) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	@Override
	public LNSResponse<Void> deprovisionGateway(String id) {
		return new LNSResponse<Void>().withOk(false).withMessage("Not implemented.");
	}

	public boolean hasGatewayManagementCapability() {
		return false;
	}
}
