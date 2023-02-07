package lora.ns.actility.rest.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class DeviceCreate {
    private String name;
    private String ref;
    @JsonProperty("EUI")
    private String EUI;
    private String activationType;
    private String processingStrategyId;
    private String deviceProfileId;
    private String applicationEUI;
    private String applicationKey;
    private List<String> routeRefs = new ArrayList<>();

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEUI() {
        return EUI;
    }
    public void setEUI(String eUI) {
        EUI = eUI;
    }
    public String getActivationType() {
        return activationType;
    }
    public void setActivationType(String activationType) {
        this.activationType = activationType;
    }
    public String getProcessingStrategyId() {
        return processingStrategyId;
    }
    public void setProcessingStrategyId(String processingStrategyId) {
        this.processingStrategyId = processingStrategyId;
    }
    public String getApplicationEUI() {
        return applicationEUI;
    }
    public void setApplicationEUI(String applicationEUI) {
        this.applicationEUI = applicationEUI;
    }
    public String getApplicationKey() {
        return applicationKey;
    }
    public void setApplicationKey(String applicationKey) {
        this.applicationKey = applicationKey;
    }
    public String getRef() {
        return ref;
    }
    public void setRef(String ref) {
        this.ref = ref;
    }
    public List<String> getRouteRefs() {
        return routeRefs;
    }
    public void setRouteRefs(List<String> routeRefs) {
        this.routeRefs = routeRefs;
    }
    public String getDeviceProfileId() {
        return deviceProfileId;
    }
    public void setDeviceProfileId(String deviceProfileId) {
        this.deviceProfileId = deviceProfileId;
    }
}
