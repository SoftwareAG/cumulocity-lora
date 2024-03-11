package lora.ns.liveobjects.rest;

import java.util.List;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.liveobjects.rest.model.ActionPolicy;
import lora.ns.liveobjects.rest.model.Command;
import lora.ns.liveobjects.rest.model.CommandResponse;
import lora.ns.liveobjects.rest.model.ConnectivityPlan;
import lora.ns.liveobjects.rest.model.CreateDevice;
import lora.ns.liveobjects.rest.model.Device;
import lora.ns.liveobjects.rest.model.Group;

public interface LiveObjectsService {
	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST api/v1/event2action/actionPolicies")
	ActionPolicy createActionPolicy(ActionPolicy actionPolicy);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("DELETE api/v1/event2action/actionPolicies/{policyId}")
	void deleteActionPolicy(@Param("policyId") String policyId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST api/v1/deviceMgt/devices")
	CreateDevice createDevice(CreateDevice createDevice);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("DELETE api/v1/deviceMgt/devices/{deviceId}")
	void deleteDevice(@Param("deviceId") String deviceId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET api/v1/deviceMgt/devices/{deviceId}")
	Device getDevice(@Param("deviceId") String deviceId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST api/v1/deviceMgt/devices/{deviceId}/commands")
	CommandResponse createCommand(@Param("deviceId") String deviceId, Command command);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET api/v1/deviceMgt/connectors/lora/connectivities")
	List<ConnectivityPlan> getConnectivityPlans();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET api/v1/deviceMgt/connectors/lora/profiles")
	List<String> getProfiles();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET api/v1/deviceMgt/groups")
	List<Group> getGroups();
}
