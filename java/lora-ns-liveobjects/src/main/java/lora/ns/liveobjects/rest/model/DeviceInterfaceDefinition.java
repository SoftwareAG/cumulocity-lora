package lora.ns.liveobjects.rest.model;

import java.util.Map;

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
public class DeviceInterfaceDefinition {
    private String devEUI;
    private String profile;
    private String activationType = "OTAA";
    private String appEUI;
    private String appKey;
    private String connectivityPlan;
    private Map<String, Boolean> connectivityOptions = Map.of("ackUl", true, "tdoa", false);
}
