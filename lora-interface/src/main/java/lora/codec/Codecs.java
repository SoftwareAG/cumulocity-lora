package lora.codec;

import java.util.HashMap;
import java.util.Map;

import org.svenson.JSONTypeHint;

public class Codecs {
	private Map<String, DeviceCodecRepresentation> codecs = new HashMap<>();
	private Map<String, String> devices = new HashMap<>();

	@JSONTypeHint(DeviceCodecRepresentation.class)
	public Map<String, DeviceCodecRepresentation> getCodecs() {
		return codecs;
	}

	public void setCodecs(Map<String, DeviceCodecRepresentation> codecs) {
		this.codecs = codecs;
	}

	public Map<String, String> getDevices() {
		return devices;
	}

	public void setDevices(Map<String, String> devices) {
		this.devices = devices;
	}
}
