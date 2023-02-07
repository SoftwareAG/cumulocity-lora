package lora.ns.kerlink.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ClusterDto {
	private String name;
	private Integer id;
	private PushConfigurationDto pushConfiguration;
	private Boolean pushEnabled;
	private Boolean hexa;
	private Boolean geolocEnabled;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public PushConfigurationDto getPushConfiguration() {
		return pushConfiguration;
	}
	public void setPushConfiguration(PushConfigurationDto pushConfiguration) {
		this.pushConfiguration = pushConfiguration;
	}
	public Boolean getPushEnabled() {
		return pushEnabled;
	}
	public void setPushEnabled(Boolean pushEnabled) {
		this.pushEnabled = pushEnabled;
	}
	public Boolean getHexa() {
		return hexa;
	}
	public void setHexa(Boolean hexa) {
		this.hexa = hexa;
	}
	public Boolean getGeolocEnabled() {
		return geolocEnabled;
	}
	public void setGeolocEnabled(Boolean geolocEnabled) {
		this.geolocEnabled = geolocEnabled;
	}
}
