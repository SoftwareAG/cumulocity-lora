package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * ScenarioRouting
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScenarioRouting {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("link")
  private String link = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("group")
  private Ref group = null;

  @JsonProperty("profile")
  private Ref profile = null;

  @JsonProperty("enabled")
  private Boolean enabled = null;

  /**
   * If set to \"all\", all messages are routed
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

  @JsonProperty("http")
  private RoutingHttp http = null;

  @JsonProperty("azure_iothub")
  private RoutingAzureIotHub azureIothub = null;

  @JsonProperty("azure_eventhub")
  private RoutingAzureEventHub azureEventhub = null;

  @JsonProperty("google_pubsub")
  private RoutingGooglePubSub googlePubsub = null;

  @JsonProperty("google_iotcore")
  private RoutingGoogleIotCore googleIotcore = null;

  @JsonProperty("aws_iotcore")
  private RoutingAwsIotCore awsIotcore = null;

  public ScenarioRouting id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Routing scenario identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public ScenarioRouting link(String link) {
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

  public ScenarioRouting name(String name) {
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

  public ScenarioRouting group(Ref group) {
    this.group = group;
    return this;
  }

  /**
   * Get group
   * 
   * @return group
   **/

  public Ref getGroup() {
    return group;
  }

  public void setGroup(Ref group) {
    this.group = group;
  }

  public ScenarioRouting profile(Ref profile) {
    this.profile = profile;
    return this;
  }

  /**
   * Get profile
   * 
   * @return profile
   **/

  public Ref getProfile() {
    return profile;
  }

  public void setProfile(Ref profile) {
    this.profile = profile;
  }

  public ScenarioRouting enabled(Boolean enabled) {
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

  public ScenarioRouting messageType(MessageTypeEnum messageType) {
    this.messageType = messageType;
    return this;
  }

  /**
   * If set to \"all\", all messages are routed
   * 
   * @return messageType
   **/

  public MessageTypeEnum getMessageType() {
    return messageType;
  }

  public void setMessageType(MessageTypeEnum messageType) {
    this.messageType = messageType;
  }

  public ScenarioRouting formatType(FormatTypeEnum formatType) {
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

  public ScenarioRouting http(RoutingHttp http) {
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

  public ScenarioRouting azureIothub(RoutingAzureIotHub azureIothub) {
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

  public ScenarioRouting azureEventhub(RoutingAzureEventHub azureEventhub) {
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

  public ScenarioRouting googlePubsub(RoutingGooglePubSub googlePubsub) {
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

  public ScenarioRouting googleIotcore(RoutingGoogleIotCore googleIotcore) {
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

  public ScenarioRouting awsIotcore(RoutingAwsIotCore awsIotcore) {
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
    ScenarioRouting scenarioRouting = (ScenarioRouting) o;
    return Objects.equals(this.id, scenarioRouting.id) &&
        Objects.equals(this.link, scenarioRouting.link) &&
        Objects.equals(this.name, scenarioRouting.name) &&
        Objects.equals(this.group, scenarioRouting.group) &&
        Objects.equals(this.profile, scenarioRouting.profile) &&
        Objects.equals(this.enabled, scenarioRouting.enabled) &&
        Objects.equals(this.messageType, scenarioRouting.messageType) &&
        Objects.equals(this.formatType, scenarioRouting.formatType) &&
        Objects.equals(this.http, scenarioRouting.http) &&
        Objects.equals(this.azureIothub, scenarioRouting.azureIothub) &&
        Objects.equals(this.azureEventhub, scenarioRouting.azureEventhub) &&
        Objects.equals(this.googlePubsub, scenarioRouting.googlePubsub) &&
        Objects.equals(this.googleIotcore, scenarioRouting.googleIotcore) &&
        Objects.equals(this.awsIotcore, scenarioRouting.awsIotcore);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link, name, group, profile, enabled, messageType, formatType, http, azureIothub,
        azureEventhub, googlePubsub, googleIotcore, awsIotcore);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ScenarioRouting {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    group: ").append(toIndentedString(group)).append("\n");
    sb.append("    profile: ").append(toIndentedString(profile)).append("\n");
    sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
    sb.append("    messageType: ").append(toIndentedString(messageType)).append("\n");
    sb.append("    formatType: ").append(toIndentedString(formatType)).append("\n");
    sb.append("    http: ").append(toIndentedString(http)).append("\n");
    sb.append("    azureIothub: ").append(toIndentedString(azureIothub)).append("\n");
    sb.append("    azureEventhub: ").append(toIndentedString(azureEventhub)).append("\n");
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
