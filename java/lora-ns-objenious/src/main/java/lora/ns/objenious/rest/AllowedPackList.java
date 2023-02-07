package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * AllowedPackList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class AllowedPackList {
  @JsonProperty("packs")
  private List<Pack> packs = null;

  public AllowedPackList packs(List<Pack> packs) {
    this.packs = packs;
    return this;
  }

  public AllowedPackList addPacksItem(Pack packsItem) {
    if (this.packs == null) {
      this.packs = new ArrayList<Pack>();
    }
    this.packs.add(packsItem);
    return this;
  }

  /**
   * Get packs
   * 
   * @return packs
   **/

  public List<Pack> getPacks() {
    return packs;
  }

  public void setPacks(List<Pack> packs) {
    this.packs = packs;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AllowedPackList allowedPackList = (AllowedPackList) o;
    return Objects.equals(this.packs, allowedPackList.packs);
  }

  @Override
  public int hashCode() {
    return Objects.hash(packs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AllowedPackList {\n");

    sb.append("    packs: ").append(toIndentedString(packs)).append("\n");
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
