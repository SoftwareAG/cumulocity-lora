package lora.ns.kerlink.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EndDeviceDto {
	private String name;
	private String devEui;
	private String classType;
	private String devAddr;
	private String appEui;
	private String appKey;
	private ClusterDto cluster;

	public ClusterDto getCluster() {
		return cluster;
	}

	public void setCluster(ClusterDto cluster) {
		this.cluster = cluster;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDevEui() {
		return devEui;
	}

	public void setDevEui(String devEui) {
		this.devEui = devEui;
	}

	public String getClassType() {
		return classType;
	}

	public void setClassType(String classType) {
		this.classType = classType;
	}

	public String getDevAddr() {
		return devAddr;
	}

	public void setDevAddr(String devAddr) {
		this.devAddr = devAddr;
	}

	public String getAppEui() {
		return appEui;
	}

	public void setAppEui(String appEui) {
		this.appEui = appEui;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}
	
}
