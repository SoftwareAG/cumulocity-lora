package lora.ns.liveobjects.rest.model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class HttpPushAction {
    String webhookUrl;
    Map<String, String> headers;
    Boolean retryOnFailure = true;
}
