package lora.ns.objenious.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * MessageList
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class MessageList {
  @JsonProperty("messages")
  private List<Message> messages = null;

  @JsonProperty("start_exclusive")
  private String startExclusive = null;

  public MessageList messages(List<Message> messages) {
    this.messages = messages;
    return this;
  }

  public MessageList addMessagesItem(Message messagesItem) {
    if (this.messages == null) {
      this.messages = new ArrayList<Message>();
    }
    this.messages.add(messagesItem);
    return this;
  }

  /**
   * Get messages
   * 
   * @return messages
   **/

  public List<Message> getMessages() {
    return messages;
  }

  public void setMessages(List<Message> messages) {
    this.messages = messages;
  }

  public MessageList startExclusive(String startExclusive) {
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
    MessageList messageList = (MessageList) o;
    return Objects.equals(this.messages, messageList.messages) &&
        Objects.equals(this.startExclusive, messageList.startExclusive);
  }

  @Override
  public int hashCode() {
    return Objects.hash(messages, startExclusive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MessageList {\n");

    sb.append("    messages: ").append(toIndentedString(messages)).append("\n");
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
