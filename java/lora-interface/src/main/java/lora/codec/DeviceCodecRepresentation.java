package lora.codec;

import lora.common.Component;

public class DeviceCodecRepresentation implements Component {
	
	private String id;
	private String name;
	private String version;
	private String url;
	
	public DeviceCodecRepresentation() {}
	
	public DeviceCodecRepresentation(Component deviceCodec) {
		this.id = deviceCodec.getId();
		this.name = deviceCodec.getName();
		this.version = deviceCodec.getVersion();
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public String getVersion() {
		return version;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
