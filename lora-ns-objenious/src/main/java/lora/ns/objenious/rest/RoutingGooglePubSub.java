package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Configuration of google pubsub
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class RoutingGooglePubSub   {
  @JsonProperty("project_id")
  private String projectId = null;

  @JsonProperty("topic")
  private String topic = null;

  @JsonProperty("auth_file_content")
  private Object authFileContent = null;

  public RoutingGooglePubSub projectId(String projectId) {
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

  public RoutingGooglePubSub topic(String topic) {
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

  public RoutingGooglePubSub authFileContent(Object authFileContent) {
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


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoutingGooglePubSub routingGooglePubSub = (RoutingGooglePubSub) o;
    return Objects.equals(this.projectId, routingGooglePubSub.projectId) &&
        Objects.equals(this.topic, routingGooglePubSub.topic) &&
        Objects.equals(this.authFileContent, routingGooglePubSub.authFileContent);
  }

  @Override
  public int hashCode() {
    return Objects.hash(projectId, topic, authFileContent);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoutingGooglePubSub {\n");
    
    sb.append("    projectId: ").append(toIndentedString(projectId)).append("\n");
    sb.append("    topic: ").append(toIndentedString(topic)).append("\n");
    sb.append("    authFileContent: ").append(toIndentedString(authFileContent)).append("\n");
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

