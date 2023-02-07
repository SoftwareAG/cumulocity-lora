package lora.ns.device;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Properties;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.google.common.io.BaseEncoding;

import lombok.Data;
import lora.common.ValidationResult;
import lora.common.Validator;

@Data
public class DeviceProvisioning implements Validator {
	private String name;
	private String devEUI;
	private String type;

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

	private ProvisioningMode provisioningMode = ProvisioningMode.OTAA;
	// OTAA
	private String appEUI;
	private String appKey;
	// ABP
	private String appSKey;
	private String devAddr;
	private String nwkSKey;

	private String codec;
	private String model;
	private boolean useGatewayPosition = true;
	private BigDecimal lat;
	private BigDecimal lng;

	private Properties additionalProperties;

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

	private DeviceClass deviceClass = DeviceClass.C;

	public ValidationResult validate() {
		boolean result = true;
		String reason = "";

		if (devEUI == null || devEUI.isBlank()) {
			result = false;
			reason += "\ndevEUI is required.";
		}
		if (appEUI == null || appEUI.isBlank()) {
			SecureRandom secureRandom = new SecureRandom();
			byte[] bytes = new byte[8];
			secureRandom.nextBytes(bytes);
			appEUI = BaseEncoding.base16().encode(bytes);
		}
		switch (provisioningMode) {
			case OTAA:
				if (appKey == null || appKey.isBlank()) {
					SecureRandom secureRandom = new SecureRandom();
					byte[] bytes = new byte[16];
					secureRandom.nextBytes(bytes);
					appKey = BaseEncoding.base16().encode(bytes);
				}
				break;
			case ABP:
				if (appSKey == null || appSKey.isBlank()) {
					result = false;
					reason += "\nappSKey is required for ABP registration.";
				}
				if (nwkSKey == null || nwkSKey.isBlank()) {
					result = false;
					reason += "\nnwkSKey is required for ABP registration.";
				}
				break;
		}

		return new ValidationResult(result, reason);
	}
}
