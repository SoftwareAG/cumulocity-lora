package lora.codec.downlink;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Encode {
	private String devEui;
	private String operation;
	private String model;
}