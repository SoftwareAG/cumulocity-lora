package lora.ns.objenious.rest;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.validation.annotation.Validated;

/**
 * Ref
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)

public class Ref   {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("link")
  private String link = null;

  public Ref id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * identifier
   * @return id
  **/


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Ref link(String link) {
    this.link = link;
    return this;
  }

  /**
   * URL of ressource
   * @return link
  **/


  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Ref ref = (Ref) o;
    return Objects.equals(this.id, ref.id) &&
        Objects.equals(this.link, ref.link);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Ref {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
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

