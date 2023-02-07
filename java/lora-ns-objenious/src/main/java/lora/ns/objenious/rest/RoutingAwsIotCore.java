package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Configuration of aws iotcore
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class RoutingAwsIotCore   {
  @JsonProperty("endpoint")
  private String endpoint = null;

  @JsonProperty("certificate")
  private String certificate = null;

  @JsonProperty("topic_template")
  private String topicTemplate = null;

  public RoutingAwsIotCore endpoint(String endpoint) {
    this.endpoint = endpoint;
    return this;
  }

  /**
   * Endpoint
   * @return endpoint
  **/


  public String getEndpoint() {
    return endpoint;
  }

  public void setEndpoint(String endpoint) {
    this.endpoint = endpoint;
  }

  public RoutingAwsIotCore certificate(String certificate) {
    this.certificate = certificate;
    return this;
  }

  /**
   * Certificate
   * @return certificate
  **/


  public String getCertificate() {
    return certificate;
  }

  public void setCertificate(String certificate) {
    this.certificate = certificate;
  }

  public RoutingAwsIotCore topicTemplate(String topicTemplate) {
    this.topicTemplate = topicTemplate;
    return this;
  }

  /**
   * Topic template
   * @return topicTemplate
  **/


  public String getTopicTemplate() {
    return topicTemplate;
  }

  public void setTopicTemplate(String topicTemplate) {
    this.topicTemplate = topicTemplate;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoutingAwsIotCore routingAwsIotCore = (RoutingAwsIotCore) o;
    return Objects.equals(this.endpoint, routingAwsIotCore.endpoint) &&
        Objects.equals(this.certificate, routingAwsIotCore.certificate) &&
        Objects.equals(this.topicTemplate, routingAwsIotCore.topicTemplate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(endpoint, certificate, topicTemplate);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoutingAwsIotCore {\n");
    
    sb.append("    endpoint: ").append(toIndentedString(endpoint)).append("\n");
    sb.append("    certificate: ").append(toIndentedString(certificate)).append("\n");
    sb.append("    topicTemplate: ").append(toIndentedString(topicTemplate)).append("\n");
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

