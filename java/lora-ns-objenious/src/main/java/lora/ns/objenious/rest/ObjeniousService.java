package lora.ns.objenious.rest;

import java.util.List;

import feign.Param;
import feign.RequestLine;

public interface ObjeniousService {
	@RequestLine("GET devices")
	List<Device> getDevices();

	@RequestLine("GET devices/lora:{devEui}")
	Device getDevice(@Param("devEui") String devEui);

	@RequestLine("POST devices/lora:{devEui}/deprovision")
	ObjectDeleted deprovisionDevice(@Param("devEui") String devEui);

	@RequestLine("POST devices/lora:{devEui}/reactivate")
	Device reactivateDevice(@Param("devEui") String devEui);

	@RequestLine("POST devices/lora:{devEui}/downlinks")
	DownlinkResponse sendCommand(@Param("devEui") String devEui, DownlinkCreate command);

	@RequestLine("POST scenarios/routing")
	ScenarioRouting createHttpRouting(ScenarioRoutingCreateUpdate routing);

	@RequestLine("GET scenarios/routing")
	List<ScenarioRoutingReader> getRouting();

	@RequestLine("DELETE scenarios/routing/{id}")
	String deleteRouting(@Param("id") Integer id);

	@RequestLine("POST devices")
	Device createDevice(@Param DeviceCreate device);

	@RequestLine("GET profiles")
	List<Profile> getProfiles();

	@RequestLine("GET profiles/{id}")
	Profile getProfile(@Param("id") Integer id);

	@RequestLine("GET groups")
	List<Group> getGroups();

	@RequestLine("GET gateways")
	List<Gateway> getGateways();

	@RequestLine("GET gateways/{id}")
	List<Gateway> getGateway(@Param("id") String id);
}
