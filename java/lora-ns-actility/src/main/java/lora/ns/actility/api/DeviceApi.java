package lora.ns.actility.api;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import lora.ns.actility.api.model.device.Device;
import lora.ns.actility.api.model.device.DeviceProfiles;

public interface DeviceApi {
  @RequestLine("GET /subscriptions/mine/devices/{deviceUid}")
  @Headers({ "Accept: application/json", })
  Device getDevice(@Param("deviceUid") String deviceUid);

  @RequestLine("POST /subscriptions/mine/devices")
  @Headers({ "Accept: application/json", "Content-Type: application/json" })
  Device createDevice(Device device);

  @RequestLine("DELETE /subscriptions/mine/devices/{deviceUid}")
  @Headers({ "Accept: application/json", })
  Device deleteDevice(@Param("deviceUid") String deviceUid);

  @RequestLine("GET /subscriptions/mine/devicesProfiles?pageIndex={pageIndex}")
  @Headers({ "Accept: application/json", })
  DeviceProfiles getDeviceProfiles(@Param("pageIndex") Integer pageIndex);
}
