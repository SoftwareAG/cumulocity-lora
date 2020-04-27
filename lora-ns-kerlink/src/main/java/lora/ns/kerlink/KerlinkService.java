package lora.ns.kerlink;

import lora.ns.kerlink.dto.EndDeviceDto;
import lora.ns.kerlink.dto.PaginatedDto;
import retrofit2.Call;
import retrofit2.http.GET;

public interface KerlinkService {
	@GET("devices")
	Call<PaginatedDto<EndDeviceDto>> getDevices();
	
	
}
