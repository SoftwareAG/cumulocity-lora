package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * AlertList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class AlertList {
  @JsonProperty("alerts")
  private List<Alert> alerts = null;

  @JsonProperty("start_exclusive")
  private String startExclusive = null;

  public AlertList alerts(List<Alert> alerts) {
    this.alerts = alerts;
    return this;
  }

  public AlertList addAlertsItem(Alert alertsItem) {
    if (this.alerts == null) {
      this.alerts = new ArrayList<Alert>();
    }
    this.alerts.add(alertsItem);
    return this;
  }

  /**
   * Get alerts
   * 
   * @return alerts
   **/

  public List<Alert> getAlerts() {
    return alerts;
  }

  public void setAlerts(List<Alert> alerts) {
    this.alerts = alerts;
  }

  public AlertList startExclusive(String startExclusive) {
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
    AlertList alertList = (AlertList) o;
    return Objects.equals(this.alerts, alertList.alerts) &&
        Objects.equals(this.startExclusive, alertList.startExclusive);
  }

  @Override
  public int hashCode() {
    return Objects.hash(alerts, startExclusive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AlertList {\n");

    sb.append("    alerts: ").append(toIndentedString(alerts)).append("\n");
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
