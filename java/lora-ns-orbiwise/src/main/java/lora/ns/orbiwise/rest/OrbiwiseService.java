package lora.ns.orbiwise.rest;

import java.util.List;

import feign.Param;
import feign.RequestLine;
import lora.ns.orbiwise.rest.model.Device;
import lora.ns.orbiwise.rest.model.DeviceCreate;
import lora.ns.orbiwise.rest.model.DownlinkResponse;
import lora.ns.orbiwise.rest.model.Pushmode;

public interface OrbiwiseService {
	@RequestLine("GET nodes")
	List<Device> getDevices();

	@RequestLine("GET nodes/{devEui}")
	Device getDevice(@Param("devEui") String devEui);

	@RequestLine("DELETE nodes/{devEui}")
	String deprovisionDevice(@Param("devEui") String devEui);

	@RequestLine("PUT nodes/{devEui}")
	String reactivateDevice(@Param("devEui") String devEui);

	@RequestLine("POST nodes")
	String createDevice(@Param DeviceCreate device);

	@RequestLine("POST nodes/{devEui}/payloads/dl?data_format=hex&port={port}")
	DownlinkResponse sendCommand(@Param("devEui") String devEui, @Param("port") int fport, String payload);

	@RequestLine("PUT pushmode/start")
	String createHttpRouting(Pushmode routing);

	@RequestLine("PUT pushmode/stop")
	String stopRouting();
}
