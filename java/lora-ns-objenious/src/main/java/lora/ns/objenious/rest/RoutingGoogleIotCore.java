package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Configuration of google iotcore
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class RoutingGoogleIotCore   {
  @JsonProperty("project_id")
  private String projectId = null;

  @JsonProperty("topic")
  private String topic = null;

  @JsonProperty("auth_file_content")
  private Object authFileContent = null;

  @JsonProperty("location")
  private String location = null;

  @JsonProperty("registry")
  private String registry = null;

  @JsonProperty("subfolder")
  private String subfolder = null;

  public RoutingGoogleIotCore projectId(String projectId) {
    this.projectId = projectId;
    return this;
  }

  /**
   * Project Id
   * @return projectId
  **/


  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public RoutingGoogleIotCore topic(String topic) {
    this.topic = topic;
    return this;
  }

  /**
   * Topic Id
   * @return topic
  **/


  public String getTopic() {
    return topic;
  }

  public void setTopic(String topic) {
    this.topic = topic;
  }

  public RoutingGoogleIotCore authFileContent(Object authFileContent) {
    this.authFileContent = authFileContent;
    return this;
  }

  /**
   * Json auth file content
   * @return authFileContent
  **/


  public Object getAuthFileContent() {
    return authFileContent;
  }

  public void setAuthFileContent(Object authFileContent) {
    this.authFileContent = authFileContent;
  }

  public RoutingGoogleIotCore location(String location) {
    this.location = location;
    return this;
  }

  /**
   * Location
   * @return location
  **/


  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public RoutingGoogleIotCore registry(String registry) {
    this.registry = registry;
    return this;
  }

  /**
   * Registry of destination
   * @return registry
  **/


  public String getRegistry() {
    return registry;
  }

  public void setRegistry(String registry) {
    this.registry = registry;
  }

  public RoutingGoogleIotCore subfolder(String subfolder) {
    this.subfolder = subfolder;
    return this;
  }

  /**
   * SubFolder to classify messages
   * @return subfolder
  **/


  public String getSubfolder() {
    return subfolder;
  }

  public void setSubfolder(String subfolder) {
    this.subfolder = subfolder;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoutingGoogleIotCore routingGoogleIotCore = (RoutingGoogleIotCore) o;
    return Objects.equals(this.projectId, routingGoogleIotCore.projectId) &&
        Objects.equals(this.topic, routingGoogleIotCore.topic) &&
        Objects.equals(this.authFileContent, routingGoogleIotCore.authFileContent) &&
        Objects.equals(this.location, routingGoogleIotCore.location) &&
        Objects.equals(this.registry, routingGoogleIotCore.registry) &&
        Objects.equals(this.subfolder, routingGoogleIotCore.subfolder);
  }

  @Override
  public int hashCode() {
    return Objects.hash(projectId, topic, authFileContent, location, registry, subfolder);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoutingGoogleIotCore {\n");
    
    sb.append("    projectId: ").append(toIndentedString(projectId)).append("\n");
    sb.append("    topic: ").append(toIndentedString(topic)).append("\n");
    sb.append("    authFileContent: ").append(toIndentedString(authFileContent)).append("\n");
    sb.append("    location: ").append(toIndentedString(location)).append("\n");
    sb.append("    registry: ").append(toIndentedString(registry)).append("\n");
    sb.append("    subfolder: ").append(toIndentedString(subfolder)).append("\n");
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

