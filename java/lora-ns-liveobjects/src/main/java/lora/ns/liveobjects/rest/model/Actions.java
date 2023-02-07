package lora.ns.liveobjects.rest.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
@JsonIgnoreProperties(ignoreUnknown = true)
public class Actions {
    List<HttpPushAction> httpPush;
}
