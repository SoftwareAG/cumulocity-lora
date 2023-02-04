package lora.ns.liveobjects.rest.model;

import java.util.List;
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
    Map<String, List<String>> headers;
    Boolean retryOnFailure = true;
}
