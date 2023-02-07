package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * CurrentStateList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class CurrentStateList {
  @JsonProperty("states")
  private List<CurrentState> states = null;

  public CurrentStateList states(List<CurrentState> states) {
    this.states = states;
    return this;
  }

  public CurrentStateList addStatesItem(CurrentState statesItem) {
    if (this.states == null) {
      this.states = new ArrayList<CurrentState>();
    }
    this.states.add(statesItem);
    return this;
  }

  /**
   * Get states
   * 
   * @return states
   **/

  public List<CurrentState> getStates() {
    return states;
  }

  public void setStates(List<CurrentState> states) {
    this.states = states;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CurrentStateList currentStateList = (CurrentStateList) o;
    return Objects.equals(this.states, currentStateList.states);
  }

  @Override
  public int hashCode() {
    return Objects.hash(states);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CurrentStateList {\n");

    sb.append("    states: ").append(toIndentedString(states)).append("\n");
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
