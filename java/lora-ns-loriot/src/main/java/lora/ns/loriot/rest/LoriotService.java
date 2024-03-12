package lora.ns.loriot.rest;

import java.util.List;

import feign.Param;
import feign.RequestLine;
import lora.ns.loriot.rest.model.AbpDeviceRegistration;
import lora.ns.loriot.rest.model.Apps;
import lora.ns.loriot.rest.model.Device;
import lora.ns.loriot.rest.model.HttpPush;
import lora.ns.loriot.rest.model.OtaaDeviceRegistration;
import lora.ns.loriot.rest.model.Output;

public interface LoriotService {
	@RequestLine("GET 1/nwk/apps")
	Apps getApps();

	@RequestLine("GET 1/nwk/app/{appid}/device/{deveui}")
	Device getDevice(@Param("appid") String appid, @Param("deveui") String deveui);

	@RequestLine("DELETE 1/nwk/app/{appid}/device/{deveui}")
	Device removeDevice(@Param("appid") String appid, @Param("deveui") String deveui);

	@RequestLine("POST 1/nwk/app/{appid}/devices/otaa")
	Device createDeviceOtaa(@Param("appid") String appid, OtaaDeviceRegistration otaaDeviceRegistration);

	@RequestLine("POST 1/nwk/app/{appid}/devices/abp")
	Device createDeviceAbp(@Param("appid") String appid, AbpDeviceRegistration abpDeviceRegistration);

	@RequestLine("GET 1/nwk/app/{appid}/devices")
	List<Device> getDevices(@Param("appid") String appid);

	@RequestLine("GET 1/nwk/app/{appid}/outputs")
	List<Output> getOutputs(@Param("appid") String appid);

	@RequestLine("GET 1/nwk/app/{appid}/token")
	List<String> getTokens(@Param("appid") String appid);

	@RequestLine("POST 1/nwk/app/{appid}/outputs/httppush")
	String createHttpPush(@Param("appid") String appid, HttpPush httpPush);

	@RequestLine("DELETE 1/nwk/app/{appid}/outputs/{index}")
	String deleteOutput(@Param("appid") String appid, @Param("index") int index);
}
