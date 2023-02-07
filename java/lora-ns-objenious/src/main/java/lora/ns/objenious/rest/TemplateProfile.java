package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * TemplateProfile
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class TemplateProfile {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("brand")
  private String brand = null;

  @JsonProperty("model")
  private String model = null;

  @JsonProperty("firmware_version")
  private String firmwareVersion = null;

  @JsonProperty("hardware_version")
  private String hardwareVersion = null;

  @JsonProperty("class")
  private String propertyClass = null;

  @JsonProperty("attributes")
  private AttributeList attributes = null;

  @JsonProperty("properties")
  private CustomFields properties = null;

  public TemplateProfile id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Template profile identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public TemplateProfile name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Template profile name
   * 
   * @return name
   **/

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public TemplateProfile brand(String brand) {
    this.brand = brand;
    return this;
  }

  /**
   * Template profile brand
   * 
   * @return brand
   **/

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public TemplateProfile model(String model) {
    this.model = model;
    return this;
  }

  /**
   * Template profile model
   * 
   * @return model
   **/

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public TemplateProfile firmwareVersion(String firmwareVersion) {
    this.firmwareVersion = firmwareVersion;
    return this;
  }

  /**
   * Template profile firmware version
   * 
   * @return firmwareVersion
   **/

  public String getFirmwareVersion() {
    return firmwareVersion;
  }

  public void setFirmwareVersion(String firmwareVersion) {
    this.firmwareVersion = firmwareVersion;
  }

  public TemplateProfile hardwareVersion(String hardwareVersion) {
    this.hardwareVersion = hardwareVersion;
    return this;
  }

  /**
   * Template profile hardware version
   * 
   * @return hardwareVersion
   **/

  public String getHardwareVersion() {
    return hardwareVersion;
  }

  public void setHardwareVersion(String hardwareVersion) {
    this.hardwareVersion = hardwareVersion;
  }

  public TemplateProfile propertyClass(String propertyClass) {
    this.propertyClass = propertyClass;
    return this;
  }

  /**
   * Template profile class
   * 
   * @return propertyClass
   **/

  public String getPropertyClass() {
    return propertyClass;
  }

  public void setPropertyClass(String propertyClass) {
    this.propertyClass = propertyClass;
  }

  public TemplateProfile attributes(AttributeList attributes) {
    this.attributes = attributes;
    return this;
  }

  /**
   * Get attributes
   * 
   * @return attributes
   **/

  public AttributeList getAttributes() {
    return attributes;
  }

  public void setAttributes(AttributeList attributes) {
    this.attributes = attributes;
  }

  public TemplateProfile properties(CustomFields properties) {
    this.properties = properties;
    return this;
  }

  /**
   * Get properties
   * 
   * @return properties
   **/

  public CustomFields getProperties() {
    return properties;
  }

  public void setProperties(CustomFields properties) {
    this.properties = properties;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TemplateProfile templateProfile = (TemplateProfile) o;
    return Objects.equals(this.id, templateProfile.id) &&
        Objects.equals(this.name, templateProfile.name) &&
        Objects.equals(this.brand, templateProfile.brand) &&
        Objects.equals(this.model, templateProfile.model) &&
        Objects.equals(this.firmwareVersion, templateProfile.firmwareVersion) &&
        Objects.equals(this.hardwareVersion, templateProfile.hardwareVersion) &&
        Objects.equals(this.propertyClass, templateProfile.propertyClass) &&
        Objects.equals(this.attributes, templateProfile.attributes) &&
        Objects.equals(this.properties, templateProfile.properties);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, brand, model, firmwareVersion, hardwareVersion, propertyClass, attributes,
        properties);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TemplateProfile {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    brand: ").append(toIndentedString(brand)).append("\n");
    sb.append("    model: ").append(toIndentedString(model)).append("\n");
    sb.append("    firmwareVersion: ").append(toIndentedString(firmwareVersion)).append("\n");
    sb.append("    hardwareVersion: ").append(toIndentedString(hardwareVersion)).append("\n");
    sb.append("    propertyClass: ").append(toIndentedString(propertyClass)).append("\n");
    sb.append("    attributes: ").append(toIndentedString(attributes)).append("\n");
    sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
