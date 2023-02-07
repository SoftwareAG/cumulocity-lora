package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * GroupUpdate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class GroupUpdate   {
  @JsonProperty("name")
  private String name = null;

  @JsonProperty("parent_group_id")
  private Integer parentGroupId = null;

  public GroupUpdate name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Group name
   * @return name
  **/


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public GroupUpdate parentGroupId(Integer parentGroupId) {
    this.parentGroupId = parentGroupId;
    return this;
  }

  /**
   * Parent group identifier
   * @return parentGroupId
  **/


  public Integer getParentGroupId() {
    return parentGroupId;
  }

  public void setParentGroupId(Integer parentGroupId) {
    this.parentGroupId = parentGroupId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GroupUpdate groupUpdate = (GroupUpdate) o;
    return Objects.equals(this.name, groupUpdate.name) &&
        Objects.equals(this.parentGroupId, groupUpdate.parentGroupId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, parentGroupId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GroupUpdate {\n");
    
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    parentGroupId: ").append(toIndentedString(parentGroupId)).append("\n");
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

