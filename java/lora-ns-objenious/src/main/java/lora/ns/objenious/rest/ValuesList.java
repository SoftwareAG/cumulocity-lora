package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * ValuesList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class ValuesList {
  @JsonProperty("values")
  private List<Values> values = null;

  @JsonProperty("start_exclusive")
  private String startExclusive = null;

  public ValuesList values(List<Values> values) {
    this.values = values;
    return this;
  }

  public ValuesList addValuesItem(Values valuesItem) {
    if (this.values == null) {
      this.values = new ArrayList<Values>();
    }
    this.values.add(valuesItem);
    return this;
  }

  /**
   * Get values
   * 
   * @return values
   **/

  public List<Values> getValues() {
    return values;
  }

  public void setValues(List<Values> values) {
    this.values = values;
  }

  public ValuesList startExclusive(String startExclusive) {
    this.startExclusive = startExclusive;
    return this;
  }

  /**
   * the start_exclusive value to be used for the next page
   * 
   * @return startExclusive
   **/

  public String getStartExclusive() {
    return startExclusive;
  }

  public void setStartExclusive(String startExclusive) {
    this.startExclusive = startExclusive;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ValuesList valuesList = (ValuesList) o;
    return Objects.equals(this.values, valuesList.values) &&
        Objects.equals(this.startExclusive, valuesList.startExclusive);
  }

  @Override
  public int hashCode() {
    return Objects.hash(values, startExclusive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ValuesList {\n");

    sb.append("    values: ").append(toIndentedString(values)).append("\n");
    sb.append("    startExclusive: ").append(toIndentedString(startExclusive)).append("\n");
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
