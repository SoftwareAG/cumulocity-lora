package lora.ns.objenious.rest;

import java.util.HashMap;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * User defined device properties. Additional key/value pairs can be present, based on device configuration. Key and values will be strings. 
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class PropertiesCreate extends HashMap<String, String>  {
  @JsonProperty("external_id")
  private String externalId = null;

  public PropertiesCreate externalId(String externalId) {
    this.externalId = externalId;
    return this;
  }

  /**
   * the id on the client platform
   * @return externalId
  **/


  public String getExternalId() {
    return externalId;
  }

  public void setExternalId(String externalId) {
    this.externalId = externalId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PropertiesCreate propertiesCreate = (PropertiesCreate) o;
    return Objects.equals(this.externalId, propertiesCreate.externalId) &&
        super.equals(o);
  }

  @Override
  public int hashCode() {
    return Objects.hash(externalId, super.hashCode());
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PropertiesCreate {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    externalId: ").append(toIndentedString(externalId)).append("\n");
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

