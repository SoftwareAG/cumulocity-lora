package lora.ns.liveobjects.rest.model;

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
public class DeviceInterface {
    private String connector = "lora";
    private Boolean enabled = true;
    private DeviceInterfaceDefinition definition;
}
