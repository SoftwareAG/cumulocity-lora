package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DownlinkList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class DownlinkList {
  @JsonProperty("downlinks")
  private List<Downlink> downlinks = null;

  @JsonProperty("start_exclusive")
  private String startExclusive = null;

  public DownlinkList downlinks(List<Downlink> downlinks) {
    this.downlinks = downlinks;
    return this;
  }

  public DownlinkList addDownlinksItem(Downlink downlinksItem) {
    if (this.downlinks == null) {
      this.downlinks = new ArrayList<Downlink>();
    }
    this.downlinks.add(downlinksItem);
    return this;
  }

  /**
   * Get downlinks
   * 
   * @return downlinks
   **/

  public List<Downlink> getDownlinks() {
    return downlinks;
  }

  public void setDownlinks(List<Downlink> downlinks) {
    this.downlinks = downlinks;
  }

  public DownlinkList startExclusive(String startExclusive) {
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
    DownlinkList downlinkList = (DownlinkList) o;
    return Objects.equals(this.downlinks, downlinkList.downlinks) &&
        Objects.equals(this.startExclusive, downlinkList.startExclusive);
  }

  @Override
  public int hashCode() {
    return Objects.hash(downlinks, startExclusive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DownlinkList {\n");

    sb.append("    downlinks: ").append(toIndentedString(downlinks)).append("\n");
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
