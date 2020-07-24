package lora.ns.connector;

import java.math.BigDecimal;

public class PropertyDescription {
	private String name;
	private String label;
	private boolean required;
	private String defaultValue;
	private String url;
	private BigDecimal min;
	private BigDecimal max;
	private Integer minLength;
	private Integer maxLength;
	private String regExp;
	private boolean encrypted;
	
	public enum PropertyType {
		TEXT, PASSWORD, INTEGER, NUMBER, DATETIME, BOOLEAN, LIST;
	}
	
	private PropertyType type;

	public PropertyDescription(String name, String label, boolean required, String defaultValue, String url,
			BigDecimal min, BigDecimal max, Integer minLength, Integer maxLength, String regExp, PropertyType type, boolean encrypted) {
		super();
		this.name = name;
		this.label = label;
		this.required = required;
		this.defaultValue = defaultValue;
		this.url = url;
		this.min = min;
		this.max = max;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.regExp = regExp;
		this.type = type;
		this.encrypted = encrypted;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public BigDecimal getMin() {
		return min;
	}

	public void setMin(BigDecimal min) {
		this.min = min;
	}

	public BigDecimal getMax() {
		return max;
	}

	public void setMax(BigDecimal max) {
		this.max = max;
	}

	public Integer getMinLength() {
		return minLength;
	}

	public void setMinLength(Integer minLength) {
		this.minLength = minLength;
	}

	public Integer getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(Integer maxLength) {
		this.maxLength = maxLength;
	}

	public String getRegExp() {
		return regExp;
	}

	public void setRegExp(String regExp) {
		this.regExp = regExp;
	}

	public PropertyType getType() {
		return type;
	}

	public void setType(PropertyType type) {
		this.type = type;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public boolean isEncrypted() {
		return encrypted;
	}

	public void setEncrypted(boolean encrypted) {
		this.encrypted = encrypted;
	}
}
