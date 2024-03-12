package lora.ns.actility.rest;

import java.util.List;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.actility.rest.model.BaseStation;
import lora.ns.actility.rest.model.BaseStationProfile;
import lora.ns.actility.rest.model.Connection;
import lora.ns.actility.rest.model.ConnectionRequest;
import lora.ns.actility.rest.model.DeviceCreate;
import lora.ns.actility.rest.model.DeviceProfile;
import lora.ns.actility.rest.model.DownlinkMessage;
import lora.ns.actility.rest.model.RFRegion;
import lora.ns.actility.rest.model.Route;

public interface ActilityCoreService {
	@Headers("Accept: application/json")
	@RequestLine("GET connections")
	List<Connection> getConnections();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST connections")
	Connection createConnection(ConnectionRequest connectionRequest);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("PUT connections/{connectionId}")
	Connection updateConnection(@Param("connectionId") String connectionId, ConnectionRequest connectionRequest);

	@RequestLine("DELETE connections/{connectionId}")
	void deleteConnection(@Param("connectionId") String connectionId);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET routes")
	List<Route> getRoutes();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("GET routes/{routeRef}")
	Route getRoute(@Param("routeRef") String routeRef);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST routes")
	Route createRoute(Route route);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("PUT routes/{routeRef}")
	Route updateRoute(@Param("routeRef") String routeRef, Route route);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST devices")
	DeviceCreate createDevice(DeviceCreate device);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("PUT devices/{deviceRef}")
	DeviceCreate updateDevice(@Param("deviceRef") String deviceRef, DeviceCreate device);

	@Headers("Accept: application/json")
	@RequestLine("GET devices")
	List<DeviceCreate> getDevices();

	@Headers("Accept: application/json")
	@RequestLine("GET devices?deviceEUI={deviceEUI}")
	List<DeviceCreate> getDeviceByEUI(@Param("deviceEUI") String devEUI);

	@Headers("Accept: application/json")
	@RequestLine("GET device/{deviceRef}")
	DeviceCreate getDevice(@Param("deviceRef") String deviceRef);

	@RequestLine("DELETE devices/{deviceRef}")
	void deleteDevice(@Param("deviceRef") String deviceRef);

	@Headers("Accept: application/json")
	@RequestLine("GET deviceProfiles")
	List<DeviceProfile> getDeviceProfiles();

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST devices/{devEUI}/downlinkMessages")
	DownlinkMessage sendDownlink(@Param("devEUI") String devEUI, DownlinkMessage downlinkMessage);

	@Headers("Accept: application/json")
	@RequestLine("GET baseStations")
	List<BaseStation> getBaseStations();

	@Headers("Accept: application/json")
	@RequestLine("GET baseStations/{baseStationRef}")
	BaseStation getBaseStation(@Param("baseStationRef") String baseStationRef);

	@Headers({ "Content-Type: application/json", "Accept: application/json" })
	@RequestLine("POST baseStations")
	BaseStation createBaseStation(BaseStation baseStation);

	@RequestLine("DELETE baseStations/{baseStationRef}")
	void deleteBaseStation(@Param("baseStationRef") String baseStationRef);

	@Headers("Accept: application/json")
	@RequestLine("GET baseStationProfiles")
	List<BaseStationProfile> getBaseStationProfiles();

	@Headers("Accept: application/json")
	@RequestLine("GET rfRegions")
	List<RFRegion> getRFRegions();
}
