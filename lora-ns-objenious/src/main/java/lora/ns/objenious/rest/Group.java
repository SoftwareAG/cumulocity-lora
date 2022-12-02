package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Group
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)

public class Group {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("link")
  private String link = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("parent")
  private Ref parent = null;

  public Group id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Group identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Group link(String link) {
    this.link = link;
    return this;
  }

  /**
   * URL of ressource
   * 
   * @return link
   **/

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public Group name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Group name
   * 
   * @return name
   **/

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Group parent(Ref parent) {
    this.parent = parent;
    return this;
  }

  /**
   * Get parent
   * 
   * @return parent
   **/

  public Ref getParent() {
    return parent;
  }

  public void setParent(Ref parent) {
    this.parent = parent;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Group group = (Group) o;
    return Objects.equals(this.id, group.id) &&
        Objects.equals(this.link, group.link) &&
        Objects.equals(this.name, group.name) &&
        Objects.equals(this.parent, group.parent);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link, name, parent);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Group {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    parent: ").append(toIndentedString(parent)).append("\n");
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
