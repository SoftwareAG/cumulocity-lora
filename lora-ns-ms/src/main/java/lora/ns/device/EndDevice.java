package lora.ns.device;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EndDevice {
	private String devEui;
	private String name;
	private String deviceClass;
}
