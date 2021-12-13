package lora.codec.uplink;

import com.google.common.io.BaseEncoding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lora.ns.DeviceData;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Decode {
	private String deveui;
	private String model;
	private int fPort;
	private String payload;
	private Long updateTime;

	public Decode(DeviceData event) {
		super();
		this.deveui = event.getDevEui();
		this.model = event.getModel();
		this.fPort = event.getfPort();
		this.payload = BaseEncoding.base16().encode(event.getPayload());
		this.updateTime = event.getDateTime();
	}
}
