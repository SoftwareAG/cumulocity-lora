package lora.ns.connector;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.With;

@With
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PropertyDescription {
	private String name;
	private String label;
	private boolean required = false;
	private String defaultValue;
	private String url;
	private BigDecimal min;
	private BigDecimal max;
	private Integer minLength;
	private Integer maxLength;
	private String pattern;
	
	public enum PropertyType {
		TEXT, PASSWORD, INTEGER, NUMBER, DATETIME, BOOLEAN, LIST;
	}
	
	private PropertyType type;
	private boolean encrypted = false;

	public static PropertyDescription text(String name, String label, boolean required) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.TEXT).withRequired(required);
	}

	public static PropertyDescription integer(String name, String label, boolean required) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.INTEGER).withRequired(required);
	}

	public static PropertyDescription password(String name, String label) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.PASSWORD).withRequired(true).withEncrypted(true);
	}

	public static PropertyDescription number(String name, String label, boolean required) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.NUMBER).withRequired(required);
	}

	public static PropertyDescription list(String name, String label, String url, boolean required) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.LIST).withUrl(url).withRequired(required);
	}

	public static PropertyDescription bool(String name, String label) {
		return new PropertyDescription().withName(name).withLabel(label).withType(PropertyType.BOOLEAN).withRequired(false);
	}
}
