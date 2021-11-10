/*
 * ThingPark Enterprise - Dx-Core API
 * API providing configuration and provisioning features for ThingPark Enterprise.
 *
 * OpenAPI spec version: 1.8.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package lora.ns.actility.rest.model;

import java.util.Objects;

/**
 * Resource representing a base station alarm.
 */
public class BaseStationAlarm extends Alarm {
  private String baseStationRef = null;

  private Integer baseStationAlarmTypeId = null;

  private String baseStationAlarmObjectId = null;

  public BaseStationAlarm baseStationRef(String baseStationRef) {
    this.baseStationRef = baseStationRef;
    return this;
  }

   /**
   * Ref of the base station related to the alarm.
   * @return baseStationRef
  **/
  public String getBaseStationRef() {
    return baseStationRef;
  }

  public void setBaseStationRef(String baseStationRef) {
    this.baseStationRef = baseStationRef;
  }

  public BaseStationAlarm baseStationAlarmTypeId(Integer baseStationAlarmTypeId) {
    this.baseStationAlarmTypeId = baseStationAlarmTypeId;
    return this;
  }

   /**
   * Id of the base station alarm type. Refer to the list of ThingPark base station alarm types to get the corresponding label.
   * @return baseStationAlarmTypeId
  **/
  public Integer getBaseStationAlarmTypeId() {
    return baseStationAlarmTypeId;
  }

  public void setBaseStationAlarmTypeId(Integer baseStationAlarmTypeId) {
    this.baseStationAlarmTypeId = baseStationAlarmTypeId;
  }

  public BaseStationAlarm baseStationAlarmObjectId(String baseStationAlarmObjectId) {
    this.baseStationAlarmObjectId = baseStationAlarmObjectId;
    return this;
  }

   /**
   * Id of the base station alarm object. Refer to the list of ThingPark base station alarm objects to get the corresponding label.
   * @return baseStationAlarmObjectId
  **/
  public String getBaseStationAlarmObjectId() {
    return baseStationAlarmObjectId;
  }

  public void setBaseStationAlarmObjectId(String baseStationAlarmObjectId) {
    this.baseStationAlarmObjectId = baseStationAlarmObjectId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseStationAlarm baseStationAlarm = (BaseStationAlarm) o;
    return Objects.equals(this.baseStationRef, baseStationAlarm.baseStationRef) &&
        Objects.equals(this.baseStationAlarmTypeId, baseStationAlarm.baseStationAlarmTypeId) &&
        Objects.equals(this.baseStationAlarmObjectId, baseStationAlarm.baseStationAlarmObjectId) &&
        super.equals(o);
  }

  @Override
  public int hashCode() {
    return Objects.hash(baseStationRef, baseStationAlarmTypeId, baseStationAlarmObjectId, super.hashCode());
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseStationAlarm {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    baseStationRef: ").append(toIndentedString(baseStationRef)).append("\n");
    sb.append("    baseStationAlarmTypeId: ").append(toIndentedString(baseStationAlarmTypeId)).append("\n");
    sb.append("    baseStationAlarmObjectId: ").append(toIndentedString(baseStationAlarmObjectId)).append("\n");
    sb.append("}");
    return sb.toString();
  }
}
