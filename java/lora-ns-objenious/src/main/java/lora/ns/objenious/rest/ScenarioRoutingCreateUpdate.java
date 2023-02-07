package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * ScenarioRoutingCreateUpdate
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonInclude(Include.NON_NULL)
public class ScenarioRoutingCreateUpdate {
  @JsonProperty("name")
  private String name = null;

  @JsonProperty("group_id")
  private Integer groupId = null;

  @JsonProperty("profile_id")
  private Integer profileId = null;

  @JsonProperty("enabled")
  private Boolean enabled = null;

  /**
   * Type of messages that are routed
   */
  public enum MessageTypeEnum {
    ALL("all"),

    UPLINK("uplink"),

    DOWNLINK("downlink");

    private String value;

    MessageTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static MessageTypeEnum fromValue(String text) {
      for (MessageTypeEnum b : MessageTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("message_type")
  private MessageTypeEnum messageType = null;

  /**
   * Format of the payload send in the body of the request
   */
  public enum FormatTypeEnum {
    MESSAGES("messages"),

    VALUES("values");

    private String value;

    FormatTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static FormatTypeEnum fromValue(String text) {
      for (FormatTypeEnum b : FormatTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("format_type")
  private FormatTypeEnum formatType = null;

  @JsonProperty("azure_eventhub")
  private RoutingAzureEventHub azureEventhub = null;

  @JsonProperty("azure_iothub")
  private RoutingAzureIotHub azureIothub = null;

  @JsonProperty("http")
  private RoutingHttp http = null;

  @JsonProperty("google_pubsub")
  private RoutingGooglePubSub googlePubsub = null;

  @JsonProperty("google_iotcore")
  private RoutingGoogleIotCore googleIotcore = null;

  @JsonProperty("aws_iotcore")
  private RoutingAwsIotCore awsIotcore = null;

  public ScenarioRoutingCreateUpdate name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Routing scenario name
   * 
   * @return name
   **/

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ScenarioRoutingCreateUpdate groupId(Integer groupId) {
    this.groupId = groupId;
    return this;
  }

  /**
   * Group identifier
   * 
   * @return groupId
   **/

  public Integer getGroupId() {
    return groupId;
  }

  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }

  public ScenarioRoutingCreateUpdate profileId(Integer profileId) {
    this.profileId = profileId;
    return this;
  }

  /**
   * Device profile identifier, If set to null, it concerns all profiles of the
   * group
   * 
   * @return profileId
   **/

  public Integer getProfileId() {
    return profileId;
  }

  public void setProfileId(Integer profileId) {
    this.profileId = profileId;
  }

  public ScenarioRoutingCreateUpdate enabled(Boolean enabled) {
    this.enabled = enabled;
    return this;
  }

  /**
   * If set to true, the scenario is active
   * 
   * @return enabled
   **/

  public Boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public ScenarioRoutingCreateUpdate messageType(MessageTypeEnum messageType) {
    this.messageType = messageType;
    return this;
  }

  /**
   * Type of messages that are routed
   * 
   * @return messageType
   **/

  public MessageTypeEnum getMessageType() {
    return messageType;
  }

  public void setMessageType(MessageTypeEnum messageType) {
    this.messageType = messageType;
  }

  public ScenarioRoutingCreateUpdate formatType(FormatTypeEnum formatType) {
    this.formatType = formatType;
    return this;
  }

  /**
   * Format of the payload send in the body of the request
   * 
   * @return formatType
   **/

  public FormatTypeEnum getFormatType() {
    return formatType;
  }

  public void setFormatType(FormatTypeEnum formatType) {
    this.formatType = formatType;
  }

  public ScenarioRoutingCreateUpdate azureEventhub(RoutingAzureEventHub azureEventhub) {
    this.azureEventhub = azureEventhub;
    return this;
  }

  /**
   * Get azureEventhub
   * 
   * @return azureEventhub
   **/

  public RoutingAzureEventHub getAzureEventhub() {
    return azureEventhub;
  }

  public void setAzureEventhub(RoutingAzureEventHub azureEventhub) {
    this.azureEventhub = azureEventhub;
  }

  public ScenarioRoutingCreateUpdate azureIothub(RoutingAzureIotHub azureIothub) {
    this.azureIothub = azureIothub;
    return this;
  }

  /**
   * Get azureIothub
   * 
   * @return azureIothub
   **/

  public RoutingAzureIotHub getAzureIothub() {
    return azureIothub;
  }

  public void setAzureIothub(RoutingAzureIotHub azureIothub) {
    this.azureIothub = azureIothub;
  }

  public ScenarioRoutingCreateUpdate http(RoutingHttp http) {
    this.http = http;
    return this;
  }

  /**
   * Get http
   * 
   * @return http
   **/

  public RoutingHttp getHttp() {
    return http;
  }

  public void setHttp(RoutingHttp http) {
    this.http = http;
  }

  public ScenarioRoutingCreateUpdate googlePubsub(RoutingGooglePubSub googlePubsub) {
    this.googlePubsub = googlePubsub;
    return this;
  }

  /**
   * Get googlePubsub
   * 
   * @return googlePubsub
   **/

  public RoutingGooglePubSub getGooglePubsub() {
    return googlePubsub;
  }

  public void setGooglePubsub(RoutingGooglePubSub googlePubsub) {
    this.googlePubsub = googlePubsub;
  }

  public ScenarioRoutingCreateUpdate googleIotcore(RoutingGoogleIotCore googleIotcore) {
    this.googleIotcore = googleIotcore;
    return this;
  }

  /**
   * Get googleIotcore
   * 
   * @return googleIotcore
   **/

  public RoutingGoogleIotCore getGoogleIotcore() {
    return googleIotcore;
  }

  public void setGoogleIotcore(RoutingGoogleIotCore googleIotcore) {
    this.googleIotcore = googleIotcore;
  }

  public ScenarioRoutingCreateUpdate awsIotcore(RoutingAwsIotCore awsIotcore) {
    this.awsIotcore = awsIotcore;
    return this;
  }

  /**
   * Get awsIotcore
   * 
   * @return awsIotcore
   **/

  public RoutingAwsIotCore getAwsIotcore() {
    return awsIotcore;
  }

  public void setAwsIotcore(RoutingAwsIotCore awsIotcore) {
    this.awsIotcore = awsIotcore;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ScenarioRoutingCreateUpdate scenarioRoutingCreateUpdate = (ScenarioRoutingCreateUpdate) o;
    return Objects.equals(this.name, scenarioRoutingCreateUpdate.name) &&
        Objects.equals(this.groupId, scenarioRoutingCreateUpdate.groupId) &&
        Objects.equals(this.profileId, scenarioRoutingCreateUpdate.profileId) &&
        Objects.equals(this.enabled, scenarioRoutingCreateUpdate.enabled) &&
        Objects.equals(this.messageType, scenarioRoutingCreateUpdate.messageType) &&
        Objects.equals(this.formatType, scenarioRoutingCreateUpdate.formatType) &&
        Objects.equals(this.azureEventhub, scenarioRoutingCreateUpdate.azureEventhub) &&
        Objects.equals(this.azureIothub, scenarioRoutingCreateUpdate.azureIothub) &&
        Objects.equals(this.http, scenarioRoutingCreateUpdate.http) &&
        Objects.equals(this.googlePubsub, scenarioRoutingCreateUpdate.googlePubsub) &&
        Objects.equals(this.googleIotcore, scenarioRoutingCreateUpdate.googleIotcore) &&
        Objects.equals(this.awsIotcore, scenarioRoutingCreateUpdate.awsIotcore);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, groupId, profileId, enabled, messageType, formatType, azureEventhub, azureIothub, http,
        googlePubsub, googleIotcore, awsIotcore);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ScenarioRoutingCreateUpdate {\n");

    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    groupId: ").append(toIndentedString(groupId)).append("\n");
    sb.append("    profileId: ").append(toIndentedString(profileId)).append("\n");
    sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
    sb.append("    messageType: ").append(toIndentedString(messageType)).append("\n");
    sb.append("    formatType: ").append(toIndentedString(formatType)).append("\n");
    sb.append("    azureEventhub: ").append(toIndentedString(azureEventhub)).append("\n");
    sb.append("    azureIothub: ").append(toIndentedString(azureIothub)).append("\n");
    sb.append("    http: ").append(toIndentedString(http)).append("\n");
    sb.append("    googlePubsub: ").append(toIndentedString(googlePubsub)).append("\n");
    sb.append("    googleIotcore: ").append(toIndentedString(googleIotcore)).append("\n");
    sb.append("    awsIotcore: ").append(toIndentedString(awsIotcore)).append("\n");
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
