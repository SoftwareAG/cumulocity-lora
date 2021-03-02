package lora.ns;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lora.common.ValidationResult;
import lora.common.Validator;

public class DeviceProvisioning implements Validator {
	private String name;
	private String devEUI;

	public enum ProvisioningMode {
		OTAA("OTAA"), ABP("ABP");

		private String mode;

		ProvisioningMode(String mode) {
			this.mode = mode;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(mode);
		}

		@JsonCreator
		public static ProvisioningMode fromValue(String text) {
			for (ProvisioningMode b : ProvisioningMode.values()) {
				if (String.valueOf(b.mode).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	private ProvisioningMode provisioningMode;
	// OTAA
	private String appEUI;
	private String appKey;
	// ABP
	private String appSKey;
	private String devAddr;
	private String nwkSKey;

	private String codec;
	private String model;
	private BigDecimal lat;
	private BigDecimal lng;

	public enum DeviceClass {
		A("A"), B("B"), C("C");

		private String mode;

		DeviceClass(String mode) {
			this.mode = mode;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(mode);
		}

		@JsonCreator
		public static DeviceClass fromValue(String text) {
			for (DeviceClass b : DeviceClass.values()) {
				if (String.valueOf(b.mode).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}
	private DeviceClass deviceClass;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDevEUI() {
		return devEUI;
	}

	public void setDevEUI(String devEUI) {
		this.devEUI = devEUI;
	}

	public String getAppEUI() {
		return appEUI;
	}

	public void setAppEUI(String appEUI) {
		this.appEUI = appEUI;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public BigDecimal getLat() {
		return lat;
	}

	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}

	public BigDecimal getLng() {
		return lng;
	}

	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}

	public String getCodec() {
		return codec;
	}

	public void setCodec(String codec) {
		this.codec = codec;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public DeviceClass getDeviceClass() {
		return deviceClass;
	}

	public void setDeviceClass(DeviceClass deviceClass) {
		this.deviceClass = deviceClass;
	}

	public String getAppSKey() {
		return appSKey;
	}

	public void setAppSKey(String appSKey) {
		this.appSKey = appSKey;
	}

	public String getDevAddr() {
		return devAddr;
	}

	public void setDevAddr(String devAddr) {
		this.devAddr = devAddr;
	}

	public String getNwkSKey() {
		return nwkSKey;
	}

	public void setNwkSKey(String nwkSKey) {
		this.nwkSKey = nwkSKey;
	}

	public ProvisioningMode getProvisioningMode() {
		return provisioningMode;
	}

	public void setProvisioningMode(ProvisioningMode provisioningMode) {
		this.provisioningMode = provisioningMode;
	}

	public ValidationResult validate() {
		boolean result = true;
		String reason = "";

		if (devEUI == null || devEUI.isBlank() || devEUI.isEmpty()) {
			result = false;
			reason += "\ndevEUI is required.";
		}
		if (appEUI == null || appEUI.isBlank() || appEUI.isEmpty()) {
			result = false;
			reason += "\nappEUI is required.";
		}
		switch(provisioningMode) {
			case OTAA:
			if (appKey == null || appKey.isBlank() || appKey.isEmpty()) {
				result = false;
				reason += "\nappKey is required for OTAA registration.";
			}
			break;
			case ABP:
			if (appSKey == null || appSKey.isBlank() || appSKey.isEmpty()) {
				result = false;
				reason += "\nappSKey is required for ABP registration.";
			}
			if (nwkSKey == null || nwkSKey.isBlank() || nwkSKey.isEmpty()) {
				result = false;
				reason += "\nnwkSKey is required for ABP registration.";
			}
			break;
		}

		return new ValidationResult(result, reason);
	}
}
